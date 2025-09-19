'use client';

import { useState, useEffect, useCallback } from 'react';

// --- YARDIMCI BİLEŞENLER ---

const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const SkeletonLoader = () => (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full mt-10">
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-6"></div>
            <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-4/6"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const Recommendations = ({ recommendations }) => (
    <div className="mt-8 border-t pt-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Bu Konuları Gözden Geçir</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
                <a key={index} href={rec.url} target="_blank" rel="noopener noreferrer" 
                   className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-100 hover:shadow-md transition-all transform hover:-translate-y-1">
                    <p className="font-semibold text-blue-600">{rec.title}</p>
                </a>
            ))}
        </div>
    </div>
);

// Akıllı geri bildirimi gösteren bileşen
const SmartFeedback = ({ feedback }) => (
    <div className="p-4 mt-6 mb-4 bg-yellow-50 border-l-4 border-yellow-400">
        <div className="flex">
            <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="ml-3">
                <p className="text-sm text-yellow-700">
                    <span className="font-bold">Akıllı Geri Bildirim:</span> {feedback}
                </p>
            </div>
        </div>
    </div>
);


export default function Home() {
  const [mode, setMode] = useState('student');
  const [source, setSource] = useState('text');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questionType, setQuestionType] = useState('çoktan seçmeli');
  const [difficulty, setDifficulty] = useState('orta');
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [history, setHistory] = useState([]);
  
  const saveHistory = (newResult) => {
    try {
      const historyItem = {
        id: new Date().getTime(),
        type: newResult.summary ? 'Özet' : 'Sınav',
        topic: newResult.summary ? newResult.summary.substring(0, 40) + '...' : (newResult.questions && newResult.questions.length > 0) ? newResult.questions[0].question.substring(0, 40) + '...' : 'Oluşturulan İçerik',
        date: new Date().toLocaleString('tr-TR'),
        score: newResult.score,
      };
      const currentHistory = JSON.parse(localStorage.getItem('pratikAiHistory')) || [];
      const updatedHistory = [historyItem, ...currentHistory].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem('pratikAiHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Geçmiş kaydedilirken hata oluştu:", error);
    }
  };
  
  const resetState = (keepMode = false) => {
    if (!keepMode) setMode('student');
    // setSource('text'); // Bu satırı bilinçli olarak kaldırdık
    setText(''); setFile(null); setPreview(null);
    setResult(null); setError(''); setQuizStarted(false);
    setUserAnswers({}); setScore(null); setShowResults(false);
  };
  
  const handleModeChange = (newMode) => { setMode(newMode); resetState(true); };
  const handleSourceChange = (newSource) => { setSource(newSource); resetState(true); };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) updateFile(selectedFile);
  };
  
  const handlePaste = useCallback((event) => {
    if (source !== 'file') return;
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const imageFile = items[i].getAsFile();
        if (imageFile) {
          updateFile(imageFile);
          event.preventDefault();
          return;
        }
      }
    }
  }, [source]);

  const updateFile = (newFile) => {
    setFile(newFile);
    if (newFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(newFile);
    } else {
      setPreview(null);
    }
  };
  
  const handleSubmit = async () => {
    setIsLoading(true); setError(''); setResult(null); setQuizStarted(false);
    setUserAnswers({}); setScore(null); setShowResults(false);
    const formData = new FormData();
    let endpoint = '';
    if (source === 'text') {
        formData.append('text', text);
        endpoint = mode === 'summary' ? '/api/v1/generate-summary-from-text' : '/api/v1/generate-quiz-from-text';
    } else {
        if (!file) { setError('Lütfen bir dosya seçin veya yapıştırın.'); setIsLoading(false); return; }
        formData.append('file', file);
        endpoint = mode === 'summary' ? '/api/v1/generate-summary-from-file' : '/api/v1/generate-quiz-from-file';
    }
    if (mode === 'teacher') {
        formData.append('num_questions', numQuestions);
        formData.append('question_type', questionType);
        formData.append('difficulty', difficulty);
    } else if (mode === 'student') {
        formData.append('num_questions', 10);
        formData.append('question_type', 'çoktan seçmeli');
        formData.append('difficulty', 'orta');
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, { method: 'POST', body: formData });
      if (!response.ok) {
          const errData = await response.json().catch(() => null);
          throw new Error(errData?.detail || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
      if (mode !== 'student') { saveHistory(data); }
      if (mode === 'student' && data.questions && !data.questions[0]?.error) {
          setQuizStarted(true);
      }
    } catch (e) {
      console.error(e);
      setError(`İstek işlenirken bir hata oluştu: ${e.message}`);
    }
    setIsLoading(false);
  };
  
  const handleAnswerChange = (questionIndex, answerKey) => {
      setUserAnswers({ ...userAnswers, [questionIndex]: answerKey });
  };

  const submitQuiz = () => {
      let correctCount = 0;
      result.questions.forEach((q, index) => {
          if (userAnswers[index] === q.correct_answer) correctCount++;
      });
      const finalScore = result.questions.length > 0 ? Math.round((correctCount / result.questions.length) * 100) : 0;
      setScore(finalScore);
      setShowResults(true);
      setQuizStarted(false);
      saveHistory({...result, score: finalScore });
  };

  const handlePdfDownload = async () => {
    if (!result || !result.questions) { setError('PDF oluşturulacak soru bulunamadı.'); return; }
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/download-quiz-pdf', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(result.questions)
        });
        if (!response.ok) throw new Error('PDF oluşturulamadı');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "PratikAi_Sinavi.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        setError('PDF indirilirken bir hata oluştu.');
    }
  };
  
  const handleCopyToClipboard = (textToCopy) => {
      navigator.clipboard.writeText(textToCopy).then(() => {
          setCopySuccess('Kopyalandı!');
          setTimeout(() => setCopySuccess(''), 2000);
      }, (err) => {
          console.error('Kopyalama hatası:', err);
          setError('Metin kopyalanamadı.');
      });
  };

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    try {
      const savedHistory = JSON.parse(localStorage.getItem('pratikAiHistory')) || [];
      setHistory(savedHistory);
    } catch (error) {
      console.error("Geçmiş yüklenirken hata:", error);
      setHistory([]);
    }
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const renderContent = () => {
    if (isLoading) return <SkeletonLoader />;
    if (quizStarted) {
      return (
        <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Sınav Başladı</h2>
          {result.questions.map((q, index) => (
            <div key={index} className="mb-6 border-b pb-4 last:border-b-0">
              <p className="font-semibold text-base md:text-lg mb-4">{index + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.options && Object.entries(q.options).map(([key, value]) => (
                  <label key={key} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${userAnswers[index] === key ? 'bg-blue-100 border-blue-400' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name={`question-${index}`} value={key} onChange={() => handleAnswerChange(index, key)} className="w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                    <span className="text-sm md:text-base"><span className="font-semibold mr-2">{key})</span>{value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center mt-8">
            <button onClick={submitQuiz} className="px-6 py-3 md:px-8 md:py-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all transform hover:scale-105 text-base md:text-lg">Sınavı Bitir</button>
          </div>
        </div>
      );
    }
    if (showResults) {
      return (
        <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg animate-fade-in-slow">
           <div className="text-center border-b pb-6 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Sınav Sonucu</h2>
            <p className={`text-5xl md:text-6xl font-extrabold ${score >= 70 ? 'text-green-600' : 'text-red-600'}`}>{score}</p>
            <p className="font-semibold mt-2">{score >= 70 ? "Tebrikler, konuya hakimsin!" : "Biraz daha tekrar iyi olabilir!"}</p>
          </div>
          {score < 70 && result?.recommendations && <Recommendations recommendations={result.recommendations} />}
          <div className="flex flex-col md:flex-row justify-between items-center my-4 gap-4">
             <button onClick={() => resetState(true)} className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-all transform hover:scale-105">Yeni İşlem Yap</button>
             <button onClick={handlePdfDownload} className="w-full md:w-auto px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700 transition-all transform hover:scale-105">Cevap Anahtarını PDF İndir</button>
          </div>
          {result.questions.map((q, index) => (
            <div key={index} className="mb-6 border-b pb-4 last:border-b-0">
              <p className="font-semibold text-base md:text-lg mb-2">{index + 1}. {q.question}</p>
              <ul className="space-y-1 pl-5">
                {Object.entries(q.options).map(([key, value]) => {
                  const isCorrect = q.correct_answer === key;
                  const isUserChoice = userAnswers[index] === key;
                  let style = 'text-gray-700 text-sm md:text-base';
                  if (isCorrect) style = 'text-green-700 font-bold text-sm md:text-base';
                  if (!isCorrect && isUserChoice) style = 'text-red-700 line-through text-sm md:text-base';
                  return (
                    <li key={key} className={style}>
                      <span className="font-semibold mr-2">{key})</span>{value}
                      {isCorrect && ' ✔️ (Doğru Cevap)'}
                      {isUserChoice && !isCorrect && ' ❌ (Senin Cevabın)'}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      );
    }
    if (result) {
        return (
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg animate-fade-in-slow">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{result.summary ? 'Oluşturulan Özet' : 'Oluşturulan Sorular'}</h2>
                    <div className="flex items-center space-x-2">
                        {copySuccess && <span className="text-sm text-green-600 animate-pulse">{copySuccess}</span>}
                        {result.summary && <button onClick={() => handleCopyToClipboard(result.summary)} className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all transform hover:scale-105">Kopyala</button>}
                        {result.questions && result.questions.length > 0 && !result.questions[0].error && (
                            <button onClick={handlePdfDownload} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 transition-all transform hover:scale-105">PDF İndir</button>
                        )}
                        <button onClick={() => resetState(true)} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-all transform hover:scale-105">Yeni İşlem Yap</button>
                    </div>
                </div>
                {/* --- DEĞİŞİKLİK: Akıllı geri bildirimi burada göster --- */}
                {mode === 'teacher' && result.feedback && <SmartFeedback feedback={result.feedback} />}
                
                {result.summary && (
                    <div className="text-gray-700 whitespace-pre-wrap mt-4">{result.summary}</div>
                )}
                {result.questions && (
                    <div className={mode === 'teacher' && result.feedback ? 'mt-4' : ''}>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Cevap Anahtarı</h3>
                        {result.questions[0]?.raw_text ? (<p className="text-gray-700 whitespace-pre-wrap">{result.questions[0].raw_text}</p>) : 
                        result.questions[0]?.error ? (<p className="text-red-600">{result.questions[0].error}</p>) :
                        (result.questions.map((q, index) => (
                            <div key={index} className="mb-6 border-b pb-4 last:border-b-0">
                            <p className="font-semibold text-lg mb-2">{index + 1}. {q.question}</p>
                            {q.options && <ul className="space-y-1 pl-5">
                                {Object.entries(q.options).map(([key, value]) => (
                                <li key={key} className={`text-gray-700 ${q.correct_answer === key ? 'text-green-700 font-bold' : ''}`}>
                                    <span className="font-semibold mr-2">{key})</span>{value}
                                </li>
                                ))}
                            </ul>}
                            </div>
                        )))}
                    </div>
                )}
                 {result.recommendations && <Recommendations recommendations={result.recommendations} />}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-center space-x-2 mb-8 p-1 bg-gray-200 rounded-xl">
                <button onClick={() => handleModeChange('student')} className={`px-6 py-2 rounded-lg font-semibold transition-colors ${mode === 'student' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}>Öğrenci</button>
                <button onClick={() => handleModeChange('teacher')} className={`px-6 py-2 rounded-lg font-semibold transition-colors ${mode === 'teacher' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}>Öğretmen</button>
                <button onClick={() => handleModeChange('summary')} className={`px-6 py-2 rounded-lg font-semibold transition-colors ${mode === 'summary' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}>Özet Çıkar</button>
            </div>
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                    <label className="font-semibold text-gray-700">Kaynak Türü:</label>
                    <button onClick={() => handleSourceChange('text')} className={`px-4 py-1 rounded-full text-sm ${source === 'text' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>Metin</button>
                    <button onClick={() => handleSourceChange('file')} className={`px-4 py-1 rounded-full text-sm ${source === 'file' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>Dosya / Görsel</button>
                </div>
                {source === 'text' ? (
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Metni buraya yapıştırın..." className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"></textarea>
                ) : (
                    <div>
                        <label htmlFor="file-upload" className="relative block w-full h-52 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center text-center cursor-pointer hover:border-blue-500 bg-gray-50">
                            {preview ? <img src={preview} alt="Önizleme" className="max-h-full max-w-full object-contain" /> : file ? <p>{file.name}</p> : <div className="text-gray-500"><p>Ekran görüntüsü yapıştırın (CTRL+V)</p><p className="my-1">veya</p><p className="font-semibold text-blue-600">bir dosya seçmek için tıklayın</p><span className="text-xs text-gray-400 mt-2 block">(Resim veya PDF)</span></div>}
                        </label>
                        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,application/pdf" />
                    </div>
                )}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 border-t pt-6 ${mode !== 'teacher' ? 'hidden' : ''}`}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Soru Sayısı</label>
                        <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} min="1" max="10" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Soru Tipi</label>
                        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="çoktan seçmeli">Çoktan Seçmeli</option>
                            <option value="doğru-yanlış">Doğru/Yanlış</option>
                            <option value="boşluk doldurma">Boşluk Doldurma</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Zorluk Seviyesi</label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="kolay">Kolay</option>
                            <option value="orta">Orta</option>
                            <option value="zor">Zor</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button onClick={handleSubmit} disabled={isLoading || (source === 'text' && !text.trim()) || (source === 'file' && !file)} 
                    className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 text-base md:text-lg">
                    {isLoading && <Spinner />}
                    {isLoading ? 'Oluşturuluyor...' : (mode === 'summary' ? 'Özet Çıkar' : 'Sınav Oluştur')}
                    </button>
                </div>
            </div>
        </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-gray-100 font-sans">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-gray-800">PratikAi</h1>
            <p className="text-base md:text-lg text-gray-600">Metin veya görsellerinizden akıllı sınavlar ve özetler oluşturun.</p>
        </header>
        {error && <p className="text-center text-xl text-red-600 mb-4 animate-shake">{error}</p>}
        {renderContent()}
        
        {history.length > 0 && !quizStarted && !showResults && (
            <div className="mt-10 w-full">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Son İşlemlerim</h2>
                    <ul className="space-y-3">
                        {history.map((item, index) => (
                            <li key={index} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                                <div>
                                    <span className={`font-semibold ${item.type === 'Sınav' ? 'text-blue-600' : 'text-purple-600'}`}>{item.type}</span>
                                    <span className="text-gray-600 mx-2">-</span>
                                    <span className="text-gray-800">{item.topic}</span>
                                    {item.score !== undefined && <span className="ml-2 font-bold text-lg">{item.score}</span>}
                                </div>
                                <span className="text-sm text-gray-400">{item.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )}
      </div>
    </main>
  );
}
'use client'; // Bu satır, kodun tarayıcıda çalışacağını belirtir

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const checkBackendHealth = async () => {
    setLoading(true);
    setMessage(''); // Önceki mesajı temizle
    try {
      // Backend'imizin çalıştığı adrese istek atıyoruz
      const response = await fetch('http://127.0.0.1:8000/api/v1/health');
      const data = await response.json();
      setMessage(data.status); // Gelen "OK" mesajını state'e ata
    } catch (error) {
      setMessage('Hata: Backend ile bağlantı kurulamadı!');
      console.error('Bağlantı Hatası:', error);
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">PratikAi</h1>
      <button
        onClick={checkBackendHealth}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {loading ? 'Kontrol Ediliyor...' : 'Backend Bağlantısını Test Et'}
      </button>
      {message && (
        <div className={`mt-8 text-2xl font-bold p-4 rounded-md ${message === 'OK' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <p>Backend'den Gelen Mesaj: {message}</p>
        </div>
      )}
    </main>
  );
}
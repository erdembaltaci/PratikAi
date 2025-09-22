# PratikAi 📚✨

**Hackathon için geliştirilmiş, metin ve görsellerden yapay zeka destekli sınavlar, özetler ve akıllı geri bildirimler üreten bir eğitim teknolojisi platformu.** 

---

## 🎯 Projenin Amacı

Öğretmenlerin sınav ve materyal hazırlama yükünü azaltmak ve öğrencilere anında, kişiselleştirilmiş geri bildirimler sunarak öğrenme süreçlerini verimli bir şekilde desteklemek. PratikAi, herhangi bir ders materyalini saniyeler içinde interaktif bir öğrenme deneyimine dönüştüren bir platformdur.

## ✨ Ana Özellikler

- **Çok Yönlü Kaynak Girişi:** PDF, resim dosyaları (`PNG`, `JPG`), ekran görüntüleri veya doğrudan yapıştırılan metinleri analiz edebilir.
- **Öğrenci Modu:** Kullanıcılar, yükledikleri bir kaynaktan anında 10 soruluk interaktif bir testle kendilerini deneyebilir ve anında sonuçlarını görebilirler.
- **Öğretmen Modu:** Öğretmenler, soru sayısı, tipi (`çoktan seçmeli`, `doğru-yanlış` vb.) ve zorluk seviyesi gibi parametreleri ayarlayarak müfredatlarına tam uyumlu, özelleştirilmiş sınavlar oluşturabilirler.
-   **🧠 Akıllı Geri Bildirim (Özgün Özellik):** Üretilen soruların pedagojik düzeyini (bilgi, kavrama vb.) analiz ederek öğretmene, eğitim materyalini nasıl daha etkili hale getirebileceği konusunda somut öneriler sunar.
-  **Tavsiye Modülü:** Başarısız sınav sonuçlarının ardından veya özetlerle birlikte, kullanıcının konusunu pekiştirmesi için ilgili Google ve YouTube linklerini otomatik olarak önerir.
-  **Otomatik Özetleme:** Uzun metinlerden saniyeler içinde ana fikirleri içeren kısa ve anlaşılır özetler çıkarır.
-  **PDF Çıktısı:** Oluşturulan tüm sınavlar ve cevap anahtarları, tek bir tıkla PDF olarak indirilebilir.

## 💻 Kullanılan Teknolojiler

| Katman | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Frontend** | Next.js (React), Tailwind CSS | Modern, hızlı ve tamamen responsive bir kullanıcı deneyimi sunar. |
| **Backend** | Python, FastAPI | Yüksek performanslı, asenkron ve yapay zeka entegrasyonu için ideal bir API sunucusu. |
| **Yapay Zeka** | Google Gemini API, EasyOCR | Metin anlama, soru üretme, özetleme ve görsellerden metin okuma (OCR) görevlerini yerine getirir. |
| **Deployment**| Vercel (Frontend), Railway/Render (Backend) | Projenin sürekli entegrasyon ve teslimat (CI/CD) prensipleriyle kolayca canlıya alınmasını sağlar. |

## 🚀 Kurulum ve Çalıştırma

### Backend
1.  `backend` dizinine gidin: `cd backend`
2.  Sanal ortamı oluşturun ve aktifleştirin.
3.  Bağımlılıkları yükleyin: `pip install -r requirements.txt`
4.  `.env` dosyasını oluşturup `GOOGLE_API_KEY`'inizi ekleyin.
5.  Sunucuyu başlatın: `uvicorn main:app --reload`

### Frontend
1.  `frontend` dizinine gidin: `cd frontend`
2.  Bağımlılıkları yükleyin: `npm install`
3.  Geliştirme sunucusunu başlatın: `npm run dev`

ChatGPT Nedir? (İsviçre Çakısı)
Boş Bir Tuval: ChatGPT'ye gidip "Bana Newton'un hareket yasalarıyla ilgili bir metin verip bundan 10 soruluk bir test hazırlar mısın?" diyebilirsin.

Düşünme Yükü Sende: Ne isteyeceğini, soru tipini, şık sayısını, zorluk seviyesini metinle tarif etmek zorundasın (buna "prompt engineering" denir).

Ham Çıktı: Sana sadece ham metin verir. O metni alıp bir Word dosyasına kopyalaman, düzenlemen, şıkları ayarlaman, cevap anahtarı oluşturman gerekir.

İş Akışı Yok: Testi öğrenciye veremezsin, otomatik notlandıramazsın, sonuca göre bir şey yapamazsın. Sadece metin üretir ve orada durur.

PratikAi Nedir? (Uzman Aleti)
Bizim projemiz ise sadece metin üreten bir araç değil, uçtan uca bir deneyim ve iş akışı sunuyor. Farkımız tam olarak bu.

Sıfır Düşünme Yükü (Kullanıcı Deneyimi): Kullanıcı "prompt" yazmakla uğraşmıyor. Sadece dosyasını yüklüyor ve butonlara tıklıyor (Soru Tipi: Çoktan Seçmeli, Zorluk: Orta). Bizim arayüzümüz, kullanıcıyı doğru sonuca yönlendiren bir rehber. Bu, en büyük farklardan biri.

Uçtan Uca Çözüm (İş Akışı): ChatGPT'nin durduğu yerde bizim projemiz yeni başlıyor.

Yükle -> Testi Oluştur -> Testi Çöz -> Otomatik Notlandır -> Sonuç Ver. Bu bütünleşik bir sistemdir. ChatGPT bu adımlardan sadece birini yapar.

Yapılandırılmış ve Kullanılabilir Çıktı: Biz sadece metin vermiyoruz.

İnteraktif bir sınav ekranı sunuyoruz.

Öğretmenler için tek tuşla indirebilecekleri, baskıya hazır PDF'ler üretiyoruz. Bir öğretmenin ChatGPT'den aldığı metni PDF'e dönüştürmesi bile dakikalar sürer. Biz bunu saniyeler içinde yapıyoruz.

Akıllı ve Pedagojik Mantık: Projemizin en değerli kısmı burası.

Başarılı olan öğrenciyi konu özetiyle pekiştiriyoruz.

Başarısız olan öğrenciyi doğrudan eksiğini kapatabileceği video ve sitelere yönlendiriyoruz.

Bu, ChatGPT'nin sahip olmadığı bir eğitimsel zekadır. Biz sadece içerik üretmiyoruz, öğrenme sürecini yönlendiriyoruz.

Oturum ve online sistem konusuna gelince: Bunlar, bu çekirdek deneyimin "nasıl" sunulacağıyla ilgili detaylardır. Hackathon'da biz "ne" yapıldığına, yani temel değere odaklanıyoruz. Sunumda "Bir sonraki adımımız, öğretmenlerin bu sınavları kendi öğrencilerine online olarak atayabileceği bir sınıf sistemi eklemek" diyerek projenin vizyonunu da göstermiş oluruz.

Kısacası:
ChatGPT size bir motor verir. Biz ise o motoru alıp, şık bir kaportası, direksiyonu, tekerlekleri ve akıllı bir navigasyon sistemi olan, kullanıma hazır bir araba yapıyoruz. Farkımız bu

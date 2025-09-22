# PratikAi 📚✨

**Hackathon için geliştirilmiş, metin ve görsellerden yapay zeka destekli sınavlar, özetler ve akıllı geri bildirimler üreten bir eğitim teknolojisi platformu.** [cite: 1, 2]

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

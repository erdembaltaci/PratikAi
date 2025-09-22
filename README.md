# PratikAi 📚✨

**Hackathon için geliştirilmiş, metin ve görsellerden yapay zeka destekli sınavlar, özetler ve akıllı geri bildirimler üreten bir eğitim teknolojisi platformu.**
# Proje Tanıtım Videosu:
https://youtu.be/21cdUmNRQ2Q

---

## 🎯 Projenin Amacı

Öğretmenlerin sınav ve materyal hazırlama yükünü azaltmak ve öğrencilere anında, kişiselleştirilmiş geri bildirimler sunarak öğrenme süreçlerini verimli bir şekilde desteklemek. PratikAi, herhangi bir ders materyalini saniyeler içinde interaktif bir öğrenme deneyimine dönüştüren bir platformdur.

## Neden PratikAi? (ChatGPT ve Benzerlerine Karşı Avantajları)

ChatGPT gibi genel amaçlı yapay zekalar, bir İsviçre çakısı gibidir; birçok işi yapabilirler ama hiçbirinde uzman değillerdir. **PratikAi ise, eğitim alanına özel olarak tasarlanmış bir uzman aletidir.** Farkımız, sadece içerik üretmek değil, uçtan uca bir eğitim deneyimi sunmaktır.

#### ❌ Ham Çıktı vs. ✅ Kullanıma Hazır Ürün
* **ChatGPT:** Size sadece ham metin verir. Bu metni alıp düzenlemek, PDF'e dönüştürmek ve bir sınav formatına sokmak tamamen sizin görevinizdir.
* **PratikAi:** Size **interaktif bir sınav ekranı** ve tek tıkla indirebileceğiniz, **baskıya hazır PDF'ler** sunar. ChatGPT'nin durduğu yerde, PratikAi'nin işi yeni başlar.

#### ❌ Yüksek Efor vs. ✅ Sıfır Düşünme Yükü
* **ChatGPT:** Doğru sonucu almak için ne isteyeceğinizi (soru tipi, şık sayısı, zorluk vb.) detaylıca tarif etmeniz gerekir ("prompt engineering").
* **PratikAi:** Kullanıcıyı yormaz. Sadece dosyasını yükler ve butonlara tıklar. Arayüzümüz, kullanıcıyı doğru sonuca **yönlendiren** bir rehberdir.

#### ❌ Tek Adımlık İşlem vs. ✅ Bütünleşik İş Akışı
* **ChatGPT:** Sadece metin üretir ve durur.
* **PratikAi:** **Yükle -> Sınav Oluştur -> Çöz -> Otomatik Notlandır -> Sonuç Ver ve Tavsiye Sun** adımlarından oluşan bütünleşik bir iş akışı sunar.

#### 🧠 Akıllı ve Pedagojik Mantık
Projemizin en değerli ve özgün kısmı budur. PratikAi:
* **Akıllı Geri Bildirim** ile öğretmene materyalini nasıl iyileştireceğini söyler.
* Başarısız olan öğrenciyi, **Tavsiye Modülü** ile eksiklerini kapatabileceği doğru kaynaklara yönlendirir.

> **Kısacası:** ChatGPT size bir motor verir. Biz ise o motoru alıp, şık bir kaportası, direksiyonu, tekerlekleri ve akıllı bir navigasyon sistemi olan, **kullanıma hazır bir araba yapıyoruz.** Farkımız bu.

## ✨ Ana Özellikler

-   **Çok Yönlü Kaynak Girişi:** PDF, resim dosyaları (`PNG`, `JPG`), ekran görüntüleri veya doğrudan yapıştırılan metinleri analiz edebilir.
-   **Öğrenci Modu:** Kullanıcılar, yükledikleri bir kaynaktan anında 10 soruluk interaktif bir testle kendilerini deneyebilir ve anında sonuçlarını görebilirler.
-   **Öğretmen Modu:** Öğretmenler, soru sayısı, tipi ve zorluk seviyesi gibi parametreleri ayarlayarak müfredatlarına tam uyumlu, özelleştirilmiş sınavlar oluşturabilir.
-   **Akıllı Geri Bildirim (Özgün Özellik):** Üretilen soruların pedagojik düzeyini analiz ederek öğretmene, eğitim materyalini nasıl daha etkili hale getirebileceği konusunda somut öneriler sunar.
-   **Konu Özeti ve Tavsiye Modülü:** Yüklenen metinlerden otomatik özet çıkarır ve kullanıcının konusunu pekiştirmesi için ilgili Google/YouTube linklerini otomatik olarak önerir.
-   **PDF Çıktısı:** Oluşturulan tüm sınavlar ve cevap anahtarları, tek bir tıkla PDF olarak indirilebilir.

## 💻 Kullanılan Teknolojiler

| Katman | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Frontend** | Next.js (React), Tailwind CSS | Modern, hızlı ve tamamen responsive bir kullanıcı deneyimi sunar. |
| **Backend** | Python, FastAPI | Yüksek performanslı, asenkron ve yapay zeka entegrasyonu için ideal bir API sunucusu. |
| **Yapay Zeka** | Google Gemini API, EasyOCR | Metin anlama, soru üretme, özetleme ve görsellerden metin okuma (OCR) görevlerini yerine getirir. |
| **Deployment**| Vercel (Frontend), Hugging Face/Fly.io (Backend) | Projenin sürekli entegrasyon ve teslimat (CI/CD) prensipleriyle kolayca canlıya alınmasını sağlar. |

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

### Proje Algoritma Akış Diyagramı:
<img width="635" height="672" alt="algoritma_paratkai" src="https://github.com/user-attachments/assets/c789697b-3d4b-445a-b7a7-61196b428001" />


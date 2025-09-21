# Python'un resmi, hafif bir versiyonunu temel al
FROM python:3.11-slim

# Çalışma dizinini ayarla
WORKDIR /app

# Kütüphane listesini kopyala
COPY requirements.txt .

# Kütüphaneleri kur
RUN pip install --no-cache-dir -r requirements.txt

# Projenin geri kalan tüm dosyalarını kopyala
COPY . .

# Uvicorn sunucusunu 80 portunda çalıştır
# Railway bu porta göre yönlendirme yapacak
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
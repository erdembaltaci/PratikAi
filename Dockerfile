# Python'un resmi, hafif bir versiyonunu temel al
FROM python:3.11-slim

# Çalışma dizinini ayarla
WORKDIR /app

# Önce sadece kütüphane listesini kopyala ve kur
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Projenin backend klasörünün tamamını kopyala
COPY Backend/ .

# Uvicorn sunucusunu 80 portunda çalıştır

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]


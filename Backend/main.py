import os
from fastapi import FastAPI, UploadFile, File, Form, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from typing import List, Dict, Any
from dotenv import load_dotenv
from pathlib import Path


# Servis dosyalarımızı import ediyoruz
# DİKKAT: gemini_service'i başlatmak için yeni bir fonksiyon ekledik
from services.gemini_service import init_gemini, generate_questions_from_gemini, generate_summary_from_gemini, get_recommendations
from services.file_processor import process_uploaded_file
from services.pdf_generator import create_quiz_pdf

# .env dosyasını manuel olarak yükle
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

# API anahtarını burada oku
api_key = os.getenv("GOOGLE_API_KEY")

# Gemini servisini okuduğumuz anahtarla başlat
init_gemini(api_key)

app = FastAPI(title="PratikAi API")

# ... (CORS ayarları aynı, değişiklik yok) ...
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ... (Tüm API endpoint'leri aynı, değişiklik yok) ...
@app.get("/api/v1/health", tags=["General"])
def read_health():
    """Uygulamanın ayakta olup olmadığını kontrol eder."""
    return {"status": "OK"}

@app.post("/api/v1/generate-quiz-from-text", tags=["Quiz Generation"])
def generate_quiz_from_text(
    text: str = Form(...),
    num_questions: int = Form(5),
    question_type: str = Form("çoktan seçmeli"),
    difficulty: str = Form("orta")
):
    """Doğrudan metin alıp sınav ve tavsiye üretir."""
    return generate_questions_from_gemini(text, num_questions, question_type, difficulty)

@app.post("/api/v1/generate-quiz-from-file", tags=["Quiz Generation"])
async def generate_quiz_from_file(
    file: UploadFile = File(...),
    num_questions: int = Form(5),
    question_type: str = Form("çoktan seçmeli"),
    difficulty: str = Form("orta")
):
    """Dosya (resim, pdf) alıp metni çıkarır ve sınav/tavsiye üretir."""
    extracted_text = await process_uploaded_file(file)
    return generate_questions_from_gemini(extracted_text, num_questions, question_type, difficulty)

@app.post("/api/v1/generate-summary-from-text", tags=["Summary Generation"])
def generate_summary_from_text(text: str = Form(...)):
    """Doğrudan metin alıp özet ve tavsiye üretir."""
    summary = generate_summary_from_gemini(text)
    recommendations = get_recommendations(text)
    return {"summary": summary, "recommendations": recommendations}

@app.post("/api/v1/generate-summary-from-file", tags=["Summary Generation"])
async def generate_summary_from_file(file: UploadFile = File(...)):
    """Dosya (resim, pdf) alıp metni çıkarır ve özet/tavsiye üretir."""
    extracted_text = await process_uploaded_file(file)
    summary = generate_summary_from_gemini(extracted_text)
    recommendations = get_recommendations(extracted_text)
    return {"summary": summary, "recommendations": recommendations}

@app.post("/api/v1/download-quiz-pdf", tags=["PDF Generation"])
def download_quiz_pdf(quiz_data: List[Dict[str, Any]] = Body(...)):
    """Sınav verisini (JSON) alıp PDF dosyasına dönüştürür."""
    pdf_path = create_quiz_pdf(quiz_data)
    return FileResponse(path=pdf_path, media_type='application/pdf', filename='PratikAi_Sinavi.pdf')
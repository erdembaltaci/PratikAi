from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Frontend'den gelecek isteklere izin vermek için bu ayar gerekli.
# Yoksa tarayıcı güvenlik sebebiyle bağlantıyı engeller.
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/health")
def read_health():
    """Uygulamanın ayakta olup olmadığını kontrol eden basit bir endpoint."""
    return {"status": "OK"}
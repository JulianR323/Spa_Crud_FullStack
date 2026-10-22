import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Carga el .env junto al backend incluso cuando Uvicorn se inicia desde otra carpeta.
load_dotenv(Path(__file__).resolve().parent / ".env")

from router.entidades import router as citas_router

app = FastAPI(title="Spa App")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL") or "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def welcome():
    return {"message": "Bienvenido al sistema de citas del spa"}


app.include_router(citas_router)
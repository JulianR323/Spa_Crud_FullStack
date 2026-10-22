# Spa Especial

Aplicación CRUD para citas de un salón de belleza o spa, con React, FastAPI y MongoDB.

## Estructura

```text
Backend/
  router/entidades.py
  database.py
  main.py
  models.py
  requirements.txt
cliente/
  src/
    api/entidades.js
    components/
    pages/
    App.jsx
    index.css
```

## Backend

Desde `Backend/`, instala los paquetes y crea el archivo local de configuración:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn main:app --reload
```

MongoDB debe estar disponible en la dirección de `MONGODB_URI` del archivo `.env`.

## Frontend

Desde `cliente/`:

```powershell
npm install
npm run dev
```

Vite sirve la app en `http://localhost:5173` y reenvía `/api` a FastAPI en `http://localhost:8000`.

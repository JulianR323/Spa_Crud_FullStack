import os
import re

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient

cliente = AsyncIOMotorClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
base_datos = cliente[os.getenv("MONGODB_DATABASE", "spa_database")]
coleccion_citas = base_datos.citas


def preparar_cita(cita: dict) -> dict:
    return {**cita, "_id": str(cita["_id"])}


async def get_todas_citas() -> list[dict]:
    citas = []
    async for documento in coleccion_citas.find({}):
        citas.append(preparar_cita(documento))
    return citas


async def get_cita_por_id(cita_id: str) -> dict | None:
    documento = await coleccion_citas.find_one({"_id": ObjectId(cita_id)})
    return preparar_cita(documento) if documento else None


async def existe_cliente(cliente: str, excluir_id: str | None = None) -> bool:
    consulta = {
        "cliente": {"$regex": f"^{re.escape(cliente.strip())}$", "$options": "i"}
    }
    if excluir_id:
        consulta["_id"] = {"$ne": ObjectId(excluir_id)}
    return await coleccion_citas.find_one(consulta, {"_id": 1}) is not None


async def create_cita(cita: dict) -> dict:
    resultado = await coleccion_citas.insert_one(cita)
    nueva_cita = {**cita, "_id": str(resultado.inserted_id)}
    return preparar_cita(nueva_cita)


async def update_cita(cita_id: str, cambios: dict) -> dict | None:
    await coleccion_citas.update_one(
        {"_id": ObjectId(cita_id)},
        {"$set": cambios},
    )
    return await get_cita_por_id(cita_id)


async def delete_cita(cita_id: str) -> bool:
    resultado = await coleccion_citas.delete_one({"_id": ObjectId(cita_id)})
    return resultado.deleted_count == 1

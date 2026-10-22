from bson import ObjectId
from fastapi import APIRouter, HTTPException

from database import (
    create_cita,
    delete_cita,
    existe_cliente,
    get_cita_por_id,
    get_todas_citas,
    update_cita,
)
from models import Cita, CitaCreate, CitaUpdate

router = APIRouter(prefix="/api/citas", tags=["citas"])


def validar_id(cita_id: str) -> str:
    if not ObjectId.is_valid(cita_id):
        raise HTTPException(status_code=400, detail="El formato del ID no es válido")
    return cita_id


@router.get("", response_model=list[Cita])
async def listar_citas():
    return await get_todas_citas()


@router.post("", response_model=Cita, status_code=201)
async def crear_cita(cita: CitaCreate):
    datos = cita.model_dump()
    if await existe_cliente(datos["cliente"]):
        raise HTTPException(
            status_code=409,
            detail="Ya existe una cita registrada con ese nombre de cliente.",
        )
    return await create_cita(datos)


@router.get("/{cita_id}", response_model=Cita)
async def obtener_cita(cita_id: str):
    cita = await get_cita_por_id(validar_id(cita_id))
    if not cita:
        raise HTTPException(status_code=404, detail="No se encontró la cita")
    return cita


@router.put("/{cita_id}", response_model=Cita)
async def editar_cita(cita_id: str, cambios: CitaUpdate):
    cita_id = validar_id(cita_id)
    datos = cambios.model_dump(exclude_unset=True, exclude_none=True)
    if "cliente" in datos and await existe_cliente(datos["cliente"], excluir_id=cita_id):
        raise HTTPException(
            status_code=409,
            detail="Ya existe una cita registrada con ese nombre de cliente.",
        )
    cita = await update_cita(
        cita_id,
        datos,
    )
    if not cita:
        raise HTTPException(status_code=404, detail="No se encontró la cita")
    return cita


@router.delete("/{cita_id}")
async def eliminar_cita(cita_id: str):
    eliminado = await delete_cita(validar_id(cita_id))
    if not eliminado:
        raise HTTPException(status_code=404, detail="No se encontró la cita")
    return {"message": "Cita eliminada"}

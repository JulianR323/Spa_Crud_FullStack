from pydantic import BaseModel, ConfigDict, Field


class Cita(BaseModel):
    id: str = Field(alias="_id")
    cliente: str
    servicio_solicitado: str
    duracion_minutos: int
    confirmado: bool = False

    model_config = ConfigDict(populate_by_name=True)


class CitaCreate(BaseModel):
    cliente: str = Field(min_length=1)
    servicio_solicitado: str = Field(min_length=1)
    duracion_minutos: int = Field(gt=0)
    confirmado: bool = False

    model_config = ConfigDict(str_strip_whitespace=True)


class CitaUpdate(BaseModel):
    cliente: str | None = Field(default=None, min_length=1)
    servicio_solicitado: str | None = Field(default=None, min_length=1)
    duracion_minutos: int | None = Field(default=None, gt=0)
    confirmado: bool | None = None

    model_config = ConfigDict(str_strip_whitespace=True)

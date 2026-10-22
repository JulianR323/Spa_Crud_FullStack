import axios from 'axios'

const API_CITAS = '/api/citas'

async function pedir(peticion) {
  try {
    const respuesta = await peticion
    return respuesta.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const mensaje =
        error.response?.data?.detail || (error.request? 'No se pudo conectar con el servidor. Comprueba que FastAPI esté iniciado.' : error.message)
      throw new Error(mensaje, { cause: error })
    }

    throw error
  }
}

export function listarCitas() {
  return pedir(axios.get(API_CITAS))
}

export function crearCita(cita) {
  return pedir(axios.post(API_CITAS, cita))
}

export function actualizarCita(id, cita) {
  return pedir(axios.put(`${API_CITAS}/${id}`, cita))
}

export function eliminarCita(id) {
  return pedir(axios.delete(`${API_CITAS}/${id}`))
}

export function obtenerCita(id) {
  return pedir(axios.get(`${API_CITAS}/${id}`))
}

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { actualizarCita, eliminarCita, obtenerCita } from '../api/entidades.js'
import CitaForm from './CitaForm.jsx'

function CitaDetail({ id }) {
  const navigate = useNavigate()
  const [cita, setCita] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let activo = true
    obtenerCita(id)
      .then((resultado) => {
        if (activo) setCita(resultado)
      })
      .catch((fallo) => {
        if (activo) setError(fallo.message)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [id])

  function cambiarCampo(evento) {
    const { name, value, checked, type } = evento.target
    setCita((actual) => ({
      ...actual,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function guardarCita(evento) {
    evento.preventDefault()
    setError('')
    try {
      await actualizarCita(id, {
        ...cita,
        duracion_minutos: Number(cita.duracion_minutos),
      })
      navigate('/', {
        state: { mensajeExito: `Actualizada con éxito la cita ID: ${id}` },
      })
    } catch (fallo) {
      setError(fallo.message)
    }
  }

  async function borrarCita() {
    if (!window.confirm(`¿Eliminar la cita de ${cita.cliente}?`)) return

    setError('')
    try {
      await eliminarCita(id)
      navigate('/')
    } catch (fallo) {
      setError(fallo.message)
    }
  }

  return (
    <main className="pagina">
      <Link className="volver" to="/">Volver a las citas</Link>
      {cargando && <p className="mensaje">Cargando cita...</p>}
      {!cargando && error && !cita && <p className="error" role="alert">{error}</p>}
      {cita && (
        <>
          <CitaForm
            cita={cita}
            editando
            onChange={cambiarCampo}
            onGuardar={guardarCita}
            onCancelar={() => navigate('/')}
          />
          {error && <p className="error" role="alert">{error}</p>}
          <button className="eliminar-cita" type="button" onClick={borrarCita}>
            Eliminar cita
          </button>
        </>
      )}
    </main>
  )
}

export default CitaDetail

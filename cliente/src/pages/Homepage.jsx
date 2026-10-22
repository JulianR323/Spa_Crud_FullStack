import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  crearCita,
  listarCitas,
} from '../api/entidades.js'
import CitaList from '../components/CitaList.jsx'
import Navbar from '../components/Navbar.jsx'
import CitaForm from './CitaForm.jsx'

const citaVacia = {
  cliente: '',
  servicio_solicitado: '',
  duracion_minutos: 30,
  confirmado: false,
}

function Homepage() {
  const location = useLocation()
  const [citas, setCitas] = useState([])
  const [cita, setCita] = useState(citaVacia)
  const [formularioAbierto, setFormularioAbierto] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listarCitas()
      .then(setCitas)
      .catch((fallo) => setError(fallo.message))
      .finally(() => setCargando(false))
  }, [])

  function abrirFormulario() {
    setCita(citaVacia)
    setFormularioAbierto(true)
    setError('')
  }

  function cerrarFormulario() {
    setFormularioAbierto(false)
    setCita(citaVacia)
    setError('')
  }

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
    const datos = {
      ...cita,
      duracion_minutos: Number(cita.duracion_minutos),
    }

    try {
      const creada = await crearCita(datos)
      setCitas((actuales) => [...actuales, creada])
      cerrarFormulario()
    } catch (fallo) {
      setError(fallo.message)
    }
  }

  return (
    <main className="pagina">
      <Navbar onCrear={() => abrirFormulario()} />
      {location.state?.mensajeExito && (
        <p className="exito" role="status">{location.state.mensajeExito}</p>
      )}
      {error && <p className="error" role="alert">{error}</p>}
      {formularioAbierto && (
        <CitaForm
          cita={cita}
          editando={false}
          onChange={cambiarCampo}
          onGuardar={guardarCita}
          onCancelar={cerrarFormulario}
        />
      )}
      {!formularioAbierto && (
        <CitaList
          citas={citas}
          cargando={cargando}
        />
      )}
    </main>
  )
}

export default Homepage

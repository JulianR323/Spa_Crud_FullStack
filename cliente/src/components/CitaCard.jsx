import { Link } from 'react-router-dom'

function CitaCard({ cita }) {
  return (
    <Link className="cita-card" to={`/citas/${cita._id}`}>
      <strong>{cita.cliente}</strong>
      <span>{cita.servicio_solicitado}</span>
      <small>{cita.duracion_minutos} min</small>
      <span
        className={cita.confirmado ? 'estado-cita confirmada' : 'estado-cita pendiente'}
        aria-label={cita.confirmado ? 'Confirmada' : 'Pendiente'}
        title={cita.confirmado ? 'Confirmada' : 'Pendiente'}
      >
        {cita.confirmado ? '✓' : '✕'}
      </span>
    </Link>
  )
}

export default CitaCard

import CitaCard from './CitaCard.jsx'

function CitaList({ citas, cargando }) {
  if (cargando) return <p className="mensaje">Cargando citas...</p>
  if (citas.length === 0) return <p className="mensaje">Todavía no hay citas.</p>

  return (
    <section className="cita-lista" aria-label="Lista de citas">
      {citas.map((cita) => (
        <CitaCard
          key={cita._id}
          cita={cita}
        />
      ))}
    </section>
  )
}

export default CitaList

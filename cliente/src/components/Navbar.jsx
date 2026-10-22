function Navbar({ onCrear }) {
  return (
    <header className="navbar">
      <h1>Spa Suavecito</h1>
      <button type="button" onClick={onCrear}>Crear Cita</button>
    </header>
  )
}

export default Navbar

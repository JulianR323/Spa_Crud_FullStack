function CitaForm({ cita, editando, onChange, onGuardar, onCancelar }) {
  return (
    <form className="cita-form" onSubmit={onGuardar}>
      <h2>{editando ? 'Editar cita' : 'Nueva cita'}</h2>
      <label>
        Cliente
        <input
          name="cliente"
          value={cita.cliente}
          onChange={onChange}
          placeholder="Nombre del cliente"
          required
        />
      </label>
      <label>
        Servicio solicitado
        <input
          name="servicio_solicitado"
          value={cita.servicio_solicitado}
          onChange={onChange}
          placeholder="Ej. Manicura"
          required
        />
      </label>
      <label>
        Duración (minutos)
        <input
          name="duracion_minutos"
          type="number"
          min="1"
          value={cita.duracion_minutos}
          onChange={onChange}
          required
        />
      </label>
      <label className="checkbox">
        <input
          name="confirmado"
          type="checkbox"
          checked={cita.confirmado}
          onChange={onChange}
        />
        Cita confirmada
      </label>
      <div className="form-acciones">
        <button type="submit">{editando ? 'Guardar' : 'Crear'}</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  )
}

export default CitaForm

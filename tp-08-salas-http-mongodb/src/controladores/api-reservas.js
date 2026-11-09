function crearControladorApiReservas(servicio) {
  function representarReserva(reserva) {
    return {
      id: String(reserva._id),
      estudiante: reserva.estudiante,
      email: reserva.email,
      sala: reserva.sala,
      fecha: reserva.fecha,
      turno: reserva.turno,
      personas: reserva.personas,
      estado: reserva.estado,
    };
  }

  async function listar(req, res) {
    const filtro = {};

    if (req.query.sala !== undefined) {
      if (typeof req.query.sala !== "string" || !req.query.sala.trim()) {
        return res.status(400).json({
          error: "El filtro sala debe ser un texto válido.",
        });
      }

      filtro.sala = req.query.sala.trim();
    }

    const reservas = await servicio.listar(filtro);

    res.json(reservas.map(representarReserva));
  }

  async function detalle(req, res) {
    const { id } = req.params;

    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({
        error: "El identificador de reserva no es válido.",
      });
    }

    const reserva = await servicio.buscarPorId(id);

    if (!reserva) {
      return res.status(404).json({
        error: "No se encontró la reserva solicitada.",
      });
    }

    res.json(representarReserva(reserva));
  }

  async function crear(req, res) {
    const reserva = await servicio.crear(req.reservaValidada);
    const respuesta = representarReserva(reserva);

    res
      .status(201)
      .location(`/api/reservas/${respuesta.id}`)
      .json(respuesta);
  }

  return { listar, detalle, crear };
}

module.exports = { crearControladorApiReservas };
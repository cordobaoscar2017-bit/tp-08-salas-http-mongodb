const Reserva = require("../modelos/reservas");

function crearServicioReservas() {
  async function listar(filtro = {}) {
    return await Reserva.find(filtro).lean();
  }

  async function buscarPorId(id) {
    return await Reserva.findById(id).lean();
  }

  async function contar() {
    return await Reserva.countDocuments();
  }

  async function crear(datos) {
    const nuevaReserva = await Reserva.create(datos);

    return nuevaReserva.toObject();
  }

  return {
    listar,
    buscarPorId,
    contar,
    crear,
  };
}

module.exports = { crearServicioReservas };
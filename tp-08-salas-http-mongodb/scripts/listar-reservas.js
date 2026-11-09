const mongoose = require("mongoose");
const { conectarBaseDatos } = require("../src/config/base-datos");
const Reserva = require("../src/modelos/reservas");

async function listarReservas() {
  try {
    await conectarBaseDatos();

    const reservas = await Reserva.find().sort({ fecha: 1 });

    if (reservas.length === 0) {
      console.log("No hay reservas guardadas.");
    } else {
      console.log("Reservas guardadas en la base de datos:");
      console.log(reservas);
    }
  } catch (error) {
    console.error("Error al listar las reservas:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

listarReservas();

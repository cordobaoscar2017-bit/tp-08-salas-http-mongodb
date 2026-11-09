const mongoose = require("mongoose");
const { conectarBaseDatos } = require("../src/config/base-datos");
const Reserva = require("../src/modelos/reservas");

async function crearReserva() {
  try {
    await conectarBaseDatos();

    const reserva = new Reserva({
      estudiante: "Juan Pérez",
      email: "juan.perez@example.com",
      sala: "Sala Norte",
      fecha: "2026-11-10",
      turno: "Mañana",
      personas: 4,
    });

    const reservaGuardada = await reserva.save();

    console.log("Reserva guardada correctamente:");
    console.log(reservaGuardada);
  } catch (error) {
    console.error("Error al crear la reserva:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

crearReserva();

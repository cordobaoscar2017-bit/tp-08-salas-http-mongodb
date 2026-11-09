const mongoose = require("mongoose");
const { conectarBaseDatos } = require("../src/config/base-datos");

async function comprobarConexion() {
  try {
    await conectarBaseDatos();
    console.log("Prueba de conexión finalizada correctamente.");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

comprobarConexion();

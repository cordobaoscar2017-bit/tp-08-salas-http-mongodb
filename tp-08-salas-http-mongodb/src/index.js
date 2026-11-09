const { puerto, formatoMorgan } = require("./config/entorno");
const mongoose = require("mongoose");
const { conectarBaseDatos } = require("./config/base-datos");

const { crearServicioReservas } = require("./servicios/reservas");
const { crearControladorReservas } = require("./controladores/reservas");
const { crearValidadorReservas } = require("./middleware/reservas");
const { crearApp } = require("./app");

const salasPermitidas = [
  "Sala Norte",
  "Sala Sur",
  "Sala Multimedia",
];

async function iniciarServidor() {
  try {
    // Primero conectamos con MongoDB
    await conectarBaseDatos();

    // Creamos los componentes de la aplicación
    const servicioReservas = crearServicioReservas();

    const controlador = crearControladorReservas(
      servicioReservas,
      salasPermitidas,
    );

    const validarReserva = crearValidadorReservas(salasPermitidas);

    const app = crearApp({
      controlador,
      validarReserva,
      servicioReservas,
      formatoMorgan,
    });

    // Iniciamos el servidor después de conectar la base de datos
    const servidor = app.listen(puerto, () => {
      console.log(`Servidor funcionando en http://localhost:${puerto}`);
    });

    // Cierre ordenado del servidor y MongoDB
    async function cerrarServidor() {
      console.log("\nCerrando servidor...");

      servidor.close(async () => {
        await mongoose.connection.close();
        console.log("Conexión con MongoDB cerrada.");
        process.exit(0);
      });
    }

    process.on("SIGINT", cerrarServidor);
    process.on("SIGTERM", cerrarServidor);

  } catch (error) {
    console.error("Error al iniciar la aplicación:", error.message);
    process.exit(1);
  }
}

iniciarServidor();
const dns = require("node:dns");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./entorno");

// Configuración de servidores DNS indicada en el TP.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function conectarBaseDatos() {
  if (!MONGODB_URI || !MONGODB_URI.startsWith("mongodb+srv://")) {
    throw new Error(
      "Configuración incorrecta: falta MONGODB_URI o su prefijo es inválido.",
    );
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Conexión con MongoDB establecida correctamente.");
}

module.exports = { conectarBaseDatos };

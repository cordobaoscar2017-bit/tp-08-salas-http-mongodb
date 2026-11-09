require("dotenv").config();

const puerto = Number(process.env.PORT || 3000);
const entorno = process.env.NODE_ENV || "development";
const MONGODB_URI = process.env.MONGODB_URI;

if (!Number.isInteger(puerto) || puerto < 1 || puerto > 65535) {
  throw new Error("PORT debe ser un número entero entre 1 y 65535");
}

const formatoMorgan = entorno === "production" ? "combined" : "dev";

module.exports = {
  puerto,
  entorno,
  formatoMorgan,
  MONGODB_URI,
};

const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");

const {
  identificarSolicitud,
  medirDuracion,
} = require("./middleware/solicitudes");

const { crearRouterReservas } = require("./rutas/reservas");
const { crearRouterApiReservas } = require("./rutas/api-reservas");
const {
  crearControladorApiReservas,
} = require("./controladores/api-reservas");
const { crearValidadorApiReservas } = require("./middleware/reservas");
const { manejarErrores } = require("./middleware/errores");

function crearApp({
  controlador,
  validarReserva,
  servicioReservas,
  formatoMorgan,
}) {
  const app = express();

  // Middleware general
  app.use(morgan(formatoMorgan));
  app.use(identificarSolicitud);
  app.use(medirDuracion);

  // Configuración de las vistas
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.use(expressLayouts);
  app.set("layout", "layouts/main");

  // Archivos estáticos y formularios
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Título por defecto
  app.use((req, res, next) => {
    res.locals.titulo = "TP08 - Reservas de salas";
    next();
  });

  // Rutas principales
  app.get("/", controlador.inicio);
  app.get("/estado", controlador.estado);

  // Rutas HTML de reservas
  const reservasRouter = crearRouterReservas(
    controlador,
    validarReserva,
  );

  app.use("/reservas", reservasRouter);

  // Rutas de la API
  const controladorApi = crearControladorApiReservas(servicioReservas);

  const validarReservaApi = crearValidadorApiReservas([
    "Sala Norte",
    "Sala Sur",
    "Sala Multimedia",
  ]);

  const apiReservasRouter = crearRouterApiReservas(
    controladorApi,
    validarReservaApi,
  );

  app.use("/api/reservas", apiReservasRouter);

  // Manejo de rutas inexistentes
  app.use((req, res) => {
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({
        error: "La dirección de la API solicitada no existe.",
      });
    }

    res.status(404).render("no-encontrado", {
      titulo: "Página no encontrada",
      mensaje: "La dirección solicitada no existe.",
    });
  });

  // Manejo general de errores
  app.use(manejarErrores);

  return app;
}

module.exports = { crearApp };
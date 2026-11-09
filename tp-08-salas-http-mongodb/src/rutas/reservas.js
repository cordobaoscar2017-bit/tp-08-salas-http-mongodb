const express = require("express");

function crearRouterReservas(controlador, validarReserva) {
  const router = express.Router();

  router.use((req, res, next) => {
    res.locals.seccion = "Reservas de salas";
    next();
  });

  router.get("/", controlador.listar);
  router.get("/nueva", controlador.nueva);
  router.get("/:id", controlador.detalle);

  router.post("/", validarReserva, controlador.crear);

  return router;
}

module.exports = { crearRouterReservas };

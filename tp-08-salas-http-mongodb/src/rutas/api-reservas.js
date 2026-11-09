const express = require("express");

function crearRouterApiReservas(controlador, validarReservaApi) {
  const router = express.Router();

  router.get("/", controlador.listar);

  router.get("/:id", controlador.detalle);

  router.post("/", validarReservaApi, controlador.crear);

  return router;
}

module.exports = { crearRouterApiReservas };
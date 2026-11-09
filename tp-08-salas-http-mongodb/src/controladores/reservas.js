function crearControladorReservas(servicio, salasPermitidas) {
  function inicio(req, res) {
    res.render("inicio", {
      titulo: "Reservas de salas",
    });
  }

  async function estado(req, res) {
    const cantidad = await servicio.contar();

    res.json({
      servicio: "activo",
      reservas: cantidad,
      solicitudId: res.locals.solicitudId,
    });
  }

  async function listar(req, res) {
    const documentos = await servicio.listar();

    const reservas = documentos.map((reserva) => ({
      ...reserva,
      id: String(reserva._id),
    }));

    res.render("reservas/lista", {
      titulo: "Listado de reservas",
      reservas,
    });
  }

  function nueva(req, res) {
    res.render("nueva", {
      titulo: "Nueva reserva",
      salas: salasPermitidas,
      valores: {},
    });
  }

  async function detalle(req, res) {
  const id = req.params.id;

  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    return res.status(400).render("no-encontrado", {
      titulo: "Identificador incorrecto",
      mensaje: "El identificador de la reserva no es válido.",
    });
  }

  const documento = await servicio.buscarPorId(id);

  if (!documento) {
    return res.status(404).render("no-encontrado", {
      titulo: "Reserva no encontrada",
      mensaje: "La reserva solicitada no existe.",
    });
  }

  const reserva = {
    ...documento,
    id: String(documento._id),
  };

  res.render("reservas/detalle", {
    titulo: "Detalle de reserva",
    reserva,
  });
}

  async function crear(req, res) {
    await servicio.crear(req.reservaValidada);
    res.redirect("/reservas");
  }

  return {
    inicio,
    estado,
    listar,
    nueva,
    detalle,
    crear,
  };
}

module.exports = { crearControladorReservas };
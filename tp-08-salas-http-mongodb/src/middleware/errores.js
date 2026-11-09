function manejarErrores(err, req, res, _next) {
  console.error("Error:", err.message);

  const esApi = req.originalUrl.startsWith("/api/");

  if (esApi) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({
        error: "Los datos enviados no son válidos.",
      });
    }

    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({
        error: "El formato JSON enviado no es válido.",
      });
    }

    return res.status(500).json({
      error: "Ocurrió un error interno del servidor.",
    });
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).render("no-encontrado", {
      titulo: "Solicitud incorrecta",
      mensaje: "Los datos enviados no son válidos.",
    });
  }

  res.status(500).render("no-encontrado", {
    titulo: "Error del servidor",
    mensaje: "Ocurrió un error interno. Intentá nuevamente.",
  });
}

module.exports = { manejarErrores };
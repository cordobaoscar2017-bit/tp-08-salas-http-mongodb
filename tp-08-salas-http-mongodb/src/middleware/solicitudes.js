let contadorSolicitudes = 0;

function identificarSolicitud(req, res, next) {
  contadorSolicitudes++;

  const numero = String(contadorSolicitudes).padStart(4, "0");

  res.locals.solicitudId = `BIB-${numero}`;

  next();
}

function medirDuracion(req, res, next) {
  const inicio = Date.now();

  res.on("finish", () => {
    const duracion = Date.now() - inicio;

    console.log(
      `[MEDICIÓN] ${res.locals.solicitudId} | ${req.method} ${req.originalUrl} | ${res.statusCode} | ${duracion} ms`,
    );
  });

  next();
}

module.exports = {
  identificarSolicitud,
  medirDuracion,
};

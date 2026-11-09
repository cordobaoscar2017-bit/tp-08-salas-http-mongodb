function crearValidadorReservas(salasPermitidas) {
  function validarReserva(req, res, next) {
    const cuerpo = req.body || {};

    const valores = {
      estudiante: typeof cuerpo.estudiante === "string"
        ? cuerpo.estudiante.trim() : "",
      email: typeof cuerpo.email === "string"
        ? cuerpo.email.trim() : "",
      sala: typeof cuerpo.sala === "string"
        ? cuerpo.sala.trim() : "",
      fecha: typeof cuerpo.fecha === "string"
        ? cuerpo.fecha.trim() : "",
      turno: typeof cuerpo.turno === "string"
        ? cuerpo.turno.trim() : "",
      personas: typeof cuerpo.personas === "string"
        ? cuerpo.personas.trim() : "",
    };

    const personasNumero = Number(valores.personas);

    const valido =
      valores.estudiante !== "" &&
      valores.email.includes("@") &&
      salasPermitidas.includes(valores.sala) &&
      valores.fecha !== "" &&
      ["Mañana", "Tarde", "Noche"].includes(valores.turno) &&
      valores.personas !== "" &&
      Number.isInteger(personasNumero) &&
      personasNumero >= 1 &&
      personasNumero <= 6;

    if (!valido) {
      return res.status(400).render("nueva", {
        titulo: "Nueva reserva",
        salas: salasPermitidas,
        valores,
        error: "Los datos ingresados no son válidos. Verificá todos los campos.",
      });
    }

    req.reservaValidada = {
      estudiante: valores.estudiante,
      email: valores.email,
      sala: valores.sala,
      fecha: valores.fecha,
      turno: valores.turno,
      personas: personasNumero,
    };

    next();
  }

  return validarReserva;
}

// Validador exclusivo para la API JSON
function crearValidadorApiReservas(salasPermitidas) {
  function validarReservaApi(req, res, next) {
    const cuerpo = req.body;

    if (
      !cuerpo ||
      typeof cuerpo !== "object" ||
      Array.isArray(cuerpo)
    ) {
      return res.status(400).json({
        error: "El cuerpo de la solicitud debe ser un objeto JSON.",
      });
    }

    const camposTexto = [
      "estudiante",
      "email",
      "sala",
      "fecha",
      "turno",
    ];

    const textosValidos = camposTexto.every(
      (campo) =>
        typeof cuerpo[campo] === "string" &&
        cuerpo[campo].trim() !== ""
    );

    const emailValido =
      typeof cuerpo.email === "string" &&
      cuerpo.email.trim().includes("@");

    const salaValida =
      typeof cuerpo.sala === "string" &&
      salasPermitidas.includes(cuerpo.sala.trim());

    const turnoValido =
      typeof cuerpo.turno === "string" &&
      ["Mañana", "Tarde", "Noche"].includes(cuerpo.turno.trim());

    const personasValidas =
      typeof cuerpo.personas === "number" &&
      Number.isInteger(cuerpo.personas) &&
      cuerpo.personas >= 1 &&
      cuerpo.personas <= 6;

    if (
      !textosValidos ||
      !emailValido ||
      !salaValida ||
      !turnoValido ||
      !personasValidas
    ) {
      return res.status(400).json({
        error: "Los datos de la reserva no son válidos.",
      });
    }

    req.reservaValidada = {
      estudiante: cuerpo.estudiante.trim(),
      email: cuerpo.email.trim(),
      sala: cuerpo.sala.trim(),
      fecha: cuerpo.fecha.trim(),
      turno: cuerpo.turno.trim(),
      personas: cuerpo.personas,
    };

    next();
  }

  return validarReservaApi;
}

function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de salas";
  next();
}

module.exports = {
  crearValidadorReservas,
  crearValidadorApiReservas,
  prepararAreaReservas,
};
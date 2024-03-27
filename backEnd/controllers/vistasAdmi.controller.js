import { ruta } from "../service.js";

//renderiza la vista del administrador
export const bienvenidoAdmi = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/inicioAdministrador", { user });
};

export const expedientesEstudiantiles = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/expedienteEstudiantil", { user });
};

export const detalleExpedientes = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/detalleExpedientes", { user });
};

export const solicitudes = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/solicitudes", { user });
};

export const vistasAdmiController = {
  bienvenidoAdmi,
  expedientesEstudiantiles,
  detalleExpedientes,
  solicitudes
};

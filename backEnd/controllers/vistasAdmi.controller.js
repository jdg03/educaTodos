import { ruta } from "../service.js";

//renderiza la vista del administrador
export const bienvenidoAdmi = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/admi/inicioAdministrador", { user });
};

export const expedientesEstudiantiles = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/admi/expedienteEstudiantil", { user });
};

export const detalleExpedientes = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/admi/detalleExpediente", { user });
};

export const solicitudes = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/admi/solicitudes", { user });
};

export const vistasAdmiController = {
  bienvenidoAdmi,
  expedientesEstudiantiles,
  detalleExpedientes,
  solicitudes
};

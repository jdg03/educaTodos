import { rutaAdmi } from "../service.js";
//renderiza la vista del administrador
export const bienvenidoAdmi = async (req, res) => {
  const user = req.user;
  res.render(rutaAdmi + "/inicioAdministrador", { user });
};

export const expedientesEstudiantiles = async (req, res) => {
  const user = req.user;
  res.render(rutaAdmi + "/expedienteEstudiantiles", { user });
};

export const detalleExpedientes = async (req, res) => {
  const user = req.user;
  res.render(rutaAdmi + "/detalleExpedientes", { user });
};

export const solicitudes = async (req, res) => {
  const user = req.user;
  res.render(rutaAdmi + "/solicitudes", { user });
};

export const institucionesAdmi = async (req, res)=>{
  const user = req.user;
  res.render(rutaAdmi + "/tablainstitutos", { user });
}

export const usuarios = async(req, res) =>{
  const user = req.user;
  res.render(rutaAdmi + "/tablausuarios", { user });
}

export const vistasAdmiController = {
  bienvenidoAdmi,
  expedientesEstudiantiles,
  detalleExpedientes,
  solicitudes,
  institucionesAdmi,
  usuarios
};

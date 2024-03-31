import { rutaAdmi } from "../service.js";
import Instituto from "../models/institucion.model.js";
import Usuario from "../models/usuarios.model.js"

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

export const institucionesAdmi = async (req, res) => {
  const user = req.user;

  const institutos = await Instituto.getAll();
  res.render(rutaAdmi + "/tablainstitutos", { user, institutos });
}

export const usuarios = async (req, res) => {
  const user = req.user;

  const usuarios = await Usuario.getAllUsers()
  res.render(rutaAdmi + "/tablausuarios", { user, usuarios});
}

export const vistasAdmiController = {
  bienvenidoAdmi,
  expedientesEstudiantiles,
  detalleExpedientes,
  solicitudes,
  institucionesAdmi,
  usuarios
};

import { rutaAdmi } from "../service.js";
import Instituto from "../models/institucion.model.js";
import Usuario from "../models/usuarios.model.js"
import expedienteEstudiantil from "../models/expedienteEstudiantil.model.js";

//renderiza la vista del administrador
export const bienvenidoAdmi = async (req, res) => {
  const user = req.user;
  res.render(rutaAdmi + "/inicioAdministrador", { user });
};

export const expedientesEstudiantiles = async (req, res) => {
  const user = req.user;

  const expedientes = await expedienteEstudiantil.getAllExpedientesInfo()

 // res.status(200).json(expedientes);

  res.render(rutaAdmi + "/expedienteEstudiantiles", { user, expedientes});
};


export const detalleExpedientes = async (req, res) => {
  const user = req.user;
  const id = req.params.id_expediente;

  const detalleExpediente = await expedienteEstudiantil.getExpedienteCompletoById(id);

   //res.status(200).json(detalleExpediente);

  res.render(rutaAdmi + "/detalleExpedientes", { user, detalleExpediente});
};

export const solicitudes = async (req, res) => {
  const user = req.user;
  res.render(rutaAdmi + "/solicitudesAdmi", { user });
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

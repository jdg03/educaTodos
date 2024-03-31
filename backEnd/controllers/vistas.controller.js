import { ruta } from "../service.js";
import Instituto from "../models/institucion.model.js";
import grado_seccionModel from "../models/grado_seccion.model.js";

// controlador para renderizar las vistas

//lleva a la pgina de login
export const login = async (req, res) => {
  res.render(ruta + "/login", { message: null });
};

//lleva a la pagina de singUp
export const singUp = async (req, res) => {
  res.render(ruta + "/singUp", { message: null });
};


export const expedienteTutor = async (req, res) => {
 
  res.render(ruta + "/expedienteTutor");
};


export const expedienteEstudiante = async (req, res) => {
  
  res.render(ruta + "/expedienteEstudiante");
};


export const expediente = async(req, res) =>{

  const institutos = await Instituto.getAll();

  res.render(ruta + "/creacionExpediente", {institutos});
}


export const expedienteCreado = async(req, res) =>{

  res.render(ruta + "/finexpedienteEs");
}

//________________vistas protegidas___________________________________
export const bienvenido = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/iniciousuario", { user });
};

export const institutos = async (req, res) => {
  const user = req.user;

  const institutos = await Instituto.getAll();

  res.render(ruta + "/institutos", { user, institutos });
};

export const matricula = async (req, res) => {
  const user = req.user;

  const secciones = await grado_seccionModel.getGradosByInstitute(1)

  res.render(ruta + "/matriculainstituto", { user, secciones });
};



export const vistasController = {
  login,
  singUp,
  bienvenido,
  expedienteTutor,
  expedienteEstudiante,
  expediente,
  expedienteCreado,
  institutos,
  matricula
};

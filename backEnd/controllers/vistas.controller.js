import { ruta } from "../service.js";

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

  res.render(ruta + "/creacionExpediente");
}


export const expedienteCreado = async(req, res) =>{

  res.render(ruta + "/finexpedienteEs");
}

//renderiza la vista del usuario
export const bienvenido = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/iniciousuario", { user });
};

export const institutos = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/institutos", { user });
};

export const matricula = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/matriculainstituto", { user });
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

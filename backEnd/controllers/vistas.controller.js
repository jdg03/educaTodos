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


//renderiza la vista del usuario
export const bienvenido = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/iniciousuario", { user });
};


export const expedienteTutor = async (req, res) => {
 
  res.render(ruta + "/expedienteTutor");
};


export const expedienteEstudiante = async (req, res) => {
  
  res.render(ruta + "/expedienteEstudiante");
};


export const expediente = async(req, res) =>{

  res.render(ruta + "/expediente");
}


export const vistasController = {
  login,
  singUp,
  bienvenido,
  expedienteTutor,
  expedienteEstudiante,
  expediente
};
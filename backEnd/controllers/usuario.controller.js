import { ruta } from "../service.js";
import Usuario from "../models/usuarios.model.js"


//lleva a la pgina de login
export const login = async (req, res) => {
  res.render(ruta + "/login", { message: null });
};

//lleva a la pagina de singUp
export const singUp = async (req, res) => {
  res.render(ruta + "/singUp", { message: null });
};


export const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Controlador para obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await Usuario.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

//renderiza la vista del usuario
export const bienvenido = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/iniciousuario", { user });
};


export const expedienteTutor = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/expedienteTutor", { user });
};


export const expedienteEstudiante = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/expedienteEstudiante", { user });
};



export const UsuarioController = {
  findUserById,
  getAllUsers,
  login,
  singUp,
  bienvenido,
  expedienteTutor,
  expedienteEstudiante
};

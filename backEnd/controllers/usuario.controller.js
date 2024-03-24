import { ruta } from "../service.js";
import Usuario from "../models/usuarios.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const {JWT_SECRETO, JWT_EXPIRES_IN} = process.env;


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


//metodo para registarse
export const authSignUp = async (req, res) => {
  const { nombre, correo, contraseña, contraseñaConfirm } = req.body;

  try {
    const existingUser = await Usuario.findByEmail(correo);

     // verifica si existe alguien con ese correo
    if (existingUser) {
     
      return res.redirect("/singUp/page");
      
    // verifica si las contraseñas coinciden
    }else if (contraseña !== contraseñaConfirm) {

      return res.redirect("/singUp/page");
    }

    const hashPassword = await bcrypt.hash(contraseña, 8);
    const esCorreoEduHn = correo.endsWith(".edu.hn");
    const rol = esCorreoEduHn ? 2 : 1;

    await Usuario.createUser(nombre, correo, hashPassword, rol);

    // usuario creado con exito regrese a la pagina de login
    return res.redirect("/login/page");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
};

//método para iniciar sesion
export const authLoginJwt = async (req, res) => {
 
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findByEmail(correo);

    // verifica si existe un usuario registrado con el correo que ingreso
    if (!usuario) {
  
      return res.redirect("/login/page");
    }

    const contraseñaValida = await Usuario.comparePassword(contraseña, usuario.contraseña);

    // verifica si las contraseñas coinciden
    if (!contraseñaValida) {
     
      return res.redirect("/login/page");
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, correo: usuario.correo_electronico, rol: usuario.id_rol },
      JWT_SECRETO,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const cookiesOptions = {
      expires: new Date(Date.now() + (3 * 60 * 60 * 1000)),//tiempo que dura la cookie
      httpOnly: true
    };

    // Almacenar el token en una cookie
    res.cookie('jwt', token, cookiesOptions);
  
      return res.redirect('/bienvenido');
    
  
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
};

// destruye el token y cierra la sesion
export const logoutJwt = (req, res) => {
  res.clearCookie('jwt');
  return res.redirect('/');
};

//renderiza la vista del usuario
export const bienvenido = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/iniciousuario", { user });
};


export const expediente = async (req, res) => {
  const user = req.user;
  res.render(ruta + "/tutor", { user });
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//import Persona from "../models/personas.model.js";
import Usuario from "../models/usuarios.model.js";
import Tutor from "../models/tutor.model.js";
import ExpedienteEstudiantil from "../models/expedienteEstudiantil.model.js"
import { sendEmail, generateRandom } from "../services/mail.service.js";

dotenv.config();

const { JWT_SECRETO, JWT_EXPIRES_IN } = process.env;

//metodo para registarse
export const registro = async (req, res) => {
  const datos = req.body;

  try {
    const existingUser = await Usuario.findByEmail(datos.correo_electronico);
    const dniUser = await Usuario.findByDni(datos.dni);

    //verifica si existe alguien con ese correo
    if (existingUser) {
      console.log("correo ya registrado")
      return res.redirect("/expediente");
    }

    //verifica si existe alguien con ese dni ya registrado
    if (dniUser) {
      console.log("Dni ya registrado")
      return res.redirect("/expediente");
    } 

    // obteniendo los campos que corresponden al tutor
    const nuevoTutor = {
      primer_nombre: datos.primer_nombre_tutor,
      segundo_nombre: datos.segundo_nombre_tutor,
      primer_apellido: datos.primer_apellido_tutor,
      segundo_apellido: datos.segundo_apellido_tutor,
      dni: datos.dni,
      fecha_nacimiento: datos.fecha_nacimiento_tutor,
      genero_id: datos.genero_id_tutor,
      ocupacion: datos.ocupacion,
      correo_electronico: datos.correo_electronico,
      telefono: datos.telefono,
     
    };

    //crea un nombre de usuario 
    const nombreUsuario = datos.primer_nombre_estudiante+datos.segundo_nombre_estudiante+ generateRandom(4);
    // crea la contraseña encriptada
    const hashPassword = await bcrypt.hash(datos.clave, 8);

    // obtenine los campos que corresponden al estudiante(usuario) y asigna un nombre de usuario y una contraseña
    const nuevoEstudiante = {
      primer_nombre: datos.primer_nombre_estudiante,
      segundo_nombre: datos.segundo_nombre_estudiante,
      primer_apellido: datos.primer_apellido_estudiante,
      segundo_apellido: datos.segundo_apellido_estudiante,
      dni: datos.id_estudiante,
      fecha_nacimiento: datos.fecha_nacimiento_estudiante,
      genero_id: datos.genero_id_estudiante,
      id_rol: 1,
      nombre_usuario:nombreUsuario,
      clave: hashPassword

    };

    const tutor = await Tutor.createTutor(nuevoTutor)
    const estudiante = await Usuario.createUser(nuevoEstudiante);

    //logica para guardar los archivos y que pertenezcan a tutor.id y estudiante.id

    //logica para crear el expediente con los datos de tutor.id y estudiante.id

    //lleva a la pagina de inicio
    return res.redirect("/bienvenido");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
};

//método para iniciar sesion
export const authLoginJwt = async (req, res) => {
  const { nombreUsuario, contraseña } = req.body;

  try {
    
    const usuario = await Usuario.findByUserName(nombreUsuario);

    // verifica si existe un usuario registrado
    if (!usuario) {
      return res.redirect("/singUp");
    }

    const contraseñaValida = await Usuario.comparePassword(contraseña, usuario.contraseña);

    // verifica si las contraseña es correcta
    if (!contraseñaValida) {
      return res.redirect("/singUp");
    }

    //las credenciales que ingreso son correctas y crea el token
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        correo: usuario.correo_electronico,
        rol: usuario.id_rol,
        nombre: usuario.primer_nombre,
        apellido: usuario.primer_apellido
      },
      JWT_SECRETO,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const cookiesOptions = {
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000), //tiempo que dura la cookie
      httpOnly: true,
    };

    // Almacenar el token en una cookie
    res.cookie("jwt", token, cookiesOptions);

    return res.redirect("/bienvenido");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
};

// destruye el token y cierra la sesion
export const logoutJwt = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};

export const expedienteController = {
  registro,
  authLoginJwt,
  logoutJwt,
};
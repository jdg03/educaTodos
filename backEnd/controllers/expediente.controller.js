import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Persona from "../models/personas.model.js";
import Usuario from "../models/usuarios.model.js";

dotenv.config();

const { JWT_SECRETO, JWT_EXPIRES_IN } = process.env;

//metodo para registarse
export const registro = async (req, res) => {
  const datos = req.body;



  try {
    const existingUser = await Usuario.findByEmail(datos.correo_electronico);

    //verifica si existe alguien con ese correo
    if (existingUser) {
      return res.redirect("/expedienteTutor");
    } else if (datos.clave !== datos.confirmarclave) {
      return res.redirect("/expedienteTutor");
    }

    // creando la contraseña encriptada
    const hashPassword = await bcrypt.hash(datos.clave, 8);


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
      id_rol: datos.id_rol,
      clave: hashPassword// clave encriptada
    };
  
    //el estudiante debe tener clave y correo null creo 
    const nuevoEstudiante = {
      primer_nombre: datos.primer_nombre,
      segundo_nombre: datos.segundo_nombre,
      primer_apellido: datos.primer_apellido,
      segundo_apellido: datos.segundo_apellido,
      dni: datos.dni,
      fecha_nacimiento: datos.fecha_nacimiento,
      genero_id: datos.genero_id,

    };


    const usuarioTutor = await Usuario.createUser(nuevoTutor);
    const usuarioEstudiante = await Usuario.createUser(nuevoEstudiante);

   
    //logica para crear el expediente con los datos de usuarioTutor y usuarioEstudiante

    //lleva a la pagina de inicio
    return res.redirect("/bienvenido");
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
      return res.redirect("/singUp");
    }

    const contraseñaValida = await Usuario.comparePassword(
      contraseña,
      usuario.contraseña
    );

    // verifica si las contraseña es correcta
    if (!contraseñaValida) {
      return res.redirect("/singUp");
    }

    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        correo: usuario.correo_electronico,
        rol: usuario.id_rol,
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

export const registroController = {
  registro,
  authLoginJwt,
  logoutJwt,
};

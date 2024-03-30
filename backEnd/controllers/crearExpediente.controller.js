import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//import Persona from "../models/personas.model.js";
import Usuario from "../models/usuarios.model.js";
import Tutor from "../models/tutor.model.js";
import ExpedienteEstudiantil from "../models/expedienteEstudiantil.model.js"
import { sendCorreo, generateRandom } from "../services/mail.service.js";

dotenv.config();

const { JWT_SECRETO, JWT_EXPIRES_IN } = process.env;

//metodo para registarse
export const registro = async (req, res) => {
  const datos = req.body;
  

  try {
    //const existingUser = await Usuario.findByEmail(datos.correo_electronico);
    const dniUser = await Usuario.findByDni(datos.dni);

    //verifica si existe alguien con ese correo
    //if (existingUser) {
      //console.log("correo ya registrado")
      //return res.redirect("/expediente");
    //}

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

    //crea al tutor
    const tutor = await Tutor.createTutor(nuevoTutor);
    console.log("se inserto al tutor:"+tutor.id_tutor)

    //crea un nombre de usuario 
    const nombreUsuario = datos.primer_nombre_estudiante+datos.segundo_nombre_estudiante+ generateRandom(4);
    const clave = generateRandom(4)
  
    // crea la contraseña encriptada de la contraseña generada aleatoriamente
    const hashPassword = await bcrypt.hash(clave, 8);

    // obtenine los campos que corresponden al estudiante(usuario) y asigna un nombre de usuario y una contraseña
    const nuevoEstudiante = {
      primer_nombre: datos.primer_nombre_estudiante,
      segundo_nombre: datos.segundo_nombre_estudiante,
      primer_apellido: datos.primer_apellido_estudiante,
      segundo_apellido: datos.segundo_apellido_estudiante,
      dni: datos.id_estudiante,
      fecha_nacimiento: datos.fecha_nacimiento_estudiante,
      genero_id: datos.genero_id_estudiante,
      id_rol: 1, // rol por defecto 1
      usuario:nombreUsuario,
      clave: hashPassword//contraseña encriptada

    };
    
    //usuario
    const estudiante = await Usuario.createUser(nuevoEstudiante);

    //logica para guardar los archivos y que pertenezcan a tutor.id y estudiante.id

    //creao el expediente con los datos de tutor.id estudiante.id_usuario y institucion = 1
    const expedienteEstudiantil = await ExpedienteEstudiantil.createExpedienteEstudiantil(estudiante.id_usuario,1,estudiante.id_rol)

    //envia las credenciales al correo especificado por el tutor nombre, apellido, usurio y contraseña
    sendCorreo(estudiante.primer_nombre, estudiante.primer_apellido, nombreUsuario, clave, tutor.correo_electronico)
    console.log("se enviara corrreo a: "+ tutor.correo_electronico)

    //lleva a la vista de expediente creado exitosamente
    return res.redirect("/fineexpedienteEs");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
};

//método para iniciar sesion
export const authLoginJwt = async (req, res) => {
  const { nombreUsuario, password } = req.body;

// Verifica si existe un usuario registrado
const usuario = await Usuario.findByUserName(nombreUsuario);

console.log(usuario); // Muestra el estudiante encontrado en la consola

// Verifica si no se encontró ningún estudiante
if (!usuario) {
  console.log("Usuario no registrado");
  return res.redirect("/login");
}

// Compara la contraseña del formulario con la del estudiante registrado
const contraseñaValida = await Usuario.comparePassword(password, usuario.clave);

// Verifica si la contraseña no es válida, agregue usuario.id_rol !== 1 de momento para poder crear un administrado desde la base de datos sin tener que llenar el formulario
if (!contraseñaValida && usuario.id_rol == 1) {
  console.log("Credenciales del usuario inválidas");
  return res.redirect("/login");
}

//solo si es administrador
if(usuario.id_rol == 2 && usuario.clave !=password){

  console.log("Credenciales del administrador inválidas");
  return res.redirect("/login");

}

// Las credenciales ingresadas son correctas y crea el token
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
  expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // Tiempo que dura la cookie
  httpOnly: true,
};

// Almacena el token en una cookie
res.cookie("jwt", token, cookiesOptions);

// Verificar el rol del usuario y redirigir según sea necesario
if (usuario.id_rol === 2) {
 
  return res.redirect('/bienvenidoAdmi');
} else {
 
  return res.redirect('/bienvenido');
}
};

// destruye el token y cierra la sesion
export const logoutJwt = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/educaTodos");
};

export const expedienteController = {
  registro,
  authLoginJwt,
  logoutJwt,
};

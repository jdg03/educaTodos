import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Persona from "../models/personas.model.js";
import Usuario from "../models/usuarios.model.js"


dotenv.config();

const {JWT_SECRETO, JWT_EXPIRES_IN} = process.env;

//metodo para registarse
export const authSignUp = async (req, res) => {
    const datos = req.body;
  
    try {
      
      const existingUser = await Usuario.findByEmail(datos.correo_electronico);
  
       //verifica si existe alguien con ese correo
      if (existingUser) {
       
        return res.redirect("/singUp/page");
        
      // verifica si las contraseñas coinciden
      }else if (datos.clave !== datos.confirmarclave) {
        return res.redirect("/singUp/page");
      }
  
      const hashPassword = await bcrypt.hash(datos.clave , 8);
      const esCorreoEduHn = correo.endsWith(".edu.hn");
      //const rol = esCorreoEduHn ? 2 : 1;
  
      // crar a la persona
      const personaCreada = await Persona.createPersona(datos)

      //creaa el usuario
      await Usuario.createUser(personaCreada.id_persona, correo, hashPassword, 1);


  
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
  

  
export const registroController = {
    authSignUp,
    authLoginJwt,
    logoutJwt
  };
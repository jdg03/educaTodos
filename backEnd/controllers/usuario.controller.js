import { ruta } from "../service.js";
import Usuario from "../models/usuarios.model.js"
import bcrypt from "bcryptjs";


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
  const {correo, contraseña, contraseñaConfirm } = req.body;

  try {
    const existingUser = await Usuario.findByEmail(correo);

    if (existingUser) {
      return res.render(ruta +"/singUp", {
        message: "El correo electrónico ya está registrado",
      });
    } else if (contraseña !== contraseñaConfirm) {
      return res.render(ruta + "/singUp", {
        message: "Las contraseñas no coinciden",
      });
    }

    //encripta la contraseña
    const hashPassword = await bcrypt.hash(contraseña, 8);
    
    const esCorreoEduHn = correo.endsWith(".edu.hn");

    //si esCorreoEduHn termina en .edu.hn tendra rol administrador sino será usuario_corriente
    const rol = esCorreoEduHn ? 2 : 1;

    //crea el usuario mediante el modelo
    await Usuario.createUser(correo, hashPassword, rol);

    //renderiza la pagina de login para que el usuario pueda ingresar con los datos con los que se registró
    return res.render(ruta + "/login", {
      message: "Su usuario fue creado con éxito!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
};

//método para iniciar sesion
export const authLoginSession = async (req, res) => {

  //extrae los datos del request 
  const { correo, contraseña } = req.body;

  try {
    //verifica si existe un usuario registrado con el correo que proporcionó
    const usuario = await Usuario.findByEmail(correo);

    if (!usuario) {
      return res.render(ruta + "/login", {
        message: "El correo electrónico no está registrado",
      });
    }

    //verifica si la contraseña ingresada coincide con la registrada en la base de datos
    const contraseñaValida = await Usuario.comparePassword(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      return res.render(ruta + "/login", {
        message: "Contraseña incorrecta",
      });
    }

    //las credenciales son correctas y crea una sesion con los datos del usuario
    req.session.user = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    req.session.isloggedin = true;
    req.session.username = usuario.id;

    //si el correo termina .edu.hn significa que es administrador y podra ver las rutas del administrador
    if (correo.endsWith(".edu.hn")) {
      return res.redirect('/bienvenidoAdmi');
    } else {
      return res.redirect('/bienvenido');
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
};


export const logout = (req, res) => {
  // Destruye la sesión del usuario
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar la sesión:", err);
      return res.status(500).send("Error en el servidor");
    }
    // Redirige al usuario a la página de inicio de sesión después de cerrar la sesión
    res.redirect("/");
  });
};


export const bienvenido = async (req, res) => {
  const user = req.session.user;
  res.render(ruta + "/bienvenido", { user });
};

export const bienvenidoAdmi = async (req, res) => {
  const user = req.session.user;
  res.render(ruta + "/bienvenidoAdmi",{ user });
};


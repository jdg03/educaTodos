import Router from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";

const router = Router();

//ruta para obtener todos los usuarios
router.get('/usuarios',UsuarioController.getAllUsers)
//ruta para obtener un usuario
router.get('/usuario/id',UsuarioController.findUserById)

//ruta que lleva a la pagina de login
router.get('/login/page',UsuarioController.login)
//ruta que lleva a pagina de registro
router.get('/singUp/page',UsuarioController.singUp)


//ruta que lleva a las paginas de bienvenida con los datos del usuario que inicio sesión dependiendo su rol
router.get('/bienvenido',UsuarioController.bienvenido);
router.get('/expedienteTutor', UsuarioController.expedienteTutor)
router.get('/expedienteEstudiante', UsuarioController.expedienteEstudiante)






export default router;
import Router from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";

const router = Router();

//ruta para obtener todos los usuarios
router.get('/usuarios',UsuarioController.getAllUsers)
//ruta para obtener un usuario
router.get('/usuario/id',UsuarioController.findUserById)

//ruta que lleva a la pagina de login
router.get('/login',UsuarioController.login)
//ruta que lleva a pagina de registro
router.get('/singUp',UsuarioController.singUp)



router.get('/bienvenido',UsuarioController.bienvenido);
router.get('/expedienteTutor', UsuarioController.expedienteTutor)
router.get('/expedienteEstudiante', UsuarioController.expedienteEstudiante)






export default router;
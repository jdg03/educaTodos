import Router from "express";
import { UsuarioController } from "../controllers/usuarios.controller.js";

const router = Router();

//ruta para obtener todos los usuarios
router.get('/usuarios',UsuarioController.getAllUsers)
//ruta para obtener un usuario
router.get('/usuario/id',UsuarioController.findUserById)

router.get('/usuarioUserName',UsuarioController.getUserName)


export default router;
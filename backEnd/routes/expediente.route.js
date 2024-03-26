import Router from "express";
import { registroController } from "../controllers/expediente.controller.js";
import {verifyToken} from "../middlewares/verify.js";

const router = Router();


//ruta que que registra un usuario
router.post('/registro',registroController.registro);
//ruta que verifica si se inicio sesion correctamente
router.post('/login',registroController.authLoginJwt);

//ruta que destruye el token y cierra la sesion
router.get('/logout', registroController.logoutJwt);


export default router;
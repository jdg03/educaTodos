import Router from "express";
import { registroController } from "../controllers/registro.controller.js";
import {verifyToken} from "../middlewares/verify.js";

const router = Router();


//ruta que que registra un usuario
router.post('/auth/singUp',registroController.authSignUp);
//ruta que verifica si se inicio sesion correctamente
router.post('/auth/login',registroController.authLoginJwt);

//ruta que destruye el token y cierra la sesion
router.get('/logout', registroController.logoutJwt);


export default router;
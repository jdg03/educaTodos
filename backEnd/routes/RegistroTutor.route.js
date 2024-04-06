import Router from "express";
import { expedienteController } from "../controllers/RegistroTutor.controller.js";
import {verifyToken} from "../middlewares/verify.js";

const router = Router();


//ruta que que registra un usuario
router.post('/registro',expedienteController.registro);
//ruta que verifica si se inicio sesion correctamente
router.post('/loginAuth',expedienteController.authLoginJwt);

//ruta que destruye el token y cierra la sesion
router.get('/logout', expedienteController.logoutJwt);


export default router;
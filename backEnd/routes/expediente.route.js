import Router from "express";
import { expedienteContreleller } from "../controllers/expediente.controller.js";
import {verifyToken} from "../middlewares/verify.js";

const router = Router();


//ruta que que registra un usuario
router.post('/registro',expedienteContreleller.registro);
//ruta que verifica si se inicio sesion correctamente
router.post('/login',expedienteContreleller.authLoginJwt);

//ruta que destruye el token y cierra la sesion
router.get('/logout', expedienteContreleller.logoutJwt);


export default router;
import Router from "express";
import { vistasController } from "../controllers/vistas.controller.js";
import { verifyToken } from "../middlewares/verify.js";

const router = Router();


//ruta que lleva a la pagina de login
router.get('/login',vistasController.login)
//ruta que lleva a pagina de registro
router.get('/singUp',vistasController.singUp)

//ruta que lleva a la pagina de bienvenido con  middleware
router.get('/bienvenido',verifyToken, vistasController.bienvenido);

//ruta que lleva a la pagina de crear expediente
router.get('/expedienteTutor', vistasController.expedienteTutor)
router.get('/expedienteEstudiante', vistasController.expedienteEstudiante)

//ruta que lle al formulario
router.get('/expediente', vistasController.expediente)








export default router;
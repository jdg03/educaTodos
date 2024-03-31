import Router from "express";
import { vistasController } from "../controllers/vistas.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/verify.js";

const router = Router();


//ruta que lleva a la pagina de login
router.get('/login',vistasController.login)
//ruta que lleva a pagina de registro
router.get('/singUp',vistasController.singUp)

//ruta que lle al formulario
router.get('/expediente', vistasController.expediente)

//ruta que lleva a la pagina de crear expediente
router.get('/expedienteTutor', vistasController.expedienteTutor)
router.get('/expedienteEstudiante', vistasController.expedienteEstudiante)

//ruta que muestra un mensaje que confirma la creacion del expediente
router.get('/expedienteCreado',vistasController.expedienteCreado);

//Rutas protegidas

//ruta que lleva a la pagina de bienvenido protegida con middleware
router.get('/bienvenido',verifyToken, vistasController.bienvenido);

router.get('/institutos',verifyToken, vistasController.institutos);
router.get('/matricula',verifyToken, vistasController.matricula);







export default router;
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


//ruta que muestra un mensaje que confirma la creacion del expediente
router.get('/expedienteCreado',vistasController.expedienteCreado);

router.get("/factura/:id", vistasController.facturas);

//____________________Rutas protegidas_______________________________

//ruta que lleva a la pagina de bienvenido protegida con middleware
router.get('/bienvenido',verifyToken, vistasController.bienvenido);

router.get('/expedienteEstudiante', verifyToken, vistasController.expedienteEstudiante)

router.get('/institutos',verifyToken, vistasController.institutos);

router.get('/matricula',verifyToken, vistasController.matricula);

router.get('/detelleExpedienteEstudiantil', verifyToken, vistasController.verExpedientesEstudiantiles);

router.get('/infoInstitutos', verifyToken, vistasController.infoInstitutos);

router.get('/solicitudes', verifyToken, vistasController.solicitudes);












export default router;
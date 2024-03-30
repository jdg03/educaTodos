import Router from "express";
import { vistasAdmiController } from "../controllers/vistasAdmi.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/verify.js";

const router = Router();

//ruta que lleva a la pagina de bienvenida para el administrador protegida con middleware
router.get('/bienvenidoAdmi', verifyToken, verifyAdmin, vistasAdmiController.bienvenidoAdmi);

router.get('/expedientesEstudiantiles', verifyToken, verifyAdmin, vistasAdmiController.expedientesEstudiantiles);

router.get('/detalleExpediente', verifyToken, verifyAdmin, vistasAdmiController.detalleExpedientes);

router.get('/solicitudes', verifyToken, verifyAdmin, vistasAdmiController.solicitudes);

router.get('/institucionesAdmi', verifyToken, verifyAdmin, vistasAdmiController.institucionesAdmi);

router.get('/usuarios',  verifyToken, verifyAdmin, vistasAdmiController.usuarios)

export default router;
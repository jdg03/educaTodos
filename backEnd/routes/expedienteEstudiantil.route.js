import Router from "express";
import {crearExpedienteEstudiantil, buscarExpedienteEstudiantilPorId, obtenerTodosExpedientes } from "../controllers/expedienteEstudiantil.controller.js";
import { verifyToken } from "../middlewares/verify.js";


const router = Router();

router.get('/expedientesEstudiantiles', obtenerTodosExpedientes);

// Ruta para buscar un género por su ID
router.get('/expedientesEstudiantiles/:id', buscarExpedienteEstudiantilPorId);

//ruta para crear un genero
router.post('/genero',crearExpedienteEstudiantil);

//______Rutas protegidas______________

router.post('/crearExpedienteEstudiantil',verifyToken, crearExpedienteEstudiantil);



export default router;
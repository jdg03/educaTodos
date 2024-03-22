import Router from "express";
import { getAllGeneros, findGeneroById, createGenero } from "../controllers/generos.controller.js";

const router = Router();

// Ruta para obtener todos los géneros
router.get('/generos', getAllGeneros);

// Ruta para buscar un género por su ID
router.get('/genero/:id', findGeneroById);

//ruta para crear un genero
router.post('/genero', createGenero)

export default router;
import Router from "express";
import {getAllRoles, createRol, findRolById } from "../controllers/roles.controller.js";

const router = Router();

// Ruta para obtener todos los géneros
router.get('/roles', getAllRoles);

// Ruta para buscar un género por su ID
router.get('/rol/:id', findRolById);

//ruta para crear un genero
router.post('/rol', createRol)

export default router;
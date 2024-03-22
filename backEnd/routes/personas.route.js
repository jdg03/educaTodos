import express from 'express';
import {getAllPersonas, getPersonaById, createPersona, updatePersona, deletePersona} from '../controllers/personas.controller.js';

const router = express.Router();

// Ruta para obtener todas las personas
router.get('/personas', getAllPersonas);

// Ruta para obtener una persona por su ID
router.get('/personas/:id', getPersonaById);

// Ruta para crear una nueva persona
router.post('/personas', createPersona);

// Ruta para actualizar una persona existente
router.put('/personas/:id', updatePersona);

// Ruta para eliminar una persona
router.delete('/personas/:id', deletePersona);

export default router;

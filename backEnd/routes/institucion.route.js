import express from "express";
import { deleteById, findById, findSeccionByInstitutoId, getAll } from "../controllers/instituciones.controller.js"

const router = express.Router()

router.get('/institucion', getAll);

router.get('/institucion/:id', findById);

router.delete("/institucion/delete/:id", deleteById);

router.get("/secciones/institucion/:id", findSeccionByInstitutoId);

export default router;
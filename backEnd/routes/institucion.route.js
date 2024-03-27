import express from "express";
import { findById, getAll } from "../controllers/instituciones.controller.js"

const router = express.Router()

router.get('/institucion', getAll);

router.get('/institucion/:id', findById)

export default router;
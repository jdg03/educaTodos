import express from "express";
import { createMatricula } from "../controllers/crearMatricula.controller.js";

const router = express.Router()

router.post("/matricula/crear", createMatricula)

export default router
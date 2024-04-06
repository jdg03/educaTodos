import express from "express";
import { getMunicipios } from "../controllers/direcciones.controller.js";

const router = express.Router();

router.get("/direcciones/municipios", getMunicipios)

export default router;
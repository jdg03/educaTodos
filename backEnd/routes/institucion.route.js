import express from "express";
import { getAllInstitutos } from "../controllers/instituciones.controller.js"

const router = express.Router()

router.get('/institutos', getAllInstitutos);

export default router;
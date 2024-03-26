import Instituto from "../models/institucion.model.js";

export const getAllInstitutos = async (req, res) => {
    try {
        const institutos = await Instituto.getAllInstitutos();
        res.status(200).json(institutos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
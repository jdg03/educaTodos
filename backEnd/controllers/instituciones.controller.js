import Instituto from "../models/institucion.model.js";
import Grado_Seccion from  "../models/grado_seccion.model.js";

export const getAll = async (req, res) => {
    try {
        const institutos = await Instituto.getAll();
        res.status(200).json(institutos);
        return institutos
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export const findById = async (req, res) => {

    const { id } = req.params;
    try {
        const institucion = await Instituto.findById(id);

        if (!institucion) {
            return res.status(404).json({ message: "Institucion no encontrada" });
        }

        res.status(200).json(institucion);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export const deleteById = async (req, res) => {

    const { id } = req.params;
    try {
        await Instituto.deleteById(id)

        res.status(204)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Metodo que regresa las secciones del instituto en base a la ID del instituto
export const findSeccionByInstitutoId = async (req, res) => {
    const { id } = req.params;
    try {
        const secciones = await Grado_Seccion.getGradosByInstitute(id);
        res.status(200).json(secciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}



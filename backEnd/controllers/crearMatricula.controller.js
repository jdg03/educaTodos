import Matricula from "../models/matricula.model.js";

export const createMatricula = async (req, res) => {
    const datos_matricula = req.body;

    try {
        const matricula = await Matricula.createMatricula(datos_matricula)
        res.status(201).json({ success: true, message: "matricula cread exitosamente", matricula: matricula });
        console.log("se creo la matricula:" + matricula.id_matricula)
    } catch (error) {
        console.error("error al crear la amtricula. error:", error)
        res.status(500).json({ success: false, message: "Error en el servidor al crear el expediente estudiantil" });
    }

};

export const matriculaController = {
    createMatricula
}
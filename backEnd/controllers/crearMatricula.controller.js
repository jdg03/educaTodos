import Matricula from "../models/matricula.model.js";

export const createMatricula = async (req, res) => {
    const datos_matricula = req.body;
    const id_usuario = user.id_usuario

    try {
        const matricula = await Matricula.createMatricula(datos_matricula, id_usuario)
        res.status(201).json({ success: true, message: "matricula creada exitosamente", matricula: matricula });
        console.log("se creo la matricula:" + matricula.id_matricula)
    } catch (error) {
        console.error("error al crear la amtricula. error:", error)
        res.status(500).json({ success: false, message: "Error en el servidor al crear el expediente estudiantil" });
    }

};

export const matriculaController = {
    createMatricula
}
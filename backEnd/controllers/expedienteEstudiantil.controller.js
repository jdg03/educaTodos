import ExpedienteEstudiantil from "../models/expedienteEstudiantil.model.js";

export const crearExpedienteEstudiantil = async (req, res) => {
    const { idEstudiante, idRol, idInstitucionActual } = req.body;

    try {
        const expedienteCreado = await ExpedienteEstudiantil.createExpedienteEstudiantil(idEstudiante, idRol, idInstitucionActual);
        res.status(201).json({ success: true, message: "Expediente estudiantil creado exitosamente", expediente: expedienteCreado });
    } catch (error) {
        console.error("Error al crear el expediente estudiantil:", error);
        res.status(500).json({ success: false, message: "Error en el servidor al crear el expediente estudiantil" });
    }
};


export const buscarExpedienteEstudiantilPorId = async (req, res) => {
    const idExpediente = req.params.id;

    try {
        const expedienteEncontrado = await ExpedienteEstudiantil.findExpedienteEstudiantilById(idExpediente);
        if (!expedienteEncontrado) {
            return res.status(404).json({ success: false, message: "Expediente estudiantil no encontrado" });
        }
        res.status(200).json({ success: true, expediente: expedienteEncontrado });
    } catch (error) {
        console.error("Error al buscar el expediente estudiantil por ID:", error);
        res.status(500).json({ success: false, message: "Error en el servidor al buscar el expediente estudiantil" });
    }

};

export const obtenerTodosExpedientes = async (req, res) => {
    try {
        const expedientes = await ExpedienteEstudiantil.getAllExpedientesEstudiantiles();
        res.status(200).json(expedientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

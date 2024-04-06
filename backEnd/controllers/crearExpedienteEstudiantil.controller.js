import Persona from "../models/personas.model.js";
import ExpedienteEstudiantil from "../models/expedienteEstudiantil.model.js";
import Tutor from "../models/tutor.model.js";



export const crearExpedienteEstudiantil = async (req,res) => {

    const datos = req.body;

    const personaEstudiante = {
        primer_nombre: datos.primer_nombre_estudiante,
        segundo_nombre: datos.segundo_nombre_estudiante,
        primer_apellido: datos.primer_apellido_estudiante,
        segundo_apellido: datos.segundo_apellido_estudiante,
        dni: datos.dni_estudiante,
        fecha_nacimiento: datos.fecha_nacimiento_estudiante,
        genero_id: datos.genero_id_estudiante
      };

}

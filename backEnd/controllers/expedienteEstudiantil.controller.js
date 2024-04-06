import ExpedienteEstudiantil from "../models/expedienteEstudiantil.model.js";
import Persona from "../models/personas.model.js";

export const crearExpedienteEstudiantil = async (req,res) => {

    const usuario =req.user;
    console.log("el usuario tutor es:"+usuario.id);

    const datos = req.body;
    const instituto = req.body.instituto;
    console.log("el id del instituto es:"+instituto);


    const personaEstudiante = {
        primer_nombre: datos.primer_nombre_estudiante,
        segundo_nombre: datos.segundo_nombre_estudiante,
        primer_apellido: datos.primer_apellido_estudiante,
        segundo_apellido: datos.segundo_apellido_estudiante,
        dni: datos.dni_estudiante,
        fecha_nacimiento: datos.fecha_nacimiento_estudiante,
        genero_id: datos.genero_id_estudiante
      };

     

      const personaEstudianteCreada = await Persona.createPersona(personaEstudiante);

      //logica para guardar los archivos y que pertenezcan a tutor.id y estudiante.id

    //crea el expediente con los datos de tutor.id estudiante.id_usuario y institucion = 1
    const expedienteEstudiantil ={
      id_estudiante:personaEstudianteCreada.id_persona,
      id_tutor:usuario.id,
      id_institucion_actual:instituto
    }

    const expedienteCreado = await ExpedienteEstudiantil.createExpedienteEstudiantil(expedienteEstudiantil);
    console.log("se creo el expediente:"+expedienteCreado.id_expediente);  

    return res.redirect("/bienvenido");

}



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

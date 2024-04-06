import Persona from "../models/personas.model.js";
import ExpedienteEstudiantil from "../models/expedienteEstudiantil.model.js";
import Tutor from "../models/tutor.model.js";




export const crearExpedienteEstudiantil = async (req,res) => {

    const tutor =req.user;

    const datos = req.body;
    const instituto = req.instituto;


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
      id_tutor:tutor.id_tutor,
      id_institucion_actual:instituto
    }

    const expedienteCreado = await ExpedienteEstudiantil.createExpedienteEstudiantil(expedienteEstudiantil);
    console.log("se creo el expediente:"+expedienteCreado.id_expediente);  

    return res.redirect("/bienvenido");

}

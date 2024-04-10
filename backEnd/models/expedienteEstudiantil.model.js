import pool from "../conection/db.js";

class ExpedienteEstudiantil {
    async createExpedienteEstudiantil(expedienteEstudiantil) {
        try {
            const result = await pool
                .request()
                .input("id_estudiante", expedienteEstudiantil.id_estudiante)
                .input("id_tutor", expedienteEstudiantil.id_tutor) // Nuevo campo id_tutor
                .input("id_institucion_actual", expedienteEstudiantil.id_institucion_actual)
                .query(
                    "INSERT INTO expedientes_estudiantiles (id_estudiante, id_tutor, id_institucion_actual) OUTPUT INSERTED.* VALUES (@id_estudiante, @id_tutor, @id_institucion_actual)"
                );
            return result.recordset[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findExpedienteEstudiantilById(idExpediente) {
        try {
            const result = await pool
                .request()
                .input("idExpediente", idExpediente)
                .query(
                    "SELECT * FROM expedientes_estudiantiles WHERE id_expediente = @idExpediente"
                );
            return result.recordset[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllExpedientesEstudiantiles() {
        try {
            const result = await pool
                .request()
                .query("SELECT * FROM expedientes_estudiantiles");
            return result.recordset;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllExpedientesInfo() {
        try {
            const result = await pool.request().query(`
                SELECT 
                    ee.id_expediente,
                    estudiante.primer_nombre AS nombre_estudiante,
                    estudiante.primer_apellido AS apellido_estudiante,
                    tutor.primer_nombre AS nombre_tutor,
                    tutor.primer_apellido AS apellido_tutor,
                    ee.id_institucion_actual
                FROM 
                    expedientes_estudiantiles ee
                    INNER JOIN personas estudiante ON ee.id_estudiante = estudiante.id_persona
                    INNER JOIN personas tutor ON ee.id_tutor = tutor.id_persona
            `);
            return result.recordset;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    

    async findExpedienteByEstudianteID(id){
        try{
            const result = await pool
            .request()
            .input("id_estudiante", id)
            .query("SELECT * FROM expedientes_estudiantiles WHERE id_estudiante = @id_estudiante")
            return result.recordset[0];
        }catch (error) {
            console.log(error);
            throw error;
        }


    }
    async findExpedientesByTutorID(idTutor) {
        try {
            const result = await pool
                .request()
                .input("idTutor", idTutor)
                .query(
                    "SELECT * FROM expedientes_estudiantiles WHERE id_tutor = @idTutor"
                );
            return result.recordset[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findDetalleExpedienteByTutorID(idTutor) {
        try {
            const result = await pool
                .request()
                .input("idTutor", idTutor)
                .query(`
                    SELECT p.*, ee.*, i.nombre AS nombre_instituto
                    FROM personas p
                    JOIN expedientes_estudiantiles ee ON p.id_persona = ee.id_estudiante
                    JOIN tutores t ON ee.id_tutor = t.id_tutor
                    JOIN instituciones i ON ee.id_institucion_actual = i.id_institucion
                    WHERE t.id_tutor = @idTutor
                `);
            
            return result.recordset;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    

}

export default new ExpedienteEstudiantil();

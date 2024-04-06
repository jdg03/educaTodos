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
}

export default new ExpedienteEstudiantil();

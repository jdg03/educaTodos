import pool from "../conection/db.js";

class ExpedienteEstudiantil {
    async createExpedienteEstudiantil(idEstudiante, idRol, idInstitucionActual) {
        try {
            const result = await pool
                .request()
                .input("idEstudiante", idEstudiante)
                .input("idRol", idRol)
                .input("idInstitucionActual", idInstitucionActual)
                .query(
                    "INSERT INTO expedientes_estudiantiles (id_estudiante, id_rol, id_institucion_actual) OUTPUT INSERTED.* VALUES (@idEstudiante, @idRol, @idInstitucionActual)"
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
}

export default new ExpedienteEstudiantil();

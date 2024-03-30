import pool from "../conection/db.js";

class Matricula {
    async createMatricula(matricula) {
        try {
            const result = await pool
                .request()
                .input("id_estudiante", matricula.id_usuario)
                .input("id_rol", 1)
                .input("id_grado_seccion", matricula.grado_seccion)
                .input("id_institucion", matricula.institucion)
                .input("id_grado", matricula.grado)
                .input("id_jornada", matricula.jornada)
                .input("id_seccion", matricula.seccion)
                .input("fecha_matricula", matricula.fecha)
                .query(
                    "INSERT INTO matriculas (id_estudiante, id_rol, id_grado_seccion, id_institucion, id_grado, id_jornada, id_seccion, fecha_matricula) OUTPUT INSERTED.* VALUES (@id_estudiante, @id_rol, @id_grado_seccion, @id_institucion, @id_grado, @id_jornada, @id_seccion, @fecha_matricula)"
                );
            return result.recordset[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new Matricula()
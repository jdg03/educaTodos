import pool from "../conection/db.js";

class Grado_Seccion {
    async getGradosByInstitute(id) {
        try {
            const result = await pool
                .request()
                .input("id_instituto", id)
                .query("SELECT f.id_grado_seccion id, i.nombre, g.nombre_grados grado, s.nombre_seccion seccion from grados_secciones_instituciones f INNER JOIN instituciones i on f.id_institucion = i.id_institucion INNER JOIN grados g on f.id_grado = g.id_grado INNER JOIN secciones s on f.id_seccion = s.id_seccion WHERE f.id_institucion = @id_instituto")
            return result.recordset;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new Grado_Seccion()
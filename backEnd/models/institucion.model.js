import pool from "../conection/db.js";

class Instituto {
    async getAllInstitutos() {
        try {
            const result = await pool.request().query("SELECT i.nombre, te.nombre_tipo educacion, d.direccion FROM instituciones i INNER JOIN tipos_de_educacion te ON i.id_institucion = te.id_tipo_educacion INNER JOIN direcciones d ON i.id_institucion = d.id_direccion");
            return result.recordset;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new Instituto()
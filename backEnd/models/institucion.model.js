import pool from "../conection/db.js";

class Instituto {
    async getAll() {
        try {
            const result = await pool.request().query("SELECT i.id_institucion, i.nombre, te.nombre_tipo educacion, d.direccion FROM instituciones i INNER JOIN tipos_de_educacion te ON i.id_tipo_educacion = te.id_tipo_educacion INNER JOIN direcciones d ON i.id_direccion = d.id_direccion");
            return result.recordset;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const result = await pool
                .request()
                .input("id", id)
                .query("SELECT i.id_institucion, i.nombre, te.nombre_tipo educacion, d.direccion FROM instituciones i INNER JOIN tipos_de_educacion te ON i.id_tipo_educacion = te.id_tipo_educacion INNER JOIN direcciones d ON i.id_direccion = d.id_direccion WHERE i.id_institucion = @id");
            return result.recordset[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteById(id){
        try {
            const result = await pool
                .request()
                .input("id",id)
                .query("DELETE FROM instituciones WHERE id_institucion = @id")
            return result.recordset[0];    
        } catch (error){
            console.log(error);
            throw error;
        }
    }
}

export default new Instituto()
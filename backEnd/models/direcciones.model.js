import pool from "../conection/db.js";

class Direccion{
    async getDepartamentos() {
        try{
            const result = await pool
            .request()
            .query("SELECT * FROM departamentos")
            return result.recordset
        } catch (error){
            console.log(error);
            throw error;
        }
    };

    async getMunicipios() {
        try{
            const result = await pool
            .request()
            .query("SELECT * FROM municipios")
            return result.recordset
        }catch (error){
            console.log(error);
            throw error;
        }
    }
}

export default new Direccion()
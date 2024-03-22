import pool from "../conection/db.js";

class Rol {
  async getAllRoles() {
    try {
      const result = await pool.request().query("SELECT * FROM roles");
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
        .query("SELECT * FROM roles WHERE id_rol = @id");
      return result.recordset[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createRol(rol) {
    try {
      const result = await pool
        .request()
        .input("rol", rol)
        .query("INSERT INTO roles (rol) VALUES (@rol)");
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}



export default new Rol();

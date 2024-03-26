import pool from "../conection/db.js";

class Genero {
  async getAllGeneros() {
    try {
      const result = await pool.request().query("SELECT * FROM generos");
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
        .query("SELECT * FROM generos WHERE id_genero = @id");
      return result.recordset[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createGenero(genero) {
    try {
      const result = await pool
        .request()
        .input("nombre", genero)
        .query("INSERT INTO generos (genero) OUTPUT INSERTED.* VALUES (@nombre)");
      return result.recordset[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

export default new Genero();

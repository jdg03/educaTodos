import pool from "../conection/db.js";
import bcrypt from "bcryptjs";

class Usuario {

    async findById(id) {
        try {
          const result = await pool
            .request()
            .input("id", id)
            .query("SELECT * FROM usuarios WHERE id_usuario = @id");
          return result.recordset[0];
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    
  async findByEmail(email) {
    try {
      const result = await pool
        .request()
        .input("correo", email)
        .query("SELECT * FROM usuarios WHERE correo_electronico = @correo");
      return result.recordset[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const result = await pool.request().query("SELECT * FROM usuarios");
      return result.recordset;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createUser(correo, contraseña, id_rol) {
    try {
      const result = await pool
        .request()
        .input("correo", correo)
        .input("clave", contraseña)
        .input("id_rol", id_rol)
        .query(
          "INSERT INTO usuarios (correo_electronico, clave, id_rol) VALUES (@correo, @clave, @id_rol)"
        );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async comparePassword(password, hashedPassword) {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new Usuario();

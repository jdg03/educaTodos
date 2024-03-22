import pool from "../conection/db.js";

class Persona {
  async getAllPersonas() {
    try {
      const result = await pool.request().query("SELECT * FROM personas");
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
        .query("SELECT * FROM personas WHERE id_persona = @id");
      return result.recordset[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createPersona(persona) {
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, fecha_nacimiento, genero_id } = persona;
    try {
      const result = await pool
        .request()
        .input("primer_nombre", primer_nombre)
        .input("segundo_nombre", segundo_nombre)
        .input("primer_apellido", primer_apellido)
        .input("segundo_apellido", segundo_apellido)
        .input("dni", dni)
        .input("fecha_nacimiento", fecha_nacimiento)
        .input("genero_id", genero_id)
        .query(
          "INSERT INTO personas (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, fecha_nacimiento, genero_id) VALUES (@primer_nombre, @segundo_nombre, @primer_apellido, @segundo_apellido, @dni, @fecha_nacimiento, @genero_id)"
        );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updatePersona(id, persona) {
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, fecha_nacimiento, genero_id } = persona;
    try {
      const result = await pool
        .request()
        .input("id", id)
        .input("primer_nombre", primer_nombre)
        .input("segundo_nombre", segundo_nombre)
        .input("primer_apellido", primer_apellido)
        .input("segundo_apellido", segundo_apellido)
        .input("dni", dni)
        .input("fecha_nacimiento", fecha_nacimiento)
        .input("genero_id", genero_id)
        .query(
          "UPDATE personas SET primer_nombre = @primer_nombre, segundo_nombre = @segundo_nombre, primer_apellido = @primer_apellido, segundo_apellido = @segundo_apellido, dni = @dni, fecha_nacimiento = @fecha_nacimiento, genero_id = @genero_id WHERE id_persona = @id"
        );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deletePersona(id) {
    try {
      const result = await pool
        .request()
        .input("id", id)
        .query("DELETE FROM personas WHERE id_persona = @id");
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new Persona();

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

    async findByUserName(nombreUsuario) {
        try {
            const result = await pool
                .request()
                .input("nombre_usuario", nombreUsuario)
                .query("SELECT * FROM usuarios WHERE nombre_usuario = @nombre_usuario");
            return result.recordset[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findByDni(dni) {
      try {
          const result = await pool
              .request()
              .input("dni", dni)
              .query("SELECT * FROM usuarios WHERE dni = @dni");
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

    async createUser(estudiante, clave, usuario) {
        try {
            const result = await pool
                .request()
                .input("primer_nombre", estudiante.primer_nombre)
                .input("segundo_nombre", estudiante.segundo_nombre)
                .input("primer_apellido", estudiante.primer_apellido)
                .input("segundo_apellido", estudiante.segundo_apellido)
                .input("dni", estudiante.dni)
                .input("fecha_nacimiento", estudiante.fecha_nacimiento)
                .input("genero_id", estudiante.genero_id)
                .input("usuaurio",usuario )
                .input("clave", clave)
                .input("id_rol", 1)
                .query(
                    "INSERT INTO usuarios (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, fecha_nacimiento, genero_id, usuaurio, clave, id_rol) OUTPUT INSERTED.* VALUES (@primer_nombre, @segundo_nombre, @primer_apellido, @segundo_apellido, @dni, @fecha_nacimiento, @genero_id, @usuaurio, @clave, @id_rol)"
                );
            return result.recordset[0];
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

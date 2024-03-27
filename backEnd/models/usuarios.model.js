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

    async createUser(usuario) {
        try {
            const result = await pool
                .request()
                .input("primer_nombre", usuario.primer_nombre)
                .input("segundo_nombre", usuario.segundo_nombre)
                .input("primer_apellido", usuario.primer_apellido)
                .input("segundo_apellido", usuario.segundo_apellido)
                .input("dni", usuario.dni)
                .input("fecha_nacimiento", usuario.fecha_nacimiento)
                .input("genero_id", usuario.genero_id)
                .input("correo_electronico", usuario.correo_electronico)
                .input("clave", usuario.clave)
                .input("id_rol", usuario.id_rol)
                .query(
                    "INSERT INTO usuarios (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, fecha_nacimiento, genero_id, correo_electronico, clave, id_rol) OUTPUT INSERTED.* VALUES (@primer_nombre, @segundo_nombre, @primer_apellido, @segundo_apellido, @dni, @fecha_nacimiento, @genero_id, @correo_electronico, @clave, @id_rol)"
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

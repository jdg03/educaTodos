import pool from "../conection/db.js";

class Tutor {
    async findById(id) {
        try {
            const result = await pool
                .request()
                .input("id", id)
                .query("SELECT * FROM tutores WHERE id_tutor = @id");
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
                .query("SELECT * FROM tutores WHERE dni = @dni");
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
                .input("email", email)
                .query("SELECT * FROM tutores WHERE correo_electronico = @email");
            return result.recordset[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    async getAllTutors() {
        try {
            const result = await pool.request().query("SELECT * FROM tutores");
            return result.recordset;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**async createTutor(tutor) {
        try {
            const result = await pool
                .request()
                .input("primer_nombre", tutor.primer_nombre)
                .input("segundo_nombre", tutor.segundo_nombre)
                .input("primer_apellido", tutor.primer_apellido)
                .input("segundo_apellido", tutor.segundo_apellido)
                .input("dni", tutor.dni)
                .input("fecha_nacimiento", tutor.fecha_nacimiento)
                .input("genero_id", tutor.genero_id)
                .input("ocupacion", tutor.ocupacion)
                .input("correo_electronico", tutor.correo_electronico)
                .input("telefono", tutor.telefono)
                .query(
                    "INSERT INTO tutores (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, fecha_nacimiento, genero_id, ocupacion, correo_electronico, telefono) OUTPUT INSERTED.* VALUES (@primer_nombre, @segundo_nombre, @primer_apellido, @segundo_apellido, @dni, @fecha_nacimiento, @genero_id, @ocupacion, @correo_electronico, @telefono)"
                );
            return result.recordset[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }*/

    async createTutor(tutor) {
        try {
            const result = await pool
                .request()
                .input("id_tutor", tutor.id_tutor)
                .input("ocupacion", tutor.ocupacion)
                .input("correo_electronico", tutor.correo_electronico)
                .input("telefono", tutor.telefono)
                .query("INSERT INTO tutores (id_tutor, ocupacion, correo_electronico, telefono) OUTPUT INSERTED.* VALUES (@id_tutor, @ocupacion, @correo_electronico, @telefono)");
            return result.recordset[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
}

export default new Tutor();

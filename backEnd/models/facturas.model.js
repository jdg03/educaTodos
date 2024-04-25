import pool from "../conection/db.js";

class Factura {
    async getAllfacturas() {
        try {
            const result = await pool.request().query("SELECT f.id_factura, f.codidgo, rs.nombre, f.rtn_razon_social, f.correo_razon_social, f.CAI, t.primer_nombre,t.primer_apellido, f.rtn_cliente, f.fecha_emision, f.fecha_pago, f.pagada, f.descuentos, f.subtotal, f.isv, f.total FROM facturas f INNER JOIN razones_sociales rs on f.id_razon_social = rs.id_razon_social  INNER JOIN personas t on f.id_cliente = t.id_persona");
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
                .query("SELECT f.id_factura, f.codidgo, rs.nombre, f.rtn_razon_social, f.correo_razon_social, f.CAI, t.primer_nombre, t.primer_apellido, f.rtn_cliente, f.fecha_emision, f.fecha_pago, f.pagada, f.descuentos, f.subtotal, f.isv, f.total FROM facturas f INNER JOIN razones_sociales rs on f.id_razon_social = rs.id_razon_social INNER JOIN personas t on f.id_cliente = t.id_persona WHERE id_factura = @id");
            return result.recordset[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


async insertFactura(facturaData) {
        try {
            const query = `
                INSERT INTO facturas (codidgo, id_razon_social, rtn_razon_social, correo_razon_social, CAI, id_cliente, rtn_cliente, fecha_emision, fecha_pago, pagada, descuentos, subtotal, isv, total)
                VALUES (@codigo, @id_razon_social, @rtn_razon_social, @correo_razon_social, @CAI, @id_cliente, @rtn_cliente, @fecha_emision, @fecha_pago, @pagada, @descuentos, @subtotal, @isv, @total)
            `;

            const result = await pool
                .request()
                .input("codigo", facturaData.codigo)
                .input("id_razon_social", facturaData.id_razon_social)
                .input("rtn_razon_social", facturaData.rtn_razon_social)
                .input("correo_razon_social", facturaData.correo_razon_social)
                .input("CAI", facturaData.CAI)
                .input("id_cliente", facturaData.id_cliente)
                .input("rtn_cliente", facturaData.rtn_cliente)
                .input("fecha_emision", facturaData.fecha_emision)
                .input("fecha_pago", facturaData.fecha_pago)
                .input("pagada", facturaData.pagada)
                .input("descuentos", facturaData.descuentos)
                .input("subtotal", facturaData.subtotal)
                .input("isv", facturaData.isv)
                .input("total", facturaData.total)
                .query(query);

            return result;
        } catch (error) {
            console.error("Error factura:", error);
            throw error;
        }
    }
}

export default new Factura();
import pool from "../conection/db.js";

class Producto {
    async getAllProductos() {
        try {
            const result = await pool
                .request()
                .query("SELECT * FROM productos");
            return result.recordset;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    }

    async findProductoById(id) {
        try {
            const result = await pool
                .request()
                .input("id", id)
                .query("SELECT * FROM productos WHERE id_producto = @id");
            return result.recordset[0];
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    }

    async insertProducto(productoData) {
        try {
            const query = `
                INSERT INTO productos (codigo, nombre, id_grado, precio)
                VALUES (@codigo, @nombre, @id_grado, @precio)
            `;

            const result = await pool
                .request()
                .input("codigo", productoData.codigo)
                .input("nombre", productoData.nombre)
                .input("id_grado", productoData.id_grado)
                .input("precio", productoData.precio)
                .query(query);

            return result;
        } catch (error) {
            console.error("Error producto:", error);
            throw error;
        }
    }

    async addProductoToFactura(facturaId, productoId, precioProducto, cantidad, descuento) {
        try {
            const query = `
                INSERT INTO facturas_productos (id_factura, id_producto, precio_producto, cantidad, descuento, total)
                VALUES (@facturaId, @productoId, @precioProducto, @cantidad, @descuento, @total)
            `;

            const total = (precioProducto * cantidad) - descuento;

            const result = await pool
                .request()
                .input("facturaId", facturaId)
                .input("productoId", productoId)
                .input("precioProducto", precioProducto)
                .input("cantidad", cantidad)
                .input("descuento", descuento)
                .input("total", total)
                .query(query);

            return result;
        } catch (error) {
            console.error("Error agregando el producto a la factura factura:", error);
            throw error;
        }
    }

    async getProductosByFacturaId(facturaId) {
        try {
            const query = `
                SELECT p.codigo, p.nombre, fp.precio_producto precio, fp.cantidad, fp.total
                FROM productos p
                INNER JOIN facturas_productos fp ON p.id_producto = fp.id_producto
                WHERE fp.id_factura = @facturaId
            `;

            const result = await pool
                .request()
                .input("facturaId", facturaId)
                .query(query);

            return result.recordset;
        } catch (error) {
            console.error("Error obteniendo los productos de la factura:", error);
            throw error;
        }
    }

}

export default new Producto();

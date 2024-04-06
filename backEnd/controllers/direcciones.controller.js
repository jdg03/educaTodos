import Direccion from "../models/direcciones.model.js"

export const getMunicipios = async(req, res) => {
    try{
        const municipios = await Direccion.getMunicipios();
        res.status(200).json(municipios);
    } catch (error){
        console.log(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
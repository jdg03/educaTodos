import Rol from "../models/roles.model.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const findRolById = async (req, res) => {
  const { id } = req.params;
  try {
    const rol = await Rol.findById(id);
    if (!rol) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.status(200).json(rol);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const createRol = async (req, res) => {
    const { rol } = req.body;
  
    try {
      
      // Crear el nuevo rol utilizando el modelo
      await Rol.createRol(rol);
      // Retornar una respuesta exitosa
      res.status(201).json({ message: "Rol creado exitosamente"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };

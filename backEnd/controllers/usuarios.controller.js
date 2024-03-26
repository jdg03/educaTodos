import Usuario from "../models/usuarios.model.js"

export const findUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Usuario.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  // Controlador para obtener todos los usuarios
  export const getAllUsers = async (req, res) => {
    try {
      const users = await Usuario.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };

  
export const UsuarioController = {
    getAllUsers,
    findUserById

  };
  
import Genero from "../models/generos.model.js";

export const getAllGeneros = async (req, res) => {
  try {
    const generos = await Genero.getAllGeneros();
    res.status(200).json(generos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const findGeneroById = async (req, res) => {
  const { id } = req.params;
  try {
    const genero = await Genero.findById(id);
    if (!genero) {
      return res.status(404).json({ message: "Género no encontrado" });
    }
    res.status(200).json(genero);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }

};

export const createGenero = async (req, res) => {
  const { nombre } = req.body;
  try {
    await Genero.createGenero(nombre);
    res.status(201).json({ message: "Género creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

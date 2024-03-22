import Persona from "../models/personas.model.js";

// Obtener todas las personas
export const getAllPersonas = async (req, res) => {
  try {
    const personas = await Persona.getAllPersonas();
    res.status(200).json(personas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener una persona por su ID
export const getPersonaById = async (req, res) => {
  const { id } = req.params;
  try {
    const persona = await Persona.findById(id);

    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    res.status(200).json(persona);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Crear una nueva persona
export const createPersona = async (req, res) => {
  const personaData = req.body;
  try {
    const result = await Persona.createPersona(personaData);
    res.status(201).json({ message: "Persona creada exitosamente", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Actualizar una persona existente
export const updatePersona = async (req, res) => {
  const { id } = req.params;
  const personaData = req.body;
  try {
    const result = await Persona.updatePersona(id, personaData);
    res.status(200).json({ message: "Persona actualizada exitosamente", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Eliminar una persona
export const deletePersona = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Persona.deletePersona(id);
    res.status(200).json({ message: "Persona eliminada exitosamente", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

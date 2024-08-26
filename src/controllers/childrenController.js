const bcryptjs = require("bcryptjs");
const Children = require("../models/children");
const User = require("../models/user");
const mongoose = require("mongoose");

const ChildrenController = {
  // Crear un nuevo niño
  createChildren: async (req, res) => {
    try {
      const {
        fullName,
        birthDate,
        gender,
        email,
        password,
        medicalInfo,
        parentId,
        filesIds,
        active,
      } = req.body;

      // Validar que los campos obligatorios estén presentes
      if (
        !fullName ||
        !birthDate ||
        !parentId ||
        !email ||
        !password
      ) {
        return res.status(400).json({ message: "Faltan campos obligatorios." });
      }

     
    

      // Crear el nuevo niño
      const newChildren = new Children({
        fullName,
        birthDate,
        gender,
        medicalInfo,
        parentId,
        email,
        password, // Guardar la contraseña encriptada
        filesIds,
        active,
      });

      // Guardar el niño en la base de datos
      const savedChildren = await newChildren.save();
      const tutor = await User.findById(parentId);

      if (!tutor) {
        return res.status(404).json({ message: "Tutor no encontrado" });
      }

      // Verificar si se encontró el tutor y agregar el ID del niño
      tutor.childrenIds.push(savedChildren._id); // Agregar el ID del hijo al array
      await tutor.save(); // Guardar los cambios en la base de datos

      // Devolver la información del niño creado y del tutor actualizado
      res.status(201).json({ children: savedChildren });
    } catch (error) {
      console.error("Error al crear el niño:", error);
      res.status(500).json({ message: "Error al crear el niño" });
    }
  },

  // Obtener un niño por ID
  getChildrenById: async (req, res) => {
    try {
      const childrenId = req.params.id;
      const children = await Children.findById(childrenId)
        .populate("parentId")
        .populate("fileIds");

      if (!children) {
        return res.status(404).json({ message: "Niño no encontrado" });
      }

      res.status(200).json(children);
    } catch (error) {
      console.error("Error al obtener el niño:", error);
      res.status(500).json({ message: "Error al obtener el niño" });
    }
  },

  // Obtener todos los niños
  getAllChildren: async (req, res) => {
    try {
      const children = await Children.find()
        .populate("parentId")
        .populate("fileIds");
      res.status(200).json(children);
    } catch (error) {
      console.error("Error al obtener los niños:", error);
      res.status(500).json({ message: "Error al obtener los niños" });
    }
  },

  // Actualizar un niño por ID
  updateChildren: async (req, res) => {
    try {
      const childrenId = req.params.id;
      const updatedData = req.body;

      // Actualizar el niño
      const updatedChildren = await Children.findByIdAndUpdate(childrenId, updatedData, {
        new: true,
      });

      if (!updatedChildren) {
        return res.status(404).json({ message: "Niño no encontrado" });
      }

      res.status(200).json(updatedChildren);
    } catch (error) {
      console.error("Error al actualizar el niño:", error);
      res.status(500).json({ message: "Error al actualizar el niño" });
    }
  },

  // Eliminar un niño por ID
  deleteChildren: async (req, res) => {
    try {
      const childrenId = req.params.id;

      // Eliminar el niño
      const deletedChildren = await Children.findByIdAndDelete(childrenId);

      if (!deletedChildren) {
        return res.status(404).json({ message: "Niño no encontrado" });
      }

      res.status(200).json({ message: "Niño eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el niño:", error);
      res.status(500).json({ message: "Error al eliminar el niño" });
    }
  },
};

module.exports = ChildrenController;

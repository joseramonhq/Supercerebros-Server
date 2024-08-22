const bcryptjs = require("bcryptjs");
const Child = require("../models/child");
const User = require("../models/user");
const mongoose = require("mongoose");

const ChildController = {
  // Crear un nuevo niño
  createChild: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
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
        !firstName ||
        !lastName ||
        !birthDate ||
        !parentId ||
        !email ||
        !password
      ) {
        return res.status(400).json({ message: "Faltan campos obligatorios." });
      }

     
    

      // Crear el nuevo niño
      const newChild = new Child({
        firstName,
        lastName,
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
      const savedChild = await newChild.save();
      const tutor = await User.findById(parentId);

      if (!tutor) {
        return res.status(404).json({ message: "Tutor no encontrado" });
      }

      // Verificar si se encontró el tutor y agregar el ID del niño
      tutor.childrenIds.push(savedChild._id); // Agregar el ID del hijo al array
      await tutor.save(); // Guardar los cambios en la base de datos

      // Devolver la información del niño creado y del tutor actualizado
      res.status(201).json({ child: savedChild });
    } catch (error) {
      console.error("Error al crear el niño:", error);
      res.status(500).json({ message: "Error al crear el niño" });
    }
  },

  // Obtener un niño por ID
  getChildById: async (req, res) => {
    try {
      const childId = req.params.id;
      const child = await Child.findById(childId)
        .populate("parentId")
        .populate("fileIds");

      if (!child) {
        return res.status(404).json({ message: "Niño no encontrado" });
      }

      res.status(200).json(child);
    } catch (error) {
      console.error("Error al obtener el niño:", error);
      res.status(500).json({ message: "Error al obtener el niño" });
    }
  },

  // Obtener todos los niños
  getAllChildren: async (req, res) => {
    try {
      const children = await Child.find()
        .populate("parentId")
        .populate("fileIds");
      res.status(200).json(children);
    } catch (error) {
      console.error("Error al obtener los niños:", error);
      res.status(500).json({ message: "Error al obtener los niños" });
    }
  },

  // Actualizar un niño por ID
  updateChild: async (req, res) => {
    try {
      const childId = req.params.id;
      const updatedData = req.body;

      // Actualizar el niño
      const updatedChild = await Child.findByIdAndUpdate(childId, updatedData, {
        new: true,
      });

      if (!updatedChild) {
        return res.status(404).json({ message: "Niño no encontrado" });
      }

      res.status(200).json(updatedChild);
    } catch (error) {
      console.error("Error al actualizar el niño:", error);
      res.status(500).json({ message: "Error al actualizar el niño" });
    }
  },

  // Eliminar un niño por ID
  deleteChild: async (req, res) => {
    try {
      const childId = req.params.id;

      // Eliminar el niño
      const deletedChild = await Child.findByIdAndDelete(childId);

      if (!deletedChild) {
        return res.status(404).json({ message: "Niño no encontrado" });
      }

      res.status(200).json({ message: "Niño eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el niño:", error);
      res.status(500).json({ message: "Error al eliminar el niño" });
    }
  },
};

module.exports = ChildController;

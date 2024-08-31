const BreathingExerciseSession = require("../models/breathSession");

const breathSessionController = {
  // Crear una nueva sesión de respiración
  createBreathingSession: async (req, res) => {
    try {
      const {
        childId,
        inhaleDuration,
        holdBreathDuration,
        exhaleDuration,
        pauseDuration,
        totalDuration,
        completed,
      } = req.body;

      // Validar que los campos obligatorios estén presentes
      if (
        !childId ||
        inhaleDuration === undefined ||
        holdBreathDuration === undefined ||
        exhaleDuration === undefined ||
        pauseDuration === undefined ||
        totalDuration === undefined ||
        completed === undefined
      ) {
        return res.status(400).json({ message: "Faltan campos obligatorios." });
      }

      // Crear la nueva sesión de respiración
      const newSession = new BreathingExerciseSession({
        childId,
        inhaleDuration,
        holdBreathDuration,
        exhaleDuration,
        pauseDuration,
        totalDuration,
        completed,
      });

      // Guardar la sesión en la base de datos
      const savedSession = await newSession.save();

      // Devolver la información de la sesión creada
      res.status(201).json({ session: savedSession });
    } catch (error) {
      console.error("Error al crear la sesión de respiración:", error);
      res
        .status(500)
        .json({ message: "Error al crear la sesión de respiración" });
    }
  },

  // Obtener una sesión de respiración por ID
  getBreathingSessionById: async (req, res) => {
    try {
      const sessionId = req.params.id;
      const session = await BreathingExerciseSession.findById(
        sessionId
      ).populate("childId");

      if (!session) {
        return res
          .status(404)
          .json({ message: "Sesión de respiración no encontrada" });
      }

      res.status(200).json(session);
    } catch (error) {
      console.error("Error al obtener la sesión de respiración:", error);
      res
        .status(500)
        .json({ message: "Error al obtener la sesión de respiración" });
    }
  },

  // Obtener todas las sesiones de respiración
  getAllBreathingSessions: async (req, res) => {
    try {
      const sessions = await BreathingExerciseSession.find().populate(
        "childId"
      );
      res.status(200).json(sessions);
    } catch (error) {
      console.error("Error al obtener las sesiones de respiración:", error);
      res
        .status(500)
        .json({ message: "Error al obtener las sesiones de respiración" });
    }
  },

  // Actualizar una sesión de respiración por ID
  updateBreathingSession: async (req, res) => {
    try {
      const sessionId = req.params.id;
      const updatedData = req.body;

      // Actualizar la sesión de respiración
      const updatedSession = await BreathingExerciseSession.findByIdAndUpdate(
        sessionId,
        updatedData,
        {
          new: true,
        }
      );

      if (!updatedSession) {
        return res
          .status(404)
          .json({ message: "Sesión de respiración no encontrada" });
      }

      res.status(200).json(updatedSession);
    } catch (error) {
      console.error("Error al actualizar la sesión de respiración:", error);
      res
        .status(500)
        .json({ message: "Error al actualizar la sesión de respiración" });
    }
  },

  // Eliminar una sesión de respiración por ID
  deleteBreathingSession: async (req, res) => {
    try {
      const sessionId = req.params.id;

      // Eliminar la sesión de respiración
      const deletedSession = await BreathingExerciseSession.findByIdAndDelete(
        sessionId
      );

      if (!deletedSession) {
        return res
          .status(404)
          .json({ message: "Sesión de respiración no encontrada" });
      }

      res
        .status(200)
        .json({ message: "Sesión de respiración eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar la sesión de respiración:", error);
      res
        .status(500)
        .json({ message: "Error al eliminar la sesión de respiración" });
    }
  },
};

module.exports = breathSessionController;

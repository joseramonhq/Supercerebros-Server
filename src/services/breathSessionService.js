const BreathSession = require("../models/breathSession");

const registerBreathSession = async (breathSessionData) => {
  try {
    // Crear una nueva instancia del modelo BreathSession con los datos proporcionados
    const newBreathSession = new BreathSession(breathSessionData);

    // Guardar la sesión de respiración en la base de datos
    const savedBreathSession = await newBreathSession.save();

    // Devolver la sesión guardada como resultado
    return { success: true, session: savedBreathSession };
  } catch (error) {
    console.error("Error al registrar la sesión de respiración:", error);
    // Devolver un objeto de error en caso de fallo
    return {
      success: false,
      message: "Error al registrar la sesión de respiración",
      error: error.message,
    };
  }
};

module.exports = {
  registerBreathSession,
};

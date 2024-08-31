const mongoose = require("mongoose");

const breathSessionSchema = new mongoose.Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Children", // Asume que tienes un modelo 'Child' para referenciar
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    inhaleDuration: {
      type: Number, // Duración de inhalación en segundos
      required: true,
    },
    holdBreathDuration: {
      type: Number, // Duración de retención en segundos
      required: true,
    },
    exhaleDuration: {
      type: Number, // Duración de exhalación en segundos
      required: true,
    },
    pauseDuration: {
      type: Number, // Duración de la pausa en segundos
      required: true,
    },
    totalDuration: {
      type: Number, // Duración total del ejercicio en minutos
      required: true,
    },
    completed: {
      type: Boolean, // Indica si se completó el ejercicio
      required: true,
    },
  },
  {
    timestamps: true, // Esto añade los campos createdAt y updatedAt automáticamente
  }
);

module.exports = mongoose.model("BreathSession", breathSessionSchema);

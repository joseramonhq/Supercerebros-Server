// Importamos el módulo mongoose, que es una biblioteca ODM (Object Data Modeling) para MongoDB y Node.js.
const mongoose = require("mongoose");

// Definimos un nuevo esquema de Mongoose para la colección BreathSession.
// Este esquema especifica la estructura y los tipos de datos que se almacenarán en los documentos de la colección.
const breathSessionSchema = new mongoose.Schema(
  {
    // El campo 'childId' almacena el ID del niño asociado a esta sesión de respiración.
    // Este es un campo de tipo ObjectId, que referencia a otro documento en la colección 'Children'.
    // Es un campo requerido.
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Children", // Este campo referencia al modelo 'Children', que debería estar definido en otro lugar.
      required: true, // Se asegura que este campo sea obligatorio.
    },
    // El campo 'date' almacena la fecha y hora en que se creó la sesión.
    // Por defecto, se asigna la fecha y hora actuales (Date.now) cuando se crea un nuevo documento.
    // Es un campo requerido.
    date: {
      type: Date,
      default: Date.now, // Asigna la fecha y hora actuales por defecto.
      required: true, // Se asegura que este campo sea obligatorio.
    },
    // El campo 'inhaleDuration' almacena la duración de la inhalación en segundos.
    // Es un campo de tipo Number y es requerido.
    inhaleDuration: {
      type: Number, // Define que este campo debe ser un número.
      required: true, // Se asegura que este campo sea obligatorio.
    },
    // El campo 'holdBreathDuration' almacena la duración de la retención de la respiración en segundos.
    // Es un campo de tipo Number y es requerido.
    holdBreathDuration: {
      type: Number, // Define que este campo debe ser un número.
      required: true, // Se asegura que este campo sea obligatorio.
    },
    // El campo 'exhaleDuration' almacena la duración de la exhalación en segundos.
    // Es un campo de tipo Number y es requerido.
    exhaleDuration: {
      type: Number, // Define que este campo debe ser un número.
      required: true, // Se asegura que este campo sea obligatorio.
    },
    // El campo 'pauseDuration' almacena la duración de la pausa entre ciclos de respiración en segundos.
    // Es un campo de tipo Number y es requerido.
    pauseDuration: {
      type: Number, // Define que este campo debe ser un número.
      required: true, // Se asegura que este campo sea obligatorio.
    },
    // El campo 'totalDuration' almacena la duración total del ejercicio en minutos.
    // Es un campo de tipo Number y es requerido.
    totalDuration: {
      type: Number, // Define que este campo debe ser un número.
      required: true, // Se asegura que este campo sea obligatorio.
    },
    // El campo 'completed' indica si el ejercicio se completó o no.
    // Es un campo de tipo Boolean y es requerido.
    completed: {
      type: Boolean, // Define que este campo debe ser un valor booleano (true/false).
      required: true, // Se asegura que este campo sea obligatorio.
    },
  },
  {
    // Esta opción añade automáticamente los campos 'createdAt' y 'updatedAt' al esquema.
    // 'createdAt' se asigna cuando se crea el documento y 'updatedAt' se actualiza cada vez que el documento se modifica.
    timestamps: true, // Añade automáticamente los campos de marca de tiempo 'createdAt' y 'updatedAt'.
  }
);

// Exportamos el modelo 'BreathSession' basado en el esquema definido.
// Esto nos permite interactuar con la colección 'BreathSession' en la base de datos utilizando este modelo.
module.exports = mongoose.model("BreathSession", breathSessionSchema);

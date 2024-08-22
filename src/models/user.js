const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Mongoose gestiona automáticamente _id como ObjectId
    role: { type: String, default: "Tutor", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    birthDate: { type: Date, required: true },
    dni: { type: String },
    childrenIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }], // IDs de los hijos asociados a este usuario
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }, // Para manejo de borrado lógico
  },
  {
    timestamps: true, // Automáticamente maneja createdAt y updatedAt
  }
);

// Hook para cifrar la contraseña y normalizar el email
userSchema.pre("save", function (next) {
  const user = this;

  // Normalizar el email si ha sido modificado
  if (user.isModified("email")) {
    user.email = validator.normalizeEmail(user.email);
  }

  // Cifrar la contraseña si ha sido modificada
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }

  // Establecer la fecha de registro si es un nuevo tutor
  if (user.isNew && user.role === "Tutor") {
    user.registrationDate = Date.now();
  }
});

module.exports = mongoose.model("User", userSchema);

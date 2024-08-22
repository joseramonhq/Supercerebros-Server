const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const childrenSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Mongoose gestiona automáticamente _id como ObjectId
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String },
  medicalInfo: { type: String },
  parentId: { 
    type: mongoose.Schema.Types.ObjectId, // Relación con el tutor
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    default: 'Children'
   
  },
email: { 
  type: String,
  required: true,
  unique: true, // Asegura que sea único en la colección
  validate: {
    validator: function(value) {
      // Permite tanto un email válido como un nickname
      return validator.isEmail(value) || /^[a-zA-Z0-9_]+$/.test(value);
    },
    message: 'Debe ser un email válido o un nickname sin espacios.'
  }
},
  password: { 
    type: String,
    required: true
  },
  filesIds: [{
    type: mongoose.Schema.Types.ObjectId, // Relación con archivos
    ref: 'File' // Referencia al modelo File
  }],
  active: {
    type: Boolean,
    default: true // Para manejo de borrado lógico
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }


}, {
  timestamps: true // Automáticamente maneja createdAt y updatedAt
});

// Hook para cifrar la contraseña
childrenSchema.pre('save', function(next) {
  const children = this;

  // Normalizar el email si es un email
  if (children.isModified('email') && validator.isEmail(children.email)) {
    children.email = validator.normalizeEmail(children.email);
  }

  // Cifrar la contraseña si ha sido modificada
  if (children.isModified('password')) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(children.password, salt, function(err, hash) {
        if (err) return next(err);
        children.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('Children', childrenSchema);

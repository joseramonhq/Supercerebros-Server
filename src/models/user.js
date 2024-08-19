const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['Tutor', 'Child'], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  birthDate: { type: Date },
  dni: { type: String },
  gender: { type: String },
  medicalInfo: { type: String },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  childrenIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  fileIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  registrationDate: { type: Date },
}, {
  timestamps: true
});

// Hook para cifrar la contraseña y normalizar el email
userSchema.pre('save', function(next) {
  const user = this;

  // Normalizar el email si ha sido modificado
  if (user.isModified('email')) {
    user.email = validator.normalizeEmail(user.email);
  }

  // Cifrar la contraseña si ha sido modificada
  if (user.isModified('password')) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }

  // Establecer la fecha de registro si es un nuevo tutor
  if (user.isNew && user.role === 'Tutor') {
    user.registrationDate = Date.now();
  }
});

module.exports = mongoose.model('User', userSchema);

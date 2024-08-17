const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['Tutor', 'Child'], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  birthDate: { type: Date },
  dni: { type: String },
  gender: { type: String },
  medicalInfo: { type: String },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  childrenIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  fileIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  registrationDate: { type: Date },  // Añadido aquí
}, {
  timestamps: true
});

userSchema.pre('save', function(next) {
  if (this.isNew && this.role === 'Tutor') {
    this.registrationDate = Date.now();
  }
  next();
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }

  if (this.isNew && this.role === 'Tutor') {
    this.registrationDate = Date.now();
  }
  next();
});

const validator = require('validator');

userSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = validator.normalizeEmail(this.email); // Normaliza el email
  }

  next();
});

// Exportar el modelo de usuario
module.exports = mongoose.model('User', userSchema);

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
  fileIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
}, {
  timestamps: true
});

userSchema.pre('save', function(next) {
  if (this.isNew && this.role === 'Tutor') {
    this.registrationDate = Date.now();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);

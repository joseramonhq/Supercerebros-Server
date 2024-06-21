const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: 'Nombre de usuario'
  },
  password: {
    type: String,
    required: 'Contraseña'
  },
  email: {
    type: String,
    required: 'Email'
  },
  roles: {
    type: [String],
    required: true,
    validate: {
      validator: function(rolesArray) {
        const validRoles = ['admin', 'user', 'guest'];
        return rolesArray.every(role => validRoles.includes(role));
      },
      message: 'Roles no válidos, deben ser uno de: admin, user, guest'
    }
  }
}, {
  timestamps: true // Agrega automáticamente los campos createdAt y updatedAt
});


module.exports = mongoose.model('User', userSchema);
const User = require('./models/User');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Si la contraseña es correcta, devolver el id del usuario
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error('Error en el inicio de sesión', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  loginUser,
};

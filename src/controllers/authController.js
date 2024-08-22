const User = require('../models/user');
const bcryptjs = require("bcryptjs");
const Children = require('../models/children');

const AuthController = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Declarar la variable 'user' con 'let' para permitir reasignación
      let user = await User.findOne({ email });

      // Si no se encuentra en la colección 'User', buscar en la colección 'Children'
      if (user == null) {
        user = await Children.findOne({ email });
      }

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Comparar la contraseña proporcionada con la almacenada
      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      // Excluir la contraseña antes de devolver el usuario
      const { password: _, ...userWithoutPassword } = user.toObject();

      // Si la contraseña es correcta, devolver el usuario sin la contraseña
      res.status(200).json({ success: true, user: userWithoutPassword });
    } catch (error) {
      console.error("Error en el inicio de sesión", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};

module.exports = AuthController;

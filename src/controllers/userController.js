const bcryptjs = require('bcryptjs');  // Asegúrate de que esta línea esté correcta
const User = require("../models/User");


const UserController = {
    register: async (req, res) => {
        try {
          const userData = req.body;
    
          // Validaciones específicas basadas en el rol
          if (userData.role === "Tutor") {
            if (!userData.password) {
              return res.status(400).json({ error: "Password is required for Tutor" });
            }
          } else if (userData.role === "Child") {
            if (!userData.parentId || !userData.birthDate || !userData.dni) {
              return res.status(400).json({
                error: "ParentId, birthDate, and dni are required for Child",
              });
            }
          }
    
          // Crear el nuevo usuario con los datos procesados
          const newUser = new User(userData);
          const savedUser = await newUser.save();  // Guardar el usuario en la base de datos
    
          // Devolver el usuario creado como respuesta
          res.status(201).json(savedUser);
    
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
  
  // Método para obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserByEmail: async (req, res) => {
    try {
      const email = req.params.email;
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEmailAndPassword: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      res.status(200).json({ message: 'Login exitoso', userId: user._id });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UserController;

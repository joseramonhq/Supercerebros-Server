const User = require('../models/user');

const UserController = {
    register: async (req, res) => {
        try {
            const userData = req.body;

            // Validaciones específicas basadas en el rol
            if (userData.role === 'Tutor') {
                if (!userData.password) {
                    return res.status(400).json({ error: "Password is required for Tutor" });
                }
            } else if (userData.role === 'Child') {
                if (!userData.parentId || !userData.birthDate || !userData.dni) {
                    return res.status(400).json({ error: "ParentId, birthDate, and dni are required for Child" });
                }
            }

            const newUser = new User(userData);
            const savedUser = await newUser.save();
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
    }
};

module.exports = UserController;


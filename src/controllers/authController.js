const User = require('../models/user');
const bcryptjs = require("bcryptjs");
const Children = require('../models/children');

const AuthController = {
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Buscar el usuario en la colección User
            let user = await User.findOne({ email });

            if (!user) {
                // Si no es un User, buscar en la colección Children
                user = await Children.findOne({ email });
                
                if (!user) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }

                // Verificar la contraseña
                const isMatch = await bcryptjs.compare(password, user.password);

                if (!isMatch) {
                    return res.status(400).json({ message: "Contraseña incorrecta" });
                }

                // Excluir la contraseña antes de devolver el usuario
                const { password: _, ...childWithoutPassword } = user.toObject();

                // Si es un niño, devolver el tipo como 'Child'
                return res.status(200).json({
                    userOrChildType: 'Child',
                    user: childWithoutPassword
                });
            }

            // Comparar la contraseña proporcionada con la almacenada
            const isMatch = await bcryptjs.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Contraseña incorrecta" });
            }

            // Excluir la contraseña antes de devolver el usuario
            const { password: _, ...userWithoutPassword } = user.toObject();

            return res.status(200).json({
                userOrChildType: 'User',
                user: userWithoutPassword
            });

        } catch (error) {
            console.error("Error en el login:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
};

module.exports = AuthController;

const express = require('express');
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController')

const router = express.Router();

router.post('/login', AuthController.loginUser); // seguridad con el metodo POST

// Rutas para el usuario

router.post('/register', UserController.register);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.get('/email/:email', UserController.getUserByEmail);

module.exports = router;

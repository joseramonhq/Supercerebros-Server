const express = require('express');
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController')

const router = express.Router();

router.post('/users/login', AuthController.loginUser); // seguridad con el metodo POST

// Rutas para el usuario

router.post('/users/register', UserController.register);
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUserById);
router.get('/users/email/:email', UserController.getUserByEmail);

module.exports = router;

const express = require('express');

const AuthController = require('../controllers/authController');
const ChildController = require('../controllers/childController');

const router = express.Router();

router.post('/login', AuthController.loginUser); // seguridad con el metodo POST

// Rutas para el usuario

router.post('/registerChild', ChildController.createChild);
router.get('/:childId', ChildController.getChildById);
router.get('/email/:email', ChildController.deleteChild);

module.exports = router;
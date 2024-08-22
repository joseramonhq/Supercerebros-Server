const express = require('express');

const AuthController = require('../controllers/authController');
const ChildrenController = require('../controllers/childrenController');

const router = express.Router();

router.post('/login', AuthController.loginUser); // seguridad con el metodo POST

// Rutas para el usuario

router.post('/registerChildren', ChildrenController.createChildren);
router.get('/:childrenId', ChildrenController.getChildrenById);
router.get('/email/:email', ChildrenController.deleteChildren);

module.exports = router;
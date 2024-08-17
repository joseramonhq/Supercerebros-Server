const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/users/register', UserController.register);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUser);

module.exports = router;

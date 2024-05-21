const express = require('express');
const router = express.Router();
const userController = require('../../src/controllers/userController');
const authController = require('../../src/controllers/authController');

// Rotas do CRUD
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

//Rotas de Autenticação
router.post('/login', authController.login)
router.post('/token', authController.verificarToken, userController.authRoute)



module.exports = router;
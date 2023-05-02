const express = require('express');
const { ControllersV1 } = require('../../controllers');

const router = express.Router();

router.get('/', ControllersV1.UsersController.getAllUsers);

router.post('/register', ControllersV1.UsersController.addUser);

module.exports = router;

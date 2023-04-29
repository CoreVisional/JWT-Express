const express = require('express');
const { ControllersV1 } = require('../../controllers');

const router = express.Router();

router.post('/register', ControllersV1.UsersController.addUser);

module.exports = router;

const express = require('express');
const jwtValidation = require('../../middlewares/jwtMiddleware');
const { ControllersV1 } = require("../../controllers");

const router = express.Router();

router.post('/login', ControllersV1.AuthController.login);

router.post('/logout', ControllersV1.AuthController.logout);

router.put(
    '/change-password',
    jwtValidation.required,
    ControllersV1.AuthController.changePassword
);

module.exports = router;

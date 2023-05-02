const express = require('express');
const { ControllersV1 } = require("../../controllers");

const router = express.Router();

router.post("/login", ControllersV1.AuthController.login);

module.exports = router;

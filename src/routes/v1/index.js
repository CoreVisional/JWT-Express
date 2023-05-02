const express = require("express");

const UserRoutes = require("./users");
const AuthRoutes = require('./auth');

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);

module.exports = router;

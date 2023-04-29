const express = require("express");

const UserRoutes = require("./users");

const router = express.Router();

router.use("/users", UserRoutes);

module.exports = router;

const express = require('express');

const RoutesV1 = require('./v1');

const router = express.Router();

router.use('/v1', RoutesV1);

module.exports = router;

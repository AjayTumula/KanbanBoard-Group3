var express = require('express');
const userRoutes = require('./users')

var router = express.Router();

router.use("/users", userRoutes);

module.exports = router;

var express = require('express');
const userRoutes = require('./users')
const taskRoutes = require('./tasks')

var router = express.Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;

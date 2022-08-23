var express = require('express');
const userRoutes = require('./users')
const taskRoutes = require('./tasks')
const statusesRoutes = require('./statuses')

var router = express.Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/statuses", statusesRoutes);

module.exports = router;

var express = require('express');
const userRoutes = require('./users')
const taskRoutes = require('./tasks')
const statusesRoutes = require('./statuses')
const projectsRoutes = require('./projects')

var router = express.Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/statuses", statusesRoutes);
router.use("/projects", projectsRoutes);

module.exports = router;

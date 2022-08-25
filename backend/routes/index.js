var express = require('express');
const userRoutes = require('./users')
const taskRoutes = require('./tasks')
const statusesRoutes = require('./statuses')
const login = require('./login')
const register = require('./register')
const projectsRoutes = require('./projects')

var router = express.Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/statuses", statusesRoutes);
router.use("/login", login);
router.use("/register", register);
router.use("/projects", projectsRoutes);

module.exports = router;

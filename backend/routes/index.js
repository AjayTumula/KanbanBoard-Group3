var express = require('express');
const userRoutes = require('./users');
const taskRoutes = require('./tasks');
const statusesRoutes = require('./statuses');
const login = require('./login');
const register = require('./register');
const projectsRoutes = require('./projects');
const rolesRoutes = require('./roles');
const projectRolesRoutes = require('./projectRoles');
const prioritiesRoutes = require('./priorities')
const commentsRoutes = require('./comments')

var router = express.Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/statuses", statusesRoutes);
router.use("/login", login);
router.use("/register", register);
router.use("/projects", projectsRoutes);
router.use("/priorities", prioritiesRoutes);
router.use("/roles", rolesRoutes);
router.use("/projectroles", projectRolesRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;

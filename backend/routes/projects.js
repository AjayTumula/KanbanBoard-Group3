var express = require('express');
const { getAllProjects, addNewProject } = require('../controllers/projects');

var router = express.Router();

/* Database table Projects' functions */
router.get('/', getAllProjects);
router.post('/', addNewProject);

module.exports = router;

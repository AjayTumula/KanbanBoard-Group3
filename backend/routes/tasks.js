var express = require('express');
const { getAllTasks, addNewTask } = require('../controllers/tasks');

var router = express.Router();

/* Fetch all tasks from database */
router.get('/', getAllTasks);
router.post('/', addNewTask);

module.exports = router;

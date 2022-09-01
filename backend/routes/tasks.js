var express = require('express');
const { getAllTasks, addNewTask, deleteTask } = require('../controllers/tasks');

var router = express.Router();

/* Fetch all tasks from database */
router.get('/', getAllTasks);
router.post('/', addNewTask);
router.delete('/:id', deleteTask)

module.exports = router;

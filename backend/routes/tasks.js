var express = require('express');
const { getAllTasks } = require('../controllers/tasks');

var router = express.Router();

/* Fetch all tasks from database */
router.get('/', getAllTasks);

module.exports = router;

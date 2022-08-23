var express = require('express');
const { getAllStatuses } = require('../controllers/statuses');

var router = express.Router();

/* Fetch all tasks from database */
router.get('/', getAllStatuses);

module.exports = router;

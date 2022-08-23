var express = require('express');
const { getAllStatuses, addNewStatus } = require('../controllers/statuses');

var router = express.Router();

/* Fetch all tasks from database */
router.get('/', getAllStatuses);
router.post('/', addNewStatus);

module.exports = router;

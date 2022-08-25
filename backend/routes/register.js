var express = require('express');
const { addNewUsers } = require('../controllers/register');

var router = express.Router();

/*Fetch all tasks from database*/
router.post('/', addNewUsers);

module.exports = router;



var express = require('express');
const { getAllUsers } = require('../controllers/login');

var router = express.Router();

/*Fetch all tasks from database*/
router.get('/', getAllUsers);

module.exports = router;



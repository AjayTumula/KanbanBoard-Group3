var express = require('express');
const { getUser } = require('../controllers/login');

var router = express.Router();

/*Fetch all tasks from database*/
router.post('/', getUser);

module.exports = router;



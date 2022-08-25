var express = require('express');
const { addNewUser } = require('../controllers/register');

var router = express.Router();

/*Fetch all tasks from database*/
router.post('/', addNewUser);

module.exports = router;



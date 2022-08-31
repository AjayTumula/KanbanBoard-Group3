var express = require('express');
const { getUser, changePassword } = require('../controllers/login');

var router = express.Router();

/*Fetch all tasks from database*/
router.post('/', getUser);
router.put('/', changePassword);

module.exports = router;



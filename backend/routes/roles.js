var express = require('express');
const { getAllRoles} = require('../controllers/roles');

var router = express.Router();

/* Database table Roles' functions */
router.get('/', getAllRoles);

module.exports = router;

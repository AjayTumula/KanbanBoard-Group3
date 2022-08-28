var express = require('express');
const { assignUser} = require('../controllers/projectRoles');

var router = express.Router();

/* Database table Project_Roles' functions */
router.post('/', assignUser);

module.exports = router;

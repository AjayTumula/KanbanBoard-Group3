var express = require('express');
const { getUsersByProjectId,getAllUsers } = require("../controllers/users");

var router = express.Router();

/* GET user by id */
router.get('/', getUsersByProjectId);
router.get('/list', getAllUsers);

module.exports = router;

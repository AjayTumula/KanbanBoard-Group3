var express = require('express');
const { getUserByProjectId,getAllUsers } = require("../controllers/users");

var router = express.Router();

/* GET user by id */
router.get('/', getUserByProjectId);
router.get('/list', getAllUsers);

module.exports = router;

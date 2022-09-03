var express = require('express');
const { getUsersByProjectId,getAllUsers } = require("../controllers/users");

var router = express.Router();

/* GET user by id */
router.get('/:id', getUsersByProjectId);
router.get('/list', getAllUsers);

module.exports = router;

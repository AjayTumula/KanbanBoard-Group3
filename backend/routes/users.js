var express = require('express');
const { getUserById,getAllUsers } = require("../controllers/users");

var router = express.Router();

/* GET user by id */
router.get('/', getUserById);
router.get('/list', getAllUsers);

module.exports = router;

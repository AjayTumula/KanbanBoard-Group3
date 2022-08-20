var express = require('express');
const { getUserById } = require("../controllers/users");

var router = express.Router();

/* GET user by id */
router.get('/', getUserById);

module.exports = router;

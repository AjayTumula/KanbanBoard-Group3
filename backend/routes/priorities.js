var express = require('express');
const { getAllPriorities } = require('../controllers/priorities');

var router = express.Router();

router.get('/', getAllPriorities);

module.exports = router;

var express = require('express');
const { getAllComments, addComment,deleteComment } = require('../controllers/comments');

var router = express.Router();

router.get('/:id', getAllComments);
router.post('/', addComment);
router.delete('/:id', deleteComment)

module.exports = router;

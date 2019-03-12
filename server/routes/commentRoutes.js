const express = require('express');
const router = express.Router();

const authenticateUser = require('../middlewares/authentication');
const {
  createNewComment,
  editComment,
  deleteComment
} = require('../controllers/commentController');

// router.get('/', getAllPosts);

router.post('/createcomment', authenticateUser, createNewComment);
router.patch('/edit/:commentId', authenticateUser, editComment);
router.delete('/delete/:commentId', authenticateUser, deleteComment);

module.exports = router;

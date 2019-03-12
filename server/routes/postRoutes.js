const express = require('express');
const router = express.Router();

const authenticateUser = require('../middlewares/authentication');
const {
  createNewPost,
  getAllPosts,
  editPost,
  getSinglePost,
  deletePost
} = require('../controllers/postController');

router.post('/newpost', authenticateUser, createNewPost);
router.get('/getsinglepost/:postquery', getSinglePost);
router.patch('/edit/:postId', authenticateUser, editPost);
router.get('/getallposts', getAllPosts);
router.delete('/delete/:postquery', authenticateUser, deletePost);

module.exports = router;

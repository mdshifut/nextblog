const express = require('express');
const router = express.Router();

const authenticateUser = require('../middlewares/authentication');
const {
  createNewReply,
  editReply,
  deleteReply,
  getAllReplies
} = require('../controllers/replyController');

router.post('/createreply', authenticateUser, createNewReply);
router.patch('/editreply', authenticateUser, editReply);
router.delete('/delete/:replyId', authenticateUser, deleteReply);
router.get('/getallreplies', getAllReplies);

module.exports = router;

const CommentModel = require('../models/post/CommentModel');
const ReplyModel = require('../models/post/ReplyModel');

const createNewReply = async (req, res, next) => {
  try {
    const reply = new ReplyModel({
      author: req.userData.userId,
      commentId: req.body.commentId,
      body: req.body.replyBody
    });

    const newReply = await reply.save();

    //   Find the comment
    const comment = await CommentModel.findOne({ _id: req.body.commentId });

    const replies = [...comment.replies];
    replies.push(newReply._id);

    //   Update the comment with new reply
    const updatedComment = await CommentModel.findOneAndUpdate(
      { _id: req.body.commentId },
      { replies }
    );

    if (updatedComment) {
      return res.json({
        newReply
      });
    }
  } catch (error) {
    return catchError(res, error);
  }
};

// Edit a reply
const editReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const reply = await ReplyModel.findById(replyId);

    // Check reply creator and current author is same
    if (!reply.author.equals(req.userData.userId)) {
      return res.json({
        message: 'You are not premited to edit this comment'
      });
    }

    const updatedReply = await ReplyModel.findByIdAndUpdate(replyId, req.body);

    if (!updatedReply) {
      return res.json({
        message: 'Update failed'
      });
    }

    return res.json({
      message: 'Updated successfully'
    });
  } catch (error) {
    return catchError(res, error);
  }
};

// Delete a reply
const deleteReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const reply = await ReplyModel.findById(replyId);

    // Check reply creator and current author is same
    if (!reply.author.equals(req.userData.userId)) {
      return res.json({
        message: 'You are not premited to delete this comment'
      });
    }

    // Find and remove this reply id from associated comment replies array
    const associatedComment = await CommentModel.findById(reply.commentId);

    if (associatedComment) {
      var updatedReplies = associatedComment.replies.filter(
        replyIds => !reply._id.equals(replyIds)
      );

      // Update the comment
      const updatedComment = await CommentModel.findOneAndUpdate(
        { _id: reply.commentId },
        { replies: updatedReplies }
      );
    }

    // Finally delete the reply
    const deletedReply = await ReplyModel.findByIdAndDelete(replyId);

    if (!deletedReply) {
      return res.json({
        message: 'Operation failed'
      });
    }

    return res.json({
      message: 'Delete successfully'
    });
  } catch (error) {
    return catchError(res, error);
  }
};

// get all reply
const getAllReplies = async (req, res, next) => {
  try {
    const allReplies = await ReplyModel.find();

    return res.json(allReplies);
  } catch (error) {
    return catchError(res, error);
  }
};
module.exports = {
  createNewReply,
  editReply,
  deleteReply,
  getAllReplies
};

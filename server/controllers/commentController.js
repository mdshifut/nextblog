// const CommentModel = require('../models/post/commentModel');

const CommentModel = require('../models/post/CommentModel');
const PostModel = require('../models/post/PostModel');
const ReplyModel = require('../models/post/ReplyModel');

// Create New comment
const createNewComment = async (req, res, next) => {
  try {
    const comment = new CommentModel({
      author: req.userData.userId,
      postId: req.body.postId,
      body: req.body.commentBody
    });

    const newComment = await comment.save();

    //   Find the post
    const post = await PostModel.findOne({ _id: req.body.postId });

    const comments = [...post.comments];
    comments.push(newComment._id);

    //   Update the post with new comments
    const UpdatedPost = await PostModel.findOneAndUpdate(
      { _id: req.body.postId },
      { comments }
    );

    if (UpdatedPost) {
      return res.json({
        newComment
      });
    }
  } catch (error) {
    return catchError(res, error);
  }
};

// Edit a post
const editComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await CommentModel.findById(commentId);

    // Check comment creator and current author is same
    if (!comment.author.equals(req.userData.userId)) {
      return res.json({
        message: 'You are not premited to edit this comment'
      });
    }

    const updatedComment = await CommentModel.findByIdAndUpdate(
      commentId,
      req.body
    );

    if (!updatedComment) {
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

// Delete a comment
const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await CommentModel.findById(commentId);

    // Check comment creator and current author is same
    if (!comment.author.equals(req.userData.userId)) {
      return res.json({
        message: 'You are not premited to delete this comment'
      });
    }

    // Delete all replies associated with this comment
    comment.replies.forEach(replyId => ReplyModel.findByIdAndDelete(replyId));

    // Find and remove this comment id from associated post comments array
    const associatedPost = await PostModel.findById(comment.postId);
    const updatedComments = associatedPost.comments.filter(
      commentIds => !comment._id.equals(commentIds)
    );

    // Update the post
    const updatedComment = await PostModel.findOneAndUpdate(
      { _id: comment.postId },
      { comments: updatedComments }
    );

    // Finally delete the comment
    const deletedComment = await CommentModel.findByIdAndDelete(commentId);

    if (!deletedComment) {
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

module.exports = {
  createNewComment,
  editComment,
  deleteComment
};

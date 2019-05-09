const PostModel = require("../models/post/PostModel");
const CommentModel = require("../models/post/CommentModel");
const ReplyModel = require("../models/post/ReplyModel");
const postValidator = require("../validator/postValidator");
const slug = require("slug");
const mongoose = require("mongoose");
const catchError = require("../utils/catchError");
// Create new post
const createNewPost = async (req, res, next) => {
  const { title, description, category, tags, galleryContent } = req.body;

  try {
    const postData = {
      author: req.userData._id,
      title,
      description,
      category,
      tags,
      galleryContent,
      slug: slug(title)
    };

    const validatorResult = postValidator(postData);

    if (!validatorResult.isValid) {
      return res.json({
        ...validatorResult
      });
    }

    const post = new PostModel(postData);

    const newPost = await post.save();

    return res.json(newPost);
  } catch (error) {
    return catchError(res, error);
  }
};

// Get all posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find();

    return res.json(posts);
  } catch (error) {
    return catchError(res, error);
  }
};

// Edit a post
const editPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findById(postId);

    if (!post.author.equals(req.userData._id)) {
      return res.json({
        message: "You are not premited to edit this post"
      });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body);

    if (!updatedPost) {
      return res.json({
        message: "Update failed"
      });
    }

    return res.json({
      message: "Updated successfully"
    });
  } catch (error) {
    return catchError(res, error);
  }
};

// Get a single post
const getSinglePost = async (req, res, next) => {
  try {
    const { postquery } = req.params;

    let post = null;

    if (mongoose.Types.ObjectId.isValid(postquery)) {
      post = await PostModel.findById(postquery)
        .populate({
          path: "comments",
          populate: {
            path: "replies",
            populate: { path: "author", select: ["firstName", "lastName"] }
          }
        })
        .populate("author")
        .populate("category");
    } else {
      post = await PostModel.findOne({ slug: postquery })
        .populate({
          path: "comments",
          populate: {
            path: "replies",
            populate: { path: "author", select: ["firstName", "lastName"] }
          }
        })
        .populate("author")
        .populate("category");
    }

    if (!post) {
      return res.json({
        message: "Post not found"
      });
    }

    return res.json(post);
  } catch (error) {
    return catchError(res, error);
  }
};

// Delete a reply
const deletePost = async (req, res, next) => {
  try {
    const { postquery } = req.params;

    let post = null;

    // Find the post
    if (mongoose.Types.ObjectId.isValid(postquery)) {
      post = await PostModel.findById(postquery);
    } else {
      post = await PostModel.findOne({ slug: postquery });
    }

    // Check post creator and current author is same
    if (!post.author.equals(req.userData.userId)) {
      return res.json({
        message: "You are not premited to delete this post"
      });
    }

    // Delete all comments and comment replies associated with this post
    post.comments.forEach(async currentCommentId => {
      const currentComment = await CommentModel.findById(currentCommentId);

      // Delete all replies associated with current comment
      currentComment.replies.forEach(replyId =>
        ReplyModel.findByIdAndDelete(replyId)
      );

      CommentModel.findByIdAndDelete(currentComment);
    });

    // Finally delete the post
    const deletedPost = await PostModel.findByIdAndDelete(post._id);

    if (!deletedPost) {
      return res.json({
        message: "Operation failed"
      });
    }

    return res.json({
      message: "Delete successfully"
    });
  } catch (error) {
    return catchError(res, error);
  }
};

module.exports = {
  createNewPost,
  getAllPosts,
  editPost,
  getSinglePost,
  deletePost
};

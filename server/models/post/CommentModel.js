const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    postId: { type: Schema.Types.ObjectId, ref: 'PostModel' },
    body: String,
    like: { type: Number, default: 0 },
    disLike: { type: Number, default: 0 },
    replies: [{ type: Schema.Types.ObjectId, default: [], ref: 'ReplyModel' }],
    replyIsClose: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const CommentModel = mongoose.model('CommentModel', commentSchema);

module.exports = CommentModel;

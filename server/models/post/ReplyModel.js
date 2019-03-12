const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    commentId: { type: Schema.Types.ObjectId, ref: 'CommentModel' },
    body: String,
    like: { type: Number, default: 0 },
    disLike: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const ReplyModel = mongoose.model('ReplyModel', replySchema);

module.exports = ReplyModel;

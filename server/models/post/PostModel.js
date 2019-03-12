const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    title: String,
    slug: String,
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'CategoryModel' },
    like: { type: Number, default: 0 },
    disLike: { type: Number, default: 0 },
    comments: [
      { type: Schema.Types.ObjectId, default: [], ref: 'CommentModel' }
    ],
    tags: [{ type: String, default: [] }],
    featuredItems: [Object],
    commentIsClose: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const PostModel = mongoose.model('PostModel', postSchema);

module.exports = PostModel;

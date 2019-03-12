const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CetegorySchema = new Schema(
  {
    name: String,
    slug:String
  },
  { timestamps: true }
);

const CetegoryModel = mongoose.model('CetegoryModel', CetegorySchema);

module.exports = CetegoryModel;

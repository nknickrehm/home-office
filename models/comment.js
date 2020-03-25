const { Schema, ObjectId } = require('mongoose');

const commentSchema = new Schema({
  autherId: ObjectId,
  authorDisplayName: String,
  likes: [ ObjectId ]
});

module.exports = { commentSchema };

const { Schema, ObjectId } = require('mongoose');

const courseMemberSchema = new Schema({
  userId: ObjectId,
  displayName: String,
  email: String,
});

module.exports = { courseMemberSchema };

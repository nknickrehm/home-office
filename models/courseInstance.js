const { Schema } = require('mongoose');
const { courseMemberSchema } = require('./courseMember');

const courseInstanceSchema = new Schema({
  date: Date,
  members: [ courseMemberSchema ],
});

module.exports = { courseInstanceSchema };

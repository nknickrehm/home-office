const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const course_member_schema = new Schema({
  displayName: String,
  email: String,
});

const CourseMember = mongoose.model('courseMember', course_member_schema);

module.exports = { CourseMember, course_member_schema };

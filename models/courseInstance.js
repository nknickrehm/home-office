const mongoose = require('mongoose');
const courseMemberSchema = require('./courseMember').course_member_schema;

const Schema = mongoose.Schema;

const course_instance_schema = new Schema({
  date: Date,
  members: [courseMemberSchema],
});

const CourseInstance = mongoose.model('courseInstance', course_instance_schema);

module.exports = { CourseInstance, course_instance_schema };

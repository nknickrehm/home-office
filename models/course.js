const mongoose = require('mongoose');
const courseInstanceSchema = require('./courseInstance').course_instance_schema;

const Schema = mongoose.Schema;

const course_schema = new Schema({
  title: String,
  description: String,
  thumbnailURL: String,
  tags: [ String ],
  courseInstances: [ courseInstanceSchema ]
});

const Course = mongoose.model('course', course_schema);

module.exports = { Course, course_schema };

const mongoose = require('mongoose');
const { User } = require('./user');
const { courseInstanceSchema } = require('./courseInstance');
const { commentSchema } = require('./comment');

const courseSchema = new mongoose.Schema({
  authorId: mongoose.ObjectId,
  title: String,
  description: String,
  thumbnailURL: String,
  bannerURL: String,
  tags: [ String ],
  comments: [ commentSchema ],
  courseInstances: [ courseInstanceSchema ]
});

const Course = mongoose.model('course', courseSchema);

module.exports = { Course, courseSchema };

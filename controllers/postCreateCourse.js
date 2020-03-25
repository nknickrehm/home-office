const { Course } = require('../models/course');
const { User } = require('../models/user');
const getCourse = require('./getCourse');
const getCreateCourse = require('./getCreateCourse');

module.exports = async function(req, res, next) {
  const { title, description, tags, thumbnailURL, bannerURL } = req.body;

  if (!title || !description || !tags || !thumbnailURL || !bannerURL) return getCreateCourse(req, res, next);
  const _tags = tags.replace(', ', ',');
  const tagsArray = _tags.split(',');

  const newCourse = new Course({ authorId: req.user._id, title, description, tags: tagsArray, thumbnailURL, bannerURL });
  await newCourse.save();

  const user = await User.findOneAndUpdate({ _id: req.user._id });
  user.courses.push(newCourse);
  await user.save();

  return res.redirect(`/plattform/alle-kurse/${newCourse._id}`);
};

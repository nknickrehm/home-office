const { User } = require('../models/user');
const { Course } = require('../models/course');

const redirectAllCourses = require('./redirectAllCourses');
const getCourse = require('./getCourse');
const getEditCourse = require('./getEditCourse');

module.exports = async function(req, res, next) {
  try {
    const { courseId } = req.params;

    // Check if both mandatory fields are set in the POST request
    const { title, description, tags, thumbnailURL, bannerURL } = req.body;

    if (!title || !description || !tags || !thumbnailURL || !bannerURL) return getEditCourse(req, res, next);
    const _tags = tags.replace(', ', ',');
    const tagsArray = _tags.split(',');

    const course = await Course.findOne({ _id: courseId });
    if (!course) throw new Error('Dieser Kurs existiert nicht.');

    const user = await User.findOne({ _id: req.user._id });
    if (!user) throw new Error('Dieser Benutzer existiert nicht.');

    // Check if the user is the author of this course
    let isAuthor = !! user.courses.id(course._id);

    if (!isAuthor) throw new Error('Du bist nicht der Autor dieses Kurses.');

    course.title = title;
    course.description = description;
    course.tags = tagsArray;
    course.thumbnailURL = thumbnailURL;
    course.bannerURL = bannerURL;

    await course.save();

    user.courses.push(course);
    await user.save();

    return getCourse(req, res, next);
  } catch (error) {
    next(error);
  }
};

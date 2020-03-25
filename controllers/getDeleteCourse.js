const { User } = require('../models/user');
const { Course } = require('../models/course');
const redirectAllCourses = require('./redirectAllCourses');

module.exports = async function(req, res, next) {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({ _id: courseId });
    if (!course) throw new Error('Dieser Kurs existiert nicht.');

    const user = await User.findOne({ _id: req.user._id });
    if (!user) throw new Error('Dieser Benutzer existiert nicht.');

    // Check if the user is the author of this course
    let isAuthor = !! user.courses.id(course._id);

    if (!isAuthor) throw new Error('Du bist nicht der Autor dieses Kurses.');

    await course.remove();

    user.courses.pull(course);
    await user.save();

    redirectAllCourses(req, res, next);
  } catch (error) {
    next(error);
  }
};

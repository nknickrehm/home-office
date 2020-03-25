const { User } = require('../models/user');
const { Course } = require('../models/course');
const getCourse = require('./getCourse');
const getNewCourseDate = require('./getNewCourseDate');

module.exports = async function (req, res, next) {
  const { year, month, day, hour, minute } = req.body;

  if (!year || !month || !day || !hour || !minute) {
    return getNewCourseDate(req, res, next);
  }

  if (Number.isNaN(parseInt(year))) return getNewCourseDate(req, res, next);
  if (Number.isNaN(parseInt(month))) return getNewCourseDate(req, res, next);
  if (Number.isNaN(parseInt(day))) return getNewCourseDate(req, res, next);
  if (Number.isNaN(parseInt(hour))) return getNewCourseDate(req, res, next);
  if (Number.isNaN(parseInt(minute))) return getNewCourseDate(req, res, next);

  const date = new Date();
  date.setFullYear(parseInt(year));
  date.setMonth(parseInt(month) - 1);
  date.setDate(parseInt(day));
  date.setHours(parseInt(hour));
  date.setMinutes(parseInt(minute));

  try {
    const { courseId } = req.params;

    const course = await Course.findOne({ _id: courseId });
    if (!course) throw new Error('Dieser Kurs existiert nicht.');

    const user = await User.findOne({ _id: req.user._id });
    if (!user) throw new Error('Dieser Benutzer existiert nicht.');

    // Check if the user is the author of this course
    let isAuthor = !! user.courses.id(course._id);

    if (!isAuthor) throw new Error('Du bist nicht der Autor dieses Kurses.');

    const newCourseInstance = { date };
    course.courseInstances.push(newCourseInstance);

    await course.save();

    user.courses.push(course);
    await user.save();

    return getCourse(req, res, next);
  } catch (error) {
    next(error);
  }
};

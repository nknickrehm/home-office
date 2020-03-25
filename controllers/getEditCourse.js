const { User } = require('../models/user');
const { Course } = require('../models/course');

module.exports = async function (req, res, next) {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({ _id: courseId });
    if (!course) throw new Error('Dieser Kurs existiert nicht.');

    const user = await User.findOne({ _id: req.user._id });
    if (!user) throw new Error('Dieser Benutzer existiert nicht.');

    // Check if the user is the author of this course
    let isAuthor = !! user.courses.id(course._id);

    if (!isAuthor) throw new Error('Du bist nicht der Autor dieses Kurses.');

    res.render('edit-course', { course });
  } catch (error) {
    next(error);
  }
};

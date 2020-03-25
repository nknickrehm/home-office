const { User } = require('../models/user');
const { Course } = require('../models/course');

module.exports = async function (req, res, next) {
  try {
    const { courseId, courseInstanceId } = req.params;

    const course = await Course.findOne({ _id: courseId });
    if (!course) throw new Error('Dieser Kurs existiert nicht.');

    const user = await User.findOne({ _id: req.user._id });
    if (!user) throw new Error('Dieser Benutzer existiert nicht.');

    // Check if the user is the author of this course
    let isAuthor = !! user.courses.id(course._id);

    if (isAuthor) throw new Error('Du kannst nicht an deinem eigenen Kurs teilnehmen.');

    const courseInstance = course.courseInstances.id(courseInstanceId);
    if (!courseInstance) throw new Error('Ungültiger Kurstermin.');

    if (courseInstance.members.find(m => m.userId.equals(user._id))) throw new Error('Du bist bereits angemeldet.');

    const courseMember = {
      userId: user._id,
      email: user.email,
      displayName: user.displayName,
    };

    courseInstance.members.push(courseMember);

    await course.save();

    const author = await User.findOne({ 'courses._id': course._id });
    author.courses.push(course);
    await author.save();

    return res.redirect(`/plattform/alle-kurse/${course._id}`);
  } catch (error) {
    next(error);
  }
};

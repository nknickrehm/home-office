const { Course } = require('../models/course');

module.exports = async function (req, res, next) {
  try {
    const courses = await Course.find({});
    return res.render('all-courses', { courses });
  } catch (error) {
    return next(error);
  }
};

var express = require('express');
const xss = require('xss');
const showdown  = require('showdown');
const CourseInstance = require('../models/courseInstance').CourseInstance;
const Course = require('../models/course').Course;
const User = require('../models/user').User;

var router = express.Router();
const Converter = new showdown.Converter();

router.get('/', function(req, res, next) {
  res.redirect('/plattform/alle-kurse');
});

router.get('/alle-kurse', function(req, res, next) {
  Course.find({}, (err, courses) => {
    if (err) return next(err);
    res.render('all-courses', { loggedIn: req.isAuthenticated(), courses });
  });
});

router.get('/alle-kurse/:courseId/', function(req, res, next) {
  Course.findOne({ _id: req.params.courseId }, (err, course) => {
    if (err) return next(err);

    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) return next(err);
      let isOwner = false;

      if (!!user.courses.find(c => c._id.equals(course._id))) {
        isOwner = true;
      }

      let courseDescriptionHTML = Converter.makeHtml(course.description);
      courseDescriptionHTML = courseDescriptionHTML.replace(/<h1 id="[^>]*>/g, '<h2>');
      courseDescriptionHTML = courseDescriptionHTML.replace(/<h1>/g, '<h2>');
      courseDescriptionHTML = courseDescriptionHTML.replace(/<\/h1>/g, '</h2>');

      const xssOptions = {
        whiteList: {
          h2: [],
          a: ['href','target'],
          img: ['src','alt'],
          p: [],
          ol: [],
          ul: [],
          li: [],
          em: [],
          strong: []
        }
      };
      courseDescriptionHTML = xss(courseDescriptionHTML, xssOptions);

      const renderedCourse = JSON.parse(JSON.stringify(course));
      renderedCourse.description = courseDescriptionHTML;

      res.render('course', { loggedIn: req.isAuthenticated(), course: renderedCourse, isOwner });
    });
  });
});

router.get('/alle-kurse/:courseId/bearbeiten', function(req, res, next) {
  Course.findOne({ _id: req.params.courseId }, (err, course) => {
    if (err) return next(err);

    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) return next(err);
      let isOwner = false;

      if (!!user.courses.find(c => c._id.equals(course._id))) {
        isOwner = true;
      }

      if (!isOwner) {
        const e = new Error();
        e.code = '403';
        e.message = 'Du kannst nur Kurse bearbeiten, die du selber erstellt hast!';
        return next(e);
      }

      res.render('edit-course', { loggedIn: req.isAuthenticated(), course });
    });
  });
});

router.get('/alle-kurse/:courseId/loeschen', function(req, res, next) {
  Course.findOne({ _id: req.params.courseId }, (err, course) => {
    if (err) return next(err);

    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) return next(err);
      let isOwner = false;

      if (!!user.courses.find(c => c._id.equals(course._id))) {
        isOwner = true;
      }

      if (!isOwner) {
        const e = new Error();
        e.code = '403';
        e.message = 'Du kannst nur Kurse löschen, die du selber erstellt hast!';
        return next(e);
      }

      course.courseInstances.forEach((courseInstance) => CourseInstance.findOneAndRemove({ _id: courseInstance._id }));

      Course.findOneAndRemove({ _id: req.params.courseId }, (err) => {
        if (err) return next(err);
        res.redirect('/plattform/alle-kurse/');
      });
    });
  });
});

router.post('/alle-kurse/:courseId/bearbeiten', (req, res, next) => {
  Course.findOne({ _id: req.params.courseId }, (err, course) => {
    const { title, description } = req.body;
    if (!title || !description) return res.redirect(`/plattform/alle-kurse/${req.params.courseId}/bearbeiten`);
    if (err) return next(err);

    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) return next(err);
      let isOwner = false;

      if (!!user.courses.find(c => c._id.equals(course._id))) {
        isOwner = true;
      }

      if (!isOwner) {
        const e = new Error();
        e.code = '403';
        e.message = 'Du kannst nur Kurse bearbeiten, die du selber erstellt hast!';
        return next(e);
      }

      Course.findOneAndUpdate({ _id: req.params.courseId }, { title, description}, (err) => {
        if (err) return next(err);
        res.redirect(`/plattform/alle-kurse/${req.params.courseId}#bearbeitet`);
      });
    });
  });
});

router.get('/alle-kurse/:courseId/neuer-termin', function(req, res, next) {
  Course.findOne({ _id: req.params.courseId }, (err, course) => {
    if (err) return next(err);

    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) return next(err);
      let isOwner = false;

      if (!!user.courses.find(c => c._id.equals(course._id))) {
        isOwner = true;
      }

      if (!isOwner) {
        const e = new Error();
        e.code = '403';
        e.message = 'Du kannst nur Kurse bearbeiten, die du selber erstellt hast!';
        return next(e);
      }

      res.render('new-date', { loggedIn: req.isAuthenticated(), course });
    });
  });
});

router.post('/alle-kurse/:courseId/neuer-termin', function(req, res, next) {
  const { year, month, day, hour, minute } = req.body;
  if (!year || !month || !day || !hour || !minute) {
    return res.redirect(`/plattform/alle-kurse/${req.params.courseId}/neuer-termin`);
  }

  if (Number.isNaN(parseInt(year))) return res.redirect(`/plattform/alle-kurse/${req.params.courseId}/neuer-termin`);
  if (Number.isNaN(parseInt(month))) return res.redirect(`/plattform/alle-kurse/${req.params.courseId}/neuer-termin`);
  if (Number.isNaN(parseInt(day))) return res.redirect(`/plattform/alle-kurse/${req.params.courseId}/neuer-termin`);
  if (Number.isNaN(parseInt(hour))) return res.redirect(`/plattform/alle-kurse/${req.params.courseId}/neuer-termin`);
  if (Number.isNaN(parseInt(minute))) return res.redirect(`/plattform/alle-kurse/${req.params.courseId}/neuer-termin`);

  const date = new Date();
  date.setFullYear(parseInt(year));
  date.setMonth(parseInt(month) - 1);
  date.setDate(parseInt(day));
  date.setHours(parseInt(hour));
  date.setMinutes(parseInt(minute));

  Course.findOne({ _id: req.params.courseId }, (err, course) => {
    if (err) return next(err);

    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) return next(err);
      let isOwner = false;

      if (!!user.courses.find(c => c._id.equals(course._id))) {
        isOwner = true;
      }

      if (!isOwner) {
        const e = new Error();
        e.code = '403';
        e.message = 'Du kannst nur Kurse bearbeiten, die du selber erstellt hast!';
        return next(e);
      }

      const newCourseInstance = new CourseInstance({ date });
      newCourseInstance.save((err, courseInstance) => {
        if (err) return next(err);
        course.courseInstances.push(courseInstance);
        course.save((err) => {
          if (err) return next(err);
          return res.redirect(`/plattform/alle-kurse/${req.params.courseId}`)
        })
      });
    });
  });
});

/* GET users listing. */
router.get('/mein-profil', function(req, res, next) {
  res.render('my-profile', { loggedIn: req.isAuthenticated() });
});


/* GET users listing. */
router.get('/kurs-erstellen', function(req, res, next) {
  res.render('create-course', { loggedIn: req.isAuthenticated() });
});

router.get('/bestenliste', function(req, res, next) {
  res.redirect('/plattform/bestenliste/benutzer');
});

/* GET users listing. */
router.get('/bestenliste/teams', function(req, res, next) {
  res.render('leaderboard-team', { loggedIn: req.isAuthenticated() });
});

/* GET users listing. */
router.get('/bestenliste/benutzer', function(req, res, next) {
  res.render('leaderboard-user', { loggedIn: req.isAuthenticated() });
});

router.post('/kurs-erstellen', function(req, res, next) {
  const { body } = req;
  const {
    title,
    description } = body;

  if (!title || !description)
    return res.redirect('/kurs-erstellen');

  const newCourse = new Course({ title, description });
  newCourse.save((err, course) => {
    if (err) return next(err);
    User.findOneAndUpdate({ _id: req.user._id }, { $push: { courses: course } }, (err) => {
      if (err) return next(err);
      return res.redirect(`/plattform/alle-kurse/${ course._id }`);
    });
  });
});

module.exports = router;

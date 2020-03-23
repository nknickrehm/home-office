var express = require('express');
const xss = require('xss');
const showdown  = require('showdown');
const Course = require('../models/course').Course;
const User = require('../models/user').User;

var router = express.Router();
const Converter = new showdown.Converter();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/plattform/alle-kurse');
});

/* GET users listing. */
router.get('/alle-kurse', function(req, res, next) {
  Course.find({}, (err, courses) => {
    if (err) return next(err);
    res.render('all-courses', { loggedIn: req.isAuthenticated(), courses });
  });
});

/* GET users listing. */

router.get('/alle-kurse/demo/', function(req, res, next) {
  res.render('demo-course', { loggedIn: req.isAuthenticated(), course: { title:'', description: ''} });
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
      courseDescriptionHTML = courseDescriptionHTML.replace('</h1>', '</h2>');

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

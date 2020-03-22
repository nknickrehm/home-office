var express = require('express');
const Course = require('../models/course').Course;
const User = require('../models/user').User;

var router = express.Router();

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
    res.render('course', { loggedIn: req.isAuthenticated(), course });
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

var express = require('express');
const Course = require('../models/course').Course;

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
router.get('/mein-profil', function(req, res, next) {
  res.render('my-profile', { loggedIn: req.isAuthenticated() });
});

module.exports = router;

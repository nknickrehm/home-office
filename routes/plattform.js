var express = require('express');

const CourseMember = require('../models/courseMember').CourseMember;
const CourseInstance = require('../models/courseInstance').CourseInstance;
const Course = require('../models/course').Course;
const User = require('../models/user').User;

var router = express.Router();


const redirectAllCourses = require('../controllers/redirectAllCourses');

const getAllCourses = require('../controllers/getAllCourses');
const getCourse = require('../controllers/getCourse');
const getEditCourse = require('../controllers/getEditCourse');
const getDeleteCourse = require('../controllers/getDeleteCourse');
const getEnrollCourse = require('../controllers/getEnrollCourse');
const getNewCourseDate = require('../controllers/getNewCourseDate');
const getMyProfile = require('../controllers/getMyProfile');
const getCreateCourse = require('../controllers/getCreateCourse');

const postCreateCourse = require('../controllers/postCreateCourse');
const postEditCourse = require('../controllers/postEditCourse');
const postNewCourseDate = require('../controllers/postNewCourseDate');

router.get('/', redirectAllCourses);

router.get('/alle-kurse', getAllCourses);
router.get('/alle-kurse/:courseId/', getCourse);
router.get('/alle-kurse/:courseId/bearbeiten', getEditCourse);
router.get('/alle-kurse/:courseId/loeschen', getDeleteCourse);
router.get('/alle-kurse/:courseId/neuer-termin', getNewCourseDate);
router.get('/alle-kurse/:courseId/:courseInstanceId/teilnehmen', getEnrollCourse);
router.get('/kurs-erstellen', getCreateCourse);
router.get('/mein-profil', getMyProfile);

router.post('/kurs-erstellen', postCreateCourse);
router.post('/alle-kurse/:courseId/bearbeiten', postEditCourse);
router.post('/alle-kurse/:courseId/neuer-termin', postNewCourseDate);

router.get('/bestenliste', function(req, res, next) {
  res.redirect('/plattform/bestenliste/benutzer');
});

router.get('/bestenliste/teams', function(req, res, next) {
  res.render('leaderboard-team');
});

router.get('/bestenliste/benutzer', function(req, res, next) {
  res.render('leaderboard-user');
});

module.exports = router;

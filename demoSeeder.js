require('dotenv').config();
require('./db');

const User = require('./models/user').User;
const Course = require('./models/course').Course;
const CourseInstance = require('./models/courseInstance').CourseInstance;

const courses = [
  {
    title: "Test A",
    description: "Test A",
    thumbnailURL: "Test A",
    tags: ["Tag A", "Tag B", "Tag C"],
  },
  {
    title: "Test B",
    description: "Test B",
    thumbnailURL: "Test B",
    tags: ["Tag A"],
  },
  {
    title: "Test C",
    description: "Test C",
    thumbnailURL: "Test C",
    tags: ["Tag B"],
  },
  {
    title: "Test D",
    description: "Test D",
    thumbnailURL: "Test D",
    tags: ["Tag B", "Tag C"],
  },
  {
    title: "Test E",
    description: "Test E",
    thumbnailURL: "Test E",
    tags: ["Tag C"],
  },
];

const createHostUser = () => {
  User.register(new User({email: 'host@example.com'}),
    'host', (err, user) => {
      if (err) {
        console.error(err);
      }

      user.displayName = 'Nikolas';

      user.save((err) => {
        if (err) {
          console.error(err);
        }
        // Create courses
        courses.forEach((course) => createCourse(course, user));

      });

    });
};

const createCourse = (template, user) => {
  const newCourse = new Course({
    title: template.title,
    description: template.description,
    courseInstances: []
  });

  newCourse.save((err, course) => {
    createCourseInstance(course, user);
  });
};

const createCourseInstance = (course, user) => {
  const randDate = Math.ceil(Math.random() * 29);
  const randMonth = 4 + Math.ceil(Math.random() * 8);
  const date = new Date();
  date.setMonth(randMonth);
  date.setDate(randDate);

  const newCourseInstance = new CourseInstance({
    date,
    members: []
  });

  newCourseInstance.save((err, courseInstance) => {
    Course.update({ _id: course._id}, { $push: { courseInstances: courseInstance } }, (err, updatedCourse) => {
      User.update({ _id: user._id}, { $push: { courses: updatedCourse } });
    });
  });
};

createHostUser();

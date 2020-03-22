const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const courseSchema = require('./course').course_schema;

const Schema = mongoose.Schema;

const user_schema = new Schema({
  email: String,
  password: String,
  displayName: String,
  role: String,
  personalInformation: {
    firstName: String,
    lastName: String,
    phone: String,
    addressA: String,
    addressB: String,
    city: String,
    zipCode: String,
    region: String,
    country: String,
  },
  courses: [ courseSchema ],
});

user_schema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('user', user_schema);

module.exports = { User, user_schema };

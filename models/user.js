const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { courseSchema } = require('./course');

const userSchema = new mongoose.Schema({
  displayName: String,
  role: String,
  emailValidated: Boolean,
  personalInformation: {
    firstName: String,
    lastName: String,
    phone: String,
    addressA: String,
    addressB: String,
    city: String,
    zipCode: String,
    country: String,
  },
  tags: [ String ],
  courses: [ courseSchema ],
});

// Setup the passport middleware for mongoDB
passportOptions = {
  usernameField: 'email',
  usernameLowerCase: true,
  lastLoginField: 'lastLogin',

};

userSchema.plugin(passportLocalMongoose, passportOptions);

const User = mongoose.model('user', userSchema);

module.exports = { User, userSchema };

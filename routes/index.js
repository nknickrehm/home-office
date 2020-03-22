const express = require('express');
const passport = require('passport');
const User = require('../models/user').User;

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { loggedIn: req.isAuthenticated() });
});

router.get('/anmelden', function(req, res, next) {
  if (req.isAuthenticated())
    res.redirect('/dashboard')
  else
    res.render('login', { loggedIn: req.isAuthenticated(), logInPage: true });
});

router.get('/impressum', function(req, res, next) {
    res.render('imprint', { loggedIn: req.isAuthenticated(), logInPage: true });
});

router.post("/anmelden", passport.authenticate("local", {
  successRedirect: "/plattform",
  failureRedirect: "/anmelden"
}));

router.get("/abmelden", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get('/registrieren', function(req, res, next) {
  if (req.isAuthenticated())
    res.redirect('/plattform')
  else
    res.render('enroll', { loggedIn: req.isAuthenticated(), logInPage: true });
});

router.post('/registrieren', (req, res, next) => {
  const { body } = req;
  const { email,
    password,
    displayName,
    firstName,
    lastName,
    phone,
    addressA,
    addressB,
    city,
    zipCode,
    region,
    country } = body;

  if (!email || !password)
    return res.redirect('/registrieren');

  const newUser = {
    email,
    displayName,
    personalInformation: {
      firstName,
      lastName,
      phone,
      addressA,
      addressB,
      city,
      region,
      country
    },
  };

  User.register(new User(newUser),
   password, (err, user) => {
   if (err) {
     console.error(err);
     return res.redirect('/registrieren');
   }

   user.personalInformation = newUser.personalInformation;
   user.displayName = displayName;

   user.save((err) => {
     console.error(err);
   });

   passport.authenticate("local")(req, res, () => {
     res.redirect("/plattform");
   });
  });
});

module.exports = router;

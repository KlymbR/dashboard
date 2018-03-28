'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/user');

router.post('/signup', (req, res, next) => {
  req.assert('firstname', 'Enter your first name.').notEmpty();
  req.assert('lastname', 'Enter your last name.').notEmpty();
  req.assert('email', 'Enter your email.').notEmpty();
  req.assert('email', 'Not a valid email.').isEmail();
  req.assert('birthdate', 'Enter your birth date.').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({
    gmail_remove_dots: false
  });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    email: req.body.email,
    username: req.body.email,
    password: req.body.password
  });
  User.findOne({
    email: req.body.email
  }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      req.flash('errors', {
        msg: 'Account with that email address already exists.'
      });
      return res.redirect('/signup');
    }
    user.save((err) => {
      if (err) {
        return next(err);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

router.post('/signin', (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({
    gmail_remove_dots: false
  });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', {
        msg: 'Success! You are logged in.'
      });
      res.redirect( /*req.session.returnTo ||*/ '/');
    });
  })(req, res, next);
});

router.post('/update', (req, res, info) => {
  var user = req.user;
  if (req.body.password) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    user.password = req.body.password;
  }
  req.assert('firstname', 'Enter your first name.').notEmpty();
  req.assert('lastname', 'Enter your last name.').notEmpty();
  req.assert('email', 'Enter your email.').notEmpty();
  req.assert('email', 'Not a valid email.').isEmail();
  req.assert('birthdate', 'Enter your birth date.').notEmpty();
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.birthdate = req.body.birthdate;
  user.save(function(err) {
    if (err) {
      next(err);
    } else {
      req.flash('success', {
        msg: 'Profile updated.'
      });
      res.redirect('/');
    }
  });
});

module.exports = router;
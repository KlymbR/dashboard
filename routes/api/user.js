'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/user');

router.post('/signup', (req, res, next) => {
  console.log('signup!!!');
  req.assert('email', 'Email is not valid').isEmail();
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
  const user =  new User({
    date: req.body.date,
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
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  var user = req.user;

  user.password = req.body.password;

  user.save(function(err) {
    if (err) {
      next(err);
    } else {
      req.flash('success', {
        msg: 'Password changed.'
      });
      res.redirect('/');
    }
  });
});

module.exports = router;
'use strict';

const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('account/login', {
        title: 'Login'
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.get('/signup', (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
      }
      res.render('account/signup', {
        title: 'Create Account'
      });
});

router.get('/forgot', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
      }
      res.render('account/forgot', {
        title: 'Forgot Password'
      });
});


module.exports = router;
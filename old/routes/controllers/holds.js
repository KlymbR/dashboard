'use strict';

const express = require('express');
const router = express.Router();

router.get('/turnOn', (req, res, next) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('holds/turnOn', {
    title: 'Activate',
    urlapi: 'localhost:3000' + '/' + 'path/free',
    user: req.user,
  });
});

module.exports = router;
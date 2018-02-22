'use strict';

const express = require('express');
const router = express.Router();

router.get('/turnOn', (req, res, next) => {
  console.log('holds');
  if (req.user) {
    return res.redirect('/');
  }
  console.log('holds2');
  res.render('holds/turnOn', {
    title: 'Activate',
    urlapi: 'localhost:3000' + '/' + 'grips',
  });
});

module.exports = router;
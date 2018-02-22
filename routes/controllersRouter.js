'use strict';

const express = require('express');
const router = express.Router();

router.use('/', require('./controllers/home'));
router.use('/', require('./controllers/login'));
router.use('/', require('./controllers/holds'));

module.exports = router;
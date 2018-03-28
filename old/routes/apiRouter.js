'use strict';

const express = require('express');
const router = express.Router();

router.use('/user', require('./api/user'));
router.use('/climbing_routes', require('./api/climbing_routes'));

module.exports = router;

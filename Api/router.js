'use strict';

const express = require('express');

const router = express.Router();

// Add headers
router.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Pass to next layer of middleware
    next();
});

router.options("/*", function (req, res) {

    // Request methods you wish to allow

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);
    res.sendStatus(200);
});

router.use('/user', require('./Routes/user'));

module.exports = router;
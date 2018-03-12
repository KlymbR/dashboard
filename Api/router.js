'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const app = require('../serverApi');


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

router.use('/sign', require('./Routes/user').before)

router.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return next({ code: 400, message: 'Failed to authenticate token.' })
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return next({ code: 403, message: 'No token provided.' })
    }
});

router.use('/user', require('./Routes/user').after);

module.exports = router;
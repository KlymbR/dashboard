'use strict';

const express = require('express');
const passport = require('passport');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


const router = express.Router();

var hashing = function (password, tempUserData, insertTempUser, callback) {
    bcrypt.genSalt(8, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            return insertTempUser(hash, tempUserData, callback);
        });
    });
};

module.exports = router;
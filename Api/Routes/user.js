'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const app = require('../../serverApi');

const routerB = express.Router();

routerB.post('/signup', (req, res, next) => {
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

    if (errors)
        return next({ code: 400, message: errors });
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
        if (err)
            return next({ code: err.code, message: err.code });
        if (existingUser)
            return next({ code: 400, message: 'Account with that email address already exists.' })
        user.save((err) => {
            if (err)
                return next({ code: err.code, message: err.code });
            res.status(200).json('Account created');
        });
    });
});

routerB.post('/signin', (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({
        gmail_remove_dots: false
    });

    const errors = req.validationErrors();

    if (errors)
        return next({ code: 400, message: errors });

    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err)
            return next({ code: err.code, message: err.code });
        else if (!user)
            return next({ code: 404, message: "User Not Found" });
        else {
            let nUser = new User();
            nUser.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if (err)
                    return next({ code: err.code, message: err.code });
                else if (!isMatch)
                    res.status(404).json("Wrong Password");
                else {
                    const payload = {
                        name: user.name,
                        email: user.email
                    };

                    var token = jwt.sign(payload, app.get('superSecret'), {
                        expiresIn: 86400 // 24h
                    });

                    res.status(200).json({
                        message: 'Log in',
                        token: token
                    });
                }
            });
        }
    });
});

const routerA = express.Router();

routerA.put('/update', (req, res, next) => {
    if (req.body.password) {
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    }

    const errors = req.validationErrors();

    if (errors)
        return next({ code: 400, message: errors });

    delete req.body.confirmPassword;
    User.findOne({
        email: req.decoded.email
    }, (err, p) => {
        if (err)
            return next(err);
        for (let item in req.body)
            p[item] = req.body[item];
        p.save(function (err) {
            if (err)
                return next({ code: 400, message: err });
            else
                res.status(200).json('success');
        });
    });
});

module.exports = {
    before: routerB,
    after: routerA
};
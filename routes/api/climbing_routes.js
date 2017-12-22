'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/climbing_routes');

// GET
router.get(function(req,res){
    ClimbingRoutes.find(function(err, climbing_routes){
        if (err){
            res.send(err);
        }
        res.json(climbing_routes);
    });
});

module.exports = router;

'use strict';

const express = require('express');
const ClimbingRoutes = require('../Models/climbingPath');

const router = express.Router();

// Get all rooms
router.get('/', function (req, res) {
    ClimbingRoutes.find({}, (err, room) => {
        if (err)
            return next({ code: 400, message: errors });
        res.send(room);
    });
});

// Get a room by id
router.get('/:roomId', function (req, res) {
    ClimbingRoutes.findOne({ room_id: req.params.roomId }, (err, room) => {
        if (err)
            return next({ code: 400, message: errors });
        res.status(200).json(room);
    });
});

module.exports = router;
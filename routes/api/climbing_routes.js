'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const ClimbingRoutes = require('../../models/climbing_routes');

// Get all rooms
router.get('', function(req, res) {
  ClimbingRoutes.find({}, (err, room) => {
      if (err) { return next(err); }
      res.send(room);
    });
});

// Get a room by id
router.get('/:roomId', function(req,res) {
  ClimbingRoutes.findOne({room_id: req.params.roomId}, (err, room) => {
      if (err) { return next(err); }
      res.send(room);
    });
});



module.exports = router;

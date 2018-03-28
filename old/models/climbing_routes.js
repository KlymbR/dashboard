var mongoose = require('mongoose');

var ClimbingRoutesSchema = new mongoose.Schema({
  room_id: {
    type: String,
    unique: true,
    required: true
  },
  route_id: {
    type: String,
    unique: true,
    required: true
  },
  route_nb: {
    type: String,
    unique: true,
    required: true
  },
  difficulty: {
    type: String,
    unique: true,
    required: true
  },
  free: {
    type: Boolean,
    unique: true,
    required: true
  },
  physio: {
    type: String,
    unique: true,
    required: true
  },
  score_pers: {
    type: [String],
    unique: true,
    required: true
  },
  score_all: [{
      id_user: {
        type: String,
        unique: true,
        required: true
      },
      score: {
        type: String,
        required: true
      }
  }]
});

const ClimbingRoutes = mongoose.model('climbing_routes', ClimbingRoutesSchema);
module.exports = ClimbingRoutes;

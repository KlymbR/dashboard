var mongoose = require('mongoose');

var ClimbingRoutesSchema = new mongoose.Schema({
  room_id: {
    type: String,
    unique: true,
    required: true
  },
  routes: [{
    id: {
      type: String,
      unique: true,
      required: true
    },
    grips: {
      type: [String],
      required: true
    }
  }]
});

const ClimbingRoutes = mongoose.model('climbing_routes', ClimbingRoutesSchema);
module.exports = ClimbingRoutes;

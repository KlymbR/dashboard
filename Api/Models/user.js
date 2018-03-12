var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  birthdate: {
    type: Date,
    unique: false,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: false,
    default: 'email',
  }
});

//authenticate input against database
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({
      email: email
    })
    .exec(function(err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        var error = new Error('User not found.');
        error.status = 401;
        return callback(error);
      }
      bcrypt.compare(password, user.password, function(err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      });
    });
};

//hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

/**
 * Helper method for validating user's password.
 */
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, password, cb) {
  bcrypt.compare(candidatePassword, password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
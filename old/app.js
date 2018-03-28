'use strict';

const express = require('express');
const session = require('express-session');
const compression = require('compression');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const expressValidator = require('express-validator');
const flash = require('express-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const sass = require('node-sass-middleware');
const path = require('path');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');
const roomConfig = require('./config/room');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/klymbr', {
  useMongoClient: true
});
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'work hard',
  store: new MongoStore({
    url: process.env.MONGODB_URI || 'mongodb://localhost/klymbr',
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
    req.path === '/account') {
    req.session.returnTo = req.path;
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Controllers router
 */
app.use('/', require('./routes/controllersRouter'));
/**
 * Apis router
 */
app.use('/api', require('./routes/apiRouter'));
/**
 * Error handler
 */
// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use((err, req, res, next) => {
  res.status(500).send(err.response || 'Something broke!');
});

/**
 * Start Express server.
 */
if (module === require.main) {
  // Start the server
  const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}

module.exports = app;
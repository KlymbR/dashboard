'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


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
 * Apis router
 */
app.use('/', require('./Api/router'));

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
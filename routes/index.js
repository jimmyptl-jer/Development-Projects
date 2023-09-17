const express = require('express');
const router = express.Router(); // You missed the () to create an instance of Router

const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = (params) => {

  // Define a route for the root URL ('/') and render an EJS template
  router.get('/', (req, res) => {
    res.render('pages/index', { pageTitle: "Welcome" });
  });

  // Use the speakerRoute for '/speakers'
  router.use('/speakers', speakerRoute(params));

  // Use the feedbackRoute for '/feedback'
  router.use('/feedback', feedbackRoute(params));

  return router;
}
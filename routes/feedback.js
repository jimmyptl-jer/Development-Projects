const express = require('express');
const router = express.Router;

const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback')

module.exports = (params) => {

  const {feedbackService} = params;

  // Define a route for the root URL ('/') and render an EJS template
  router.get('/', async (req, res) => {
    const feedback = await feedbackService.getList();
    return res.json(feedback);
  });

  router.post('/', (req, res) => {
    return res.send(`Feedback form posted`)
  });

  return router;

}


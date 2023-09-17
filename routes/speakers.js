const express = require('express');
const router = express.Router;

module.exports = (params) => {

  const {speakersService} = params

  // Define a route for the root URL ('/') and render an EJS template
  router.get('/',async (req, res) => {
    const speakers = await speakersService.getList();
    return res.json(speakers);
  });

  router.get('/:shortname', (req, res) => {
    return res.send(`Feedback posted by ${req.params.shortname}`)
  });

  return router;

}


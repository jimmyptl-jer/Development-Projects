// Import necessary modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Import your custom routes module
const routes = require('./routes');


const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

// Configure the view engine as EJS and set the views directory
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, './views')); // Set the views directory

// Use the custom routes module as middleware for the root URL ('/')
app.use('/',
    routes({
        feedbackService,
        speakersService
    }));

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, 'static')));

// Set the port for the Express server
const port = 3000;

// Start the Express server and listen on the specified port
app.listen(port, () => {
    console.log(`Express server listening on port ${port}!`);
}).on('error', (err) => {
    console.error(`Server error: ${err.message}`);
});

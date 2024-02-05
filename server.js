const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(cors({
    origin: ['https://lvlivingston.com', 'https://www.lvlivingston.com', 'https://yogawithleah.com', 'https://www.yogawithleah.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // or the methods you're using
    allowedHeaders: ['Content-Type', 'Authorization'] // or the headers you're using
}));

app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'lotus-black.png')));
app.use(express.static(path.join(__dirname, 'build')));

const port = process.env.PORT || 3001;

// API routes
app.use('/subscribers', require('./routes/api/subscribers'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get(/^(?!\/api\/).*/, function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
    console.log(`Express app running on port ${port}`);
});
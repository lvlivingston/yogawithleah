const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        // Check if the request origin is in the list of allowed origins
        const allowedOrigins = ['localhost:3000', 'https://lvlivingston.com', 'https://www.lvlivingston.com', 
        'https://yogawithleah.com', 'https://www.yogawithleah.com', 'https://yogawithleah.vercel.app/', 
        'https://yogawithleah-git-main-leahs-projects-b3161619.vercel.app/', 'https://yogawithleah.vercel.app/routes/api/subscribers', 'https://www.yogawithleah.vercel.app/routes/api/subscribers'];
        if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost')) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // or the methods you're using
    // allowedHeaders: ['Content-Type', 'Authorization'] // or the headers you're using
    maxAgeSeconds: 3600,
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
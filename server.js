const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

const port = process.env.PORT || 3001;

// API routes
app.use('/api/subscribe', require('./routes/api/subscribe'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get(/^(?!\/api\/).*/, function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
    console.log(`Express app running on port ${port}`);
});
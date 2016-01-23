var express = require('express');
var app = express();
var mongoose = require('mongoose');

var config = require('./server/config.js');

// Configuration
var port = process.env.PORT || config.defaultPort;
mongoose.connect(config.mongoURI);

// Log the status of the database connection
var db = mongoose.connection;
db.on('error', (err) => console.log('connection error:', err));
db.once('open', () => console.log('MongoDB connection is open'));

// Add middleware
require('./server/middleware.js')(app);

// Simple Routing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

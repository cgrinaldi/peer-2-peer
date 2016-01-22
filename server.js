var express = require('express');
var app = express();
var morgan = require('morgan');

var config = require('./server/config.js');

// Configuration
var port = process.env.PORT || config.defaultPort;

// Add middleware
app.use(morgan('dev'));

// Simple Routing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

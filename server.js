var express = require('express');
var app = express();

var config = require('./server/config.js');

// Configuration
var port = process.env.PORT || config.defaultPort;

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

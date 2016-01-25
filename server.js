var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
require('./server/helpers/realtime.js')(io, app); // setup io and track connectedClients
var mongoose = require('mongoose');
var config = require('./server/config.js');

// Setup database connection and log status
mongoose.connect(config.mongoURI);
var db = mongoose.connection;
db.on('error', (err) => console.log('connection error:', err));
db.once('open', () => console.log('MongoDB connection is open'));

// Configuration
var proxy = httpProxy.createProxyServer();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : config.defaultPort;
var clientPath = path.resolve(__dirname, 'client');

// Add middleware and routing
app.use(express.static(clientPath));
require('./server/middleware.js')(app);

// We only want to run the workflow when not in production
if (!isProduction) {
  var bundle = require('./server/bundle.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

// Catch any errors in the bundling process
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

// Start the server
server.listen(port, function () {
  console.log(`Server is running at http://localhost:${port}`);
});

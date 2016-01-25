module.exports = function(io, app) {
  // SocketIO stuff
  var connectedClients = {};
  io.on('connection', (client) => {
    console.log('Client connected...');

    // Inform all clients when new user logs in and tracks in hash
    client.on('join', (email) => {
      connectedClients[email] = client;
      console.log('user with email', email, 'joined');
      client.broadcast.emit('newUser', email);
      console.log('connected clients are', connectedClients);
    });

    // Inform all clients when a user logs out and remove from hash
    client.on('leave', (email) => {
      console.log('user with email', email, 'just left');
      delete connectedClients[email];
      client.broadcast.emit('userLeft', email);
      console.log('connected clients are', connectedClients);
    });
  });

  app.set('connectedClients', connectedClients);
}

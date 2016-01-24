export default function (socket) {
  socket.on('connect', function(data) {
    socket.emit('join', 'Hello World from client');
  });

  socket.on('messages', function(messages) {
    console.log('the message is', messages);
  });
}

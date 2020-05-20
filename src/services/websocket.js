import socketio from 'socket.io-client';

const socket = socketio('http://206.189.236.188', {
  autoConnect: false,
  forceNode: true,
});

function connect(user) {
  socket.io.opts.query = user;
  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, socket };

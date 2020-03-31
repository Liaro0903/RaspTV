const server = require('http').createServer();
const io = require('socket.io')(server);
const db = require('./db');

let active = db[0].url;
let power = false;

io.on('connection', (socket) => {
  socket.on('getChannels', () => {
    socket.emit('channels', db);
  });
  socket.on('getActive', () => {
    socket.emit('active', active);
  });
  socket.on('setActive', (new_active) => {
    active = new_active;
    socket.emit('active', active);
    socket.broadcast.emit('active', active);
  });
  socket.on('getPower', () => {
    socket.emit('power', power);
  });
  socket.on('setPower', (new_power) => {
    power = new_power;
    socket.emit('power', power);
    socket.broadcast.emit('power', power);
  })
});

const port = 3001;
server.listen(port, '192.168.1.8');
console.log('listening on port', port);
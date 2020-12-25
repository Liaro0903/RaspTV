import express from 'express';
import * as http from 'http';
import * as path from 'path';
import { Server, Socket } from 'socket.io';

import { db } from './db';

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const webClient = path.join(__dirname, '../../Frontend/build');
app.use(express.static(webClient));
app.get('*', (_req, res) => {
  res.sendFile(path.join(webClient, 'index.html'));
});

let activeURL = db[0].url;
let power = false;

io.on('connection', (socket: Socket) => {
  socket.on('getChannels', () => {
    socket.emit('channels', db);
  });
  socket.on('getActiveURL', () => {
    socket.emit('activeURL', activeURL);
  });
  socket.on('setActiveURL', (new_active: string) => {
    activeURL = new_active;
    io.emit('activeURL', activeURL);
  });
  socket.on('getPower', () => {
    io.emit('power', power);
  });
  socket.on('setPower', (new_power: boolean) => {
    power = new_power;
    io.emit('power', power);
  });
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
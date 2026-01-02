
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', socket => {
  socket.on('join-room', room => {
    socket.join(room);
    socket.to(room).emit('user-joined', socket.id);
  });

  socket.on('signal', data => {
    socket.to(data.room).emit('signal', data);
  });
});

app.get('/health', (_, res) => res.json({ ok: true }));
server.listen(5000, () => console.log("Backend running on 5000"));

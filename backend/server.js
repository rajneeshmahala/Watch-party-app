
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { joinRoom, leaveRoom } = require("./rooms");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", socket => {
  socket.on("join-room", roomId => {
    if (!joinRoom(roomId, socket.id)) return socket.emit("room-full");
    socket.join(roomId);
  });

  socket.on("sync", d => socket.to(d.room).emit("sync", d));
  socket.on("chat", d => socket.to(d.room).emit("chat", d));

  socket.on("disconnecting", () => {
    socket.rooms.forEach(r => leaveRoom(r, socket.id));
  });
});

server.listen(5000);


const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors:{origin:"*"}});
io.on("connection",()=>console.log("user connected"));
server.listen(5000,()=>console.log("backend on 5000"));

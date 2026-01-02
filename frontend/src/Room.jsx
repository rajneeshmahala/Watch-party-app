
import { io } from "socket.io-client";
import VideoPlayer from "./VideoPlayer";
import WebRTC from "./WebRTC";
import Chat from "./Chat";

const socket = io("http://localhost:5000");
socket.emit("join-room","demo");

export default () => (
  <>
    <VideoPlayer socket={socket} room="demo" />
    <WebRTC />
    <Chat socket={socket} room="demo" />
  </>
);

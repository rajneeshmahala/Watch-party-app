
import { io } from "socket.io-client";
import VideoPlayer from "./VideoPlayer";
import Chat from "./Chat";
import WebRTC from "./WebRTC";

const socket = io("http://localhost:5000");
const roomId = "demo-room";
socket.emit("join-room", roomId);

export default function Room() {
  return (
    <div>
      <h2>Watch Party (3–5 Users)</h2>
      <VideoPlayer socket={socket} room={roomId} />
      <WebRTC />
      <Chat socket={socket} room={roomId} />
    </div>
  );
}

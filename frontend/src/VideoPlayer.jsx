
import { useRef, useEffect } from "react";

export default function VideoPlayer({ socket, room }) {
  const ref = useRef();

  useEffect(() => {
    socket.on("sync", d => {
      if (d.type === "play") ref.current.play();
      if (d.type === "pause") ref.current.pause();
      if (d.type === "seek") ref.current.currentTime = d.time;
    });
  }, []);

  const emit = type => socket.emit("sync", {
    room, type, time: ref.current.currentTime
  });

  return (
    <video ref={ref} width="600" controls
      onPlay={()=>emit("play")}
      onPause={()=>emit("pause")}
      onSeeked={()=>emit("seek")}
    />
  );
}

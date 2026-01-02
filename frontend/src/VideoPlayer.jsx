
import { useRef, useEffect } from "react";
export default ({ socket, room }) => {
  const ref = useRef();
  useEffect(()=>{
    socket.on("sync", d=>{
      if(d.type==="play") ref.current.play();
      if(d.type==="pause") ref.current.pause();
      if(d.type==="seek") ref.current.currentTime=d.time;
    });
  },[]);
  const emit = t => socket.emit("sync",{room,type:t,time:ref.current.currentTime});
  return <video ref={ref} controls width="600"
    onPlay={()=>emit("play")}
    onPause={()=>emit("pause")}
    onSeeked={()=>emit("seek")} />;
};

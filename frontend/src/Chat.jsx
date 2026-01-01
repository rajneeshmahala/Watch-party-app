
import { useState, useEffect } from "react";

export default function Chat({ socket, room }) {
  const [msg, setMsg] = useState("");
  const [list, setList] = useState([]);

  useEffect(()=>{
    socket.on("chat", d => setList(l=>[...l,d.message]));
  },[]);

  const send = () => {
    socket.emit("chat",{room,message:msg});
    setList(l=>[...l,msg]);
    setMsg("");
  };

  return (
    <div>
      {list.map((m,i)=><div key={i}>{m}</div>)}
      <input value={msg} onChange={e=>setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}

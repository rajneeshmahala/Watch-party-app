
import { useState, useEffect } from "react";
export default ({socket,room})=>{
  const [m,setM]=useState("");
  const [l,setL]=useState([]);
  useEffect(()=>socket.on("chat",d=>setL(x=>[...x,d.message])),[]);
  return (
    <>
      {l.map((x,i)=><div key={i}>{x}</div>)}
      <input value={m} onChange={e=>setM(e.target.value)}/>
      <button onClick={()=>{socket.emit("chat",{room,message:m});setL([...l,m]);setM("");}}>Send</button>
    </>
  );
};


import { useEffect, useRef } from "react";
export default ()=>{
  const v = useRef();
  useEffect(()=>{
    navigator.mediaDevices.getUserMedia({video:true,audio:true})
      .then(s=>v.current.srcObject=s);
  },[]);
  return <video ref={v} autoPlay muted width="200"/>;
};

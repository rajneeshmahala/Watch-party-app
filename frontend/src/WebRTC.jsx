
import { useEffect, useRef, useState } from "react";

export default function WebRTC() {
  const videoRef = useRef();
  const cam = useRef();
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video:true,audio:true })
      .then(s => {
        cam.current = s;
        videoRef.current.srcObject = s;
      });
  }, []);

  const share = async () => {
    const s = await navigator.mediaDevices.getDisplayMedia({ video:true });
    videoRef.current.srcObject = s;
    setSharing(true);
    s.getVideoTracks()[0].onended = stop;
  };

  const stop = () => {
    videoRef.current.srcObject = cam.current;
    setSharing(false);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="200" />
      {!sharing ? <button onClick={share}>Share Screen</button>
                : <button onClick={stop}>Stop Share</button>}
    </div>
  );
}

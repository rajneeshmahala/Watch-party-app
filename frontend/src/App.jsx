
import React, { useEffect, useRef } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')
const ROOM = 'room1'

export default function App() {
  const localVideo = useRef()
  const remoteVideo = useRef()
  const peer = useRef()
  const localStream = useRef()

  useEffect(() => {
    socket.emit('join-room', ROOM)

    socket.on('signal', async data => {
      if (!peer.current) createPeer()
      if (data.sdp) {
        await peer.current.setRemoteDescription(data.sdp)
        if (data.sdp.type === 'offer') {
          const ans = await peer.current.createAnswer()
          await peer.current.setLocalDescription(ans)
          socket.emit('signal',{room:ROOM,sdp:ans})
        }
      }
      if (data.candidate) {
        await peer.current.addIceCandidate(data.candidate)
      }
    })

    startCamera()
  }, [])

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true})
    localStream.current = stream
    localVideo.current.srcObject = stream
    createPeer(stream)
  }

  const shareScreen = async () => {
    const screen = await navigator.mediaDevices.getDisplayMedia({video:true,audio:true})
    replaceTrack(screen.getVideoTracks()[0])
    screen.getVideoTracks()[0].onended = () =>
      replaceTrack(localStream.current.getVideoTracks()[0])
  }

  const replaceTrack = track => {
    const sender = peer.current.getSenders().find(s=>s.track.kind==='video')
    sender.replaceTrack(track)
  }

  const createPeer = (stream = localStream.current) => {
    peer.current = new RTCPeerConnection({
      iceServers:[{urls:'stun:stun.l.google.com:19302'}]
    })

    stream.getTracks().forEach(t=>peer.current.addTrack(t,stream))

    peer.current.ontrack = e => remoteVideo.current.srcObject = e.streams[0]
    peer.current.onicecandidate = e => e.candidate &&
      socket.emit('signal',{room:ROOM,candidate:e.candidate})

    peer.current.createOffer().then(o=>{
      peer.current.setLocalDescription(o)
      socket.emit('signal',{room:ROOM,sdp:o})
    })
  }

  return (
    <div>
      <h2>Watch Party (VC + Screen Share)</h2>
      <video ref={localVideo} autoPlay muted width="300"/>
      <video ref={remoteVideo} autoPlay width="300"/>
      <br/>
      <button onClick={shareScreen}>Share Movie Screen</button>
    </div>
  )
}

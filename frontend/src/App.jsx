
import React, { useEffect, useRef } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

export default function App() {
  const videoRef = useRef()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream
      })

    socket.emit('join-room', 'room1')
  }, [])

  return (
    <div>
      <h2>Watch Party VC</h2>
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  )
}

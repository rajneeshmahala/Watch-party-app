
# Watch Party App (VC Enabled)

## Requirements
- Ubuntu 22.04 / 24.04
- Docker + Docker Compose

## Run
docker compose up --build

## Access
Frontend: http://SERVER_IP:3000  
Backend: http://SERVER_IP:5000/health

## Features
- Video call (WebRTC base)
- Socket.IO signaling
- Docker deployable
- React production build

NOTE:
For watching movies together, use screen-share in browser.
For public internet VC, add TURN server (coturn).


# 🎬 WatchParty – 3–5 Users (Video Sync + VC + Screen Share)

A TwoSeven-like Watch Party app using **Node.js + React + WebRTC**.

## Features
- Video sync (play/pause/seek)
- Video & voice call
- Screen sharing
- Text chat
- Max 5 users per room (hard limit)
- Dockerized

## Prerequisites
- Ubuntu 20.04+
- Docker & Docker Compose
- Open ports: 3000, 5000, 443

## Setup (Server)
```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable docker --now
```

## Run App
```bash
docker compose up --build -d
```

Open:
http://SERVER-IP:3000

## HTTPS
WebRTC requires HTTPS in production.
Use Nginx + Let's Encrypt or Cloudflare Tunnel.

## Folder Structure
backend/  -> Node.js backend
frontend/ -> React frontend

## Notes
- Legal: no video re-streaming
- Optimized for small private rooms

Happy Watching 🎉

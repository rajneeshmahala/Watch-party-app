
const rooms = {};
const MAX_USERS = 5;

function joinRoom(roomId, socketId) {
  if (!rooms[roomId]) rooms[roomId] = [];
  if (rooms[roomId].length >= MAX_USERS) return false;
  rooms[roomId].push(socketId);
  return true;
}

function leaveRoom(roomId, socketId) {
  if (!rooms[roomId]) return;
  rooms[roomId] = rooms[roomId].filter(id => id !== socketId);
  if (rooms[roomId].length === 0) delete rooms[roomId];
}

module.exports = { joinRoom, leaveRoom };

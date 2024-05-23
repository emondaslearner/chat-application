const { Server } = require("socket.io");

const socketConnection = (server) => {
  const io = new Server(server);
};

module.exports = socketConnection;

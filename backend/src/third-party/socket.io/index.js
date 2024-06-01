const { Server } = require("socket.io");
const { authentication } = require("./middleware");

const socketConnection = (server) => {
  const io = new Server(server);

  io.use(authentication);

  io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);

    if (socket?.user?.id) {
      socket.join(socket?.user?.id);
    }

    io.on("disconnect", async () => {
      console.log(`A user disconnected ${socket.id}`);
    });
  });

  global.io = io;
};

module.exports = socketConnection;

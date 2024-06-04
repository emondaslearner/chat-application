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

    // sent message to user
    socket.on("sentMessage", (message) => {
      io.to(message.id).emit("newMessage", message);
    });

    io.on("disconnect", async () => {
      console.log(`A user disconnected ${socket.id}`);
    });
  });

  global.io = io;
};

module.exports = socketConnection;

import { Server } from "socket.io";

const socketConnection = (server) => {
  const io = new Server(server);
};

export default socketConnection;

import { io } from "socket.io-client";

let socketInstance: any = null;

export const initializeSocket = (token: any) => {
  if (!socketInstance) {
    socketInstance = io("ws://localhost:6500", {
      extraHeaders: {
        Authorization: token,
      },
    });
  }
  return socketInstance;
};

export const getSocket = () => {
  if (!socketInstance) {
    throw new Error("Socket has not been initialized.");
  }
  return socketInstance;
};

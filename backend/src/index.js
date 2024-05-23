import "dotenv/config";
import "module-alias/register.js";
import app from "./app.js";
import http from "http";
import { connectDb, connectRedis } from "./db/index.js";
import socketConnection from "./third-party/socket.io/index.js";

const port = 6500 || process.env.PORT;
const server = http.createServer(app);

const main = async () => {
  try {
    await connectRedis();
    await connectDb();

    // socket connection
    await socketConnection(server);

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();

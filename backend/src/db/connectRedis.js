import { createClient } from "redis";

const client = createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

const connection = async () => {
  try {
    await client.connect();
    console.log("Connected to redis");
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
};

export default connection;

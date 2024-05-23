import mongoose from "mongoose";

let connectionUrl = process.env.DB_CONNECTION_URL;
connectionUrl = connectionUrl.replace("<username>", process.env.DB_USERNAME);
connectionUrl = connectionUrl.replace("<password>", process.env.DB_PASSWORD);

const connection = async (status) => {
  await mongoose.connect(connectionUrl, { dbName: process.env.DB_NAME });
  console.log("Database Connected");
};

export default connection;

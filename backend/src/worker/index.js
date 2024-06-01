const { parentPort } = require("worker_threads");
const { addPost } = require("./addPostFileHandler");
const { connectDb } = require("../db");

(async () => {
  await connectDb('worker');
})();

parentPort.on("message", async (allData) => {
  if (allData.status === "addPost") {
    try {
      const data = JSON.parse(allData.data);
      const savedData = await addPost(data, allData.io);
    } catch (err) {
      console.log(err);
    }
  }
});

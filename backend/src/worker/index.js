const { parentPort } = require("worker_threads");
const { addPost } = require("./addPostFileHandler");
const { connectDb } = require("../db");
const { sentMessageToTopic } = require("../third-party/firebase");
(async () => {
  await connectDb("worker");
})();

parentPort.on("message", async (allData) => {
  if (allData.status === "addPost") {
    try {
      const data = JSON.parse(allData.data);
      const savedData = await addPost(data, allData.io);
      if (savedData) {
        await sentMessageToTopic({
          topic: data.userId,
          title: "Post status updated",
          body: `"Post uploaded successfully"`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

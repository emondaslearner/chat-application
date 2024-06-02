const { parentPort } = require("worker_threads");
const { addPost } = require("./uploadFile/addPostFileHandler");
const { updatePost } = require("./uploadFile/updatePostFileHandler");
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

  if (allData.status === "updatePost") {
    try {
      const data = JSON.parse(allData.data);
      const savedData = await updatePost(data, allData.io);
      if (savedData) {
        await sentMessageToTopic({
          topic: data.userId,
          title: "Post status updated",
          body: `"Post updated successfully"`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

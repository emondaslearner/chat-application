const { getClient } = require("@db/connectRedis");

const client = getClient();

const addDataInRedis = async ({ key, value }) => {
  const result = await client.set(key, value, "EX", 300);

  return result ? true : false;
};

const getDataFromRedis = async (key, query) => {
  let value = await client.get(key);

  if (!value) {
    console.log("cache miss");
    const data = await query();
    if (data[0].allFriends.length === 0) return data;

    value = JSON.stringify(data);
    await addDataInRedis({ key, value });
  } else {
    console.log("cache hit");
  }

  return JSON.parse(value);
};

const deleteKeysWithPrefix = async (prefix) => {
  try {
    const keys = await client.keys(`${prefix}*`);
    const pipeline = client.multi();

    keys.forEach((key) => pipeline.del(key));

    await pipeline.exec();

    console.log("All keys starting with 'friend:' deleted successfully!");
  } catch (error) {
    console.error("Error deleting keys:", error);
  }
};

module.exports = {
  getDataFromRedis,
  addDataInRedis,
  deleteKeysWithPrefix,
};

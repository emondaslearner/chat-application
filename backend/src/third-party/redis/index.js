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
    value = JSON.stringify(data);

    await addDataInRedis({ key, value });
  } else {
    console.log("cache hit");
  }

  return JSON.parse(value);
};

module.exports = {
  getDataFromRedis,
  addDataInRedis,
};

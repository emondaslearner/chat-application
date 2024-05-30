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

const deleteKeysWithPrefix = async (prefix) => {
  return new Promise((resolve, reject) => {
    const stream = client.scanStream({
      match: `${prefix}*`,
    });

    stream.on("data", (keys) => {
      if (keys.length) {
        const pipeline = client.batch();
        keys.forEach((key) => {
          pipeline.del(key);
        });
        pipeline.exec((err, results) => {
          if (err) {
            reject(err);
          } else {
            console.log(`Deleted keys: ${keys.join(", ")}`);
          }
        });
      }
    });

    stream.on("end", () => {
      resolve();
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = {
  getDataFromRedis,
  addDataInRedis,
  deleteKeysWithPrefix,
};

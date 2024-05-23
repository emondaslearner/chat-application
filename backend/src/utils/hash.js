const bcrypt = require("bcryptjs");
const { badRequest } = require("./error");

const generateHash = async (value) => {
  if (!value) {
    throw badRequest("Hash value is empty");
  }

  const hashedValue = await bcrypt.hash(value, 10);

  return hashedValue;
};

module.exports = { generateHash };

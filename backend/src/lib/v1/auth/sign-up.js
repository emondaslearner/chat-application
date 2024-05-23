const { createUser } = require("@lib/v1/user");
const { error } = require("@utils");
const { generateToken } = require("@third-party/token");

const signUp = async (data) => {
  const savedData = await createUser(data);

  if (!savedData) throw error.serverError();

  const accessToken = await generateToken({
    data: {
      id: savedData._id,
    },
    expireAt: process.env.ACCESS_EXPIRE_TIME,
  });

  const refreshToken = await generateToken({
    data: {
      long: "long-token",
    },
  });

  const token = `Bearer ${accessToken} ${refreshToken}`;

  return { token, savedData };
};

module.exports = signUp;

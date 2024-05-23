const { error, hash } = require("@utils");
const User = require("@models/User");
const { generateToken } = require("@third-party/token");

const signIn = async ({ email, password }) => {
  if (!email || !password) {
    throw error.badRequest(
      `${!email && "email:email is required"}|${
        !password && "password:password is empty"
      }`
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw error.badRequest("Information invalid");
  }

  const isPasswordCorrect = await hash.verifyHash(password, user._doc.password);

  if (!isPasswordCorrect) {
    throw error.badRequest("Information invalid");
  }

  const accessToken = await generateToken({
    data: {
      id: user._id,
    },
    expireAt: process.env.ACCESS_EXPIRE_TIME,
  });

  const refreshToken = await generateToken({
    data: {
      long: "long-token",
    },
  });

  const token = `Bearer ${accessToken} ${refreshToken}`;

  return { token, userData: user };
};

module.exports = signIn;

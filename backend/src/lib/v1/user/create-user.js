const { error } = require("@utils");
const User = require("@models/User");
const { hash } = require("@utils");

const createUser = async ({ name, email, password, dateOfBirth }) => {
  if (!name || !email || !password || !dateOfBirth) {
    throw error.badRequest(
      `${!name && "name:name is empty"}|${!email && "email:email is empty"}|${
        !password && "password:password is empty"
      }|${!dateOfBirth && "dateOfBirth:dateOfBirth is empty"}`
    );
  }

  const date = new Date(dateOfBirth);

  if (isNaN(date.getTime())) {
    throw error.badRequest("dateOfBirth:dateOfBirth is not a valid date");
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw error.badRequest("email:email already exist");
  }

  // hash password
  const hashedPassword = await hash.generateHash(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    date_of_birth: date,
  });

  const data = await user.save();

  return data;
};

module.exports = createUser;

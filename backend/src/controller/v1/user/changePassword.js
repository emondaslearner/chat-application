const { changePassword: changePasswordLib } = require("./changePassword");

const changePassword = async (req, res, next) => {
  try {
    await changePasswordLib({
      currentPassword: req.body?.currentPassword,
      password: req.body?.password,
      userId: req.user.id,
    });

    const response = {
      code: 200,
      message: "Changed password successfully",
      self: req.url,
    };

    res.status(response.code).json(response);
  } catch (err) {
    next();
  }
};

module.exports = changePassword;

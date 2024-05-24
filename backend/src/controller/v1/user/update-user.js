const { updateUser: updateUserLib } = require("@lib/v1/user");

const updateUser = async (req, res, next) => {
  try {
    const data = {
      dateOfBirth: req.body.dateOfBirth,
      name: req.body.name,
      email: req.body.email,
      date_of_birth: req.body.dateOfBirth,
      bio: req.body.bio,
      status: req.body.status,
      address: {
        city: req.body.city,
        country: req.body.country,
      },
    };

    const updatedData = await updateUserLib({ data });

    const responseData = {
      code: 200,
      message: "User updated successfully",
      data: updatedData,
      self: req.url,
      links: {
        user: `/user/${updatedData._id}`,
      },
    };

    res.status(200).json(responseData);
  } catch (err) {
    next(err);
  }
};

module.exports = updateUser;

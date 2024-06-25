const {
  getSingleRequest: getSingleRequestLib,
} = require("@lib/v1/friendRequest");

const getSingleRequest = async (req, res, next) => {
  try {
    const data = await getSingleRequestLib({
      sent_to: req.query?.sent_to,
      sent_by: req.query?.sent_by,
    });

    const response = {
      code: 200,
      message: "Fetched request successfully",
      data,
      self: req.url,
    };

    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = getSingleRequest;

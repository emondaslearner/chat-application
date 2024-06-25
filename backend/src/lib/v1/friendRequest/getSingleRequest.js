const FriendRequest = require("@models/FriendRequest");
const { error } = require("@utils");

const getSingleRequest = async ({ sent_to, sent_by }) => {
  if (!sent_to || !sent_by) {
    throw error.badRequest(
      `${!sent_to && "sent_to:sent_to field is missing"}|${
        !sent_by && "sent_to:sent_by field is missing"
      }`
    );
  }

  const data = await FriendRequest.findOne({ sent_by, sent_to });

  if (!data) {
    throw error.notFound();
  }

  return data;
};

module.exports = getSingleRequest;

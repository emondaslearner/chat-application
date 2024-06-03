const { error } = require("@utils");
const Message = require("@models/Message");

const deleteMessage = async ({ id, status, userId }) => {
  if (!id || !status || !userId) {
    throw error.badRequest(
      `${!id && "!id:id is missing"}|${!status && "status:status is missing"}|${
        !userId && "userId:userId is missing"
      }`
    );
  }

  const filter = { _id: id };

  if (status === "deleteForEveryOne") filter.sent_by = userId;
  else {
    filter.$or = [{ sent_by: userId }, { sent_to: userId }];
  }

  const findMessage = await Message.findOne(filter);

  if (!findMessage) {
    throw error.notFound();
  }

  if (status === "deleteForEveryOne") {
    await Message.findOneAndDelete(filter);
  } else if (!findMessage?.deleted_for) {
    findMessage.deleted_for = userId;

    await findMessage.save();
  } else {
    await Message.findOneAndDelete(filter);
  }

  return true;
};

module.exports = deleteMessage;

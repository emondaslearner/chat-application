const Friend = require("@models/Friend");
const {error} = require('@utils');

const addFriend = async ({ friendId, userId }) => {
    if(!friendId) {
        throw error.badRequest('friendId:friendId not provided');
    }

    const friendData = new Friend({
        first_user: userId,
        second_user: friendId
    });

    await friendData.save();

    return friendData
};

module.exports = addFriend;

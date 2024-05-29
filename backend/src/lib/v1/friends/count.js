const Friend = require("@models/Friend");

const countFriends = async (query) => {
    const counts = await Friend.countDocuments(query);

    return counts;
}

module.exports = countFriends;
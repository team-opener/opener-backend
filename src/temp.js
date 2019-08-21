module.exports = async () => {
    const User = require('../model/user');

    const members = await User.find({});
        members[3].entryTime = null;
        members[3].exitTime = null;
        await members[3].save();
}
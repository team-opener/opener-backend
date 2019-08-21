const User = require('../model/user');

module.exports = async ([name, profileImgPath, course]) => {
    const user = await User.create({name, profileImgPath, course});
    await user.save();
    console.log(`${name} is saved`);
    return;
}
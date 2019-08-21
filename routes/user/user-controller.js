const User = require('../../model/user');

module.exports = {
    getInfo : async (request, response, next) => {
        try {
            const name = request.query.name;
            const info = await User.findOneByName(name);
            response.send(info);
        } catch(error) {
            next(error);
        }
    },

    getInfoAll : async (request, response, next) => {
        try {
            const members = await User.findAllMembersEntered();
            const data = members.reduce((acc, currentValue) => {
                acc.push(currentValue);
                return acc;
            }, []);
            response.send(JSON.stringify(data));
        } catch(error) {
            next(error);
        }
    }
}
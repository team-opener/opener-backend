const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const User = new Schema({
    name: {
        type: String,
        required: true
    },

    profileImgPath: {
        type: String,
        unique: true,
        default: null
    },

    course: {
        type: String,
        required: true
    },

    entryTime: {
        type: String,
        default: null
    },

    exitTime: {
        type: String,
        default: null
    },

    entryLog: {
        type: String,
        default: '{}'
    }
});

User.statics.create = async function ({ name, profileImgPath, course }) {
        return user = new this({ name, profileImgPath, course });
}

User.statics.findOneByName = function(name) {
    return this.findOne({
        name
    }).exec()
}

User.statics.findAllMembersEntered= function() {
    return this.find({
        entryTime: /.+/
    }).exec()
}

module.exports = mongoose.model('User', User);
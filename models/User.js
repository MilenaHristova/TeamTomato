/**
 * Created by Milena on 02/04/2017.
 */

const mongoose = require('mongoose');
const encryption = require('./../utilities/encryption');

let userSchema = mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        passwordHash: {type: String, required: true},
        salt: {type: String, required: true},
        userInfo: {type:mongoose.Schema.ObjectId, ref:'UserInfo'}
    }
);

userSchema.method ({
    authenticate: function (password) {
        let inputPasswordHash = encryption.hashPassword(password, this.salt);
        let isSamePasswordHash = inputPasswordHash === this.passwordHash;

        return isSamePasswordHash;
    },
    isAuthor: function (info) {
        if (!info) {
            return false;
        }
        let isAuthor = info.user.equals(this.user.id);
        return isAuthor;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

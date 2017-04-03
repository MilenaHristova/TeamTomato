/**
 * Created by Milena on 02/04/2017.
 */

const mongoose = require('mongoose');
const encryption = require('./../utilities/encryption');

let userSchema = mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        passwordHash: {type: String, required: true},
        email: {type: String, required: true},
        score: {type:Number, default:0},
        salt: {type: String, required: true}
    }
);

userSchema.method ({
    authenticate: function (password) {
        let inputPasswordHash = encryption.hashPassword(password, this.salt);
        let isSamePasswordHash = inputPasswordHash === this.passwordHash;

        return isSamePasswordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

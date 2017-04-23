/**
 * Created by Milena on 07/04/2017.
 */

const mongoose = require('mongoose');

let infoSchema = mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        email: {type: String, required: true},
        description: {type:String},

    }
);

const UserInfo = mongoose.model('UserInfo', infoSchema);
module.exports = UserInfo;
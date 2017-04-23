/**
 * Created by Milena on 07/04/2017.
 */

const mongoose = require('mongoose');

let infoSchema = mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        score: {type:Number, default:0},
        email: {type: String, required: true},
        description: {type:String},
        place: {type:Number}
    }
);

const UserInfo = mongoose.model('UserInfo', infoSchema);
module.exports = UserInfo;
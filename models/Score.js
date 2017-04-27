/**
 * Created by Milena on 23/04/2017.
 */

const mongoose = require('mongoose');
let scoreSchema = mongoose.Schema(
    {
        score: {type:Number},
        user: {type:mongoose.Schema.ObjectId, ref:'User'}
    }
);

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
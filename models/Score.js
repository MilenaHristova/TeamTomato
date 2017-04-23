/**
 * Created by Milena on 23/04/2017.
 */

const mongoose = require('mongoose');
let scoreSchema = mongoose.Schema(
    {
        score: {type:Number},
        place: {type:Number},
        user: {type:mongoose.Schema.ObjectId, ref:'User'}
    }
);
scoreSchema.method({
    update: function (playerScore) {
        let scores = [];
        Score.find({score:{$exists : true}}).sort({score:-1}).populate('user').then(users => {
            for(user of users){
                scores.add(user);
            }
        })
        for(s of scores){
            if(s.user == playerScore.user){
                playerScore.place = scores.indexOf(s);
            }
        }

    }
})
const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
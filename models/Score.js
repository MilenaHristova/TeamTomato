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
    update: function (currentUserScore) {
        let scores = [];
        Score.find({score:{$exists : true}}).sort({score:-1}).populate('user').then(userScores => {
            scores.push(userScores);
        })
        for(let s of scores){
            if(s.id == currentUserScore){
                let p = scores.indexOf(s);
                Score.update({id:currentUserScore},{$set:{place:p}});
            }
        }

    }
})
const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
/**
 * Created by Milena on 02/04/2017.
 */

const UserInfos = require('mongoose').model('UserInfo');
const User = require('mongoose').model('User');
const Score = require('mongoose').model('Score');


module.exports = {
    leaderboard: (req, res) => {
        Score.find({score:{$exists : true}}).sort({score:-1}).limit(25).populate('user').then(users => {
            res.render('leaderboard/leaderboard', {profiles: users});
        })

    }

};
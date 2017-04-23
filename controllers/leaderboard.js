/**
 * Created by Milena on 02/04/2017.
 */

const UserInfos = require('mongoose').model('UserInfo');
const User = require('mongoose').model('User');


module.exports = {
    leaderboard: (req, res) => {
        UserInfos.find({score:{$exists : true}}).sort({score:-1}).limit(25).populate('user').then(users => {
            res.render('leaderboard/leaderboard', {profiles: users});
        })

    }

};
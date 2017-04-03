/**
 * Created by Milena on 02/04/2017.
 */

const Users = require('mongoose').model('User');


module.exports = {
    leaderboard: (req, res) => {
        Users.find({score:{$exists : true}}).sort({score:-1}).limit(10).then(users => {
            res.render('leaderboard/leaderboard', {users: users});
        })

    }

};
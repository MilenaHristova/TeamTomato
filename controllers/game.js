/**
 * Created by Milena on 24/04/2017.
 */
const Score = require('mongoose').model('Score');
const User = require('mongoose').model('User');

module.exports = {
    game: (req, res) => {
        let id = req.params.id;

        Score.update({user:id},{$inc : {score:1}}).then(user => {
            res.render('game/break');
        });
    },
    gameLoggedOut: (req, res) => {
        res.render('game/break');
    }
}
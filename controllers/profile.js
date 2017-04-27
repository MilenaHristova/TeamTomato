/**
 * Created by Milena on 07/04/2017.
 */

const UserInfo = require('mongoose').model('UserInfo');
const User = require('mongoose').model('User');
const Score = require('mongoose').model('Score');

module.exports = {
    details: (req,res) => {
        let id = req.params.id;

        User.findById(id).populate('userInfo').populate('score').then(info => {
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
            res.render('profile/profile', {profile:info})


        })
        
    },

    editGet: (req, res) => {
        let id = req.params.id;

        User.findById(id).populate('userInfo').then(user => {
            res.render('profile/edit', {info: user.userInfo});
        });

    },
    editPost: (req,res) => {
        let id = req.params.id;
        User.findById(id).populate('userInfo').then(user => {
            let profileId = user.userInfo.id;
            let profileArgs = req.body;
            let errorMsg = '';
            if(!profileArgs.email){
                errorMsg = 'Email cannot be empty!';
            }
            if(errorMsg){
                res.render('profile/edit', {error: errorMsg});
            }else{
                UserInfo.update({_id:profileId}, {$set: {email: profileArgs.email, description: profileArgs.description}})
                    .then (updateStatus => {
                        res.redirect(`/profile/profile/${id}`);
                    })
            }

        })



    }

};
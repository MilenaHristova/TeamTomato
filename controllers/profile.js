/**
 * Created by Milena on 07/04/2017.
 */

const UserInfo = require('mongoose').model('UserInfo');
const User = require('mongoose').model('User');

module.exports = {
    details: (req,res) => {
        let id = req.params.id;

        UserInfo.findById(id).populate('user').then(info => {
            if(!req.user){
                res.render('profile/profile', {profile:info});
                return;
            }
            res.render('profile/profile', {profile:info});
        })
        
    },
    profile: (req,res) => {
        let id = req.params.id;

        User.findById(id).populate('userInfo').then(info => {
                res.render('profile/ownprofile', {user: info});
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
                        res.redirect(`/profile/ownprofile/${id}`);
                    })
            }

        })



    }

};
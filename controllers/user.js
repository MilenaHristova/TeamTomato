/**
 * Created by Milena on 02/04/2017.
 */

const User = require('mongoose').model('User');
const UserInfo = require('mongoose').model('UserInfo');
const Score = require('mongoose').model('Score');


const encryption = require('./../utilities/encryption');

module.exports = {
    registerPost:(req, res) => {
        let registerArgs = req.body;

        User.findOne({username: registerArgs.username}).then(user => {
            let errorMsg = '';
            if (user) {
                errorMsg = 'User with the same username exists!';
            } else if (registerArgs.password !== registerArgs.repeatedPassword) {
                errorMsg = 'Passwords do not match!'
            }

            if (errorMsg) {
                registerArgs.error = errorMsg;
                res.render('user/register', registerArgs)
            } else {
                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword(registerArgs.password, salt);

                let userObject = {
                    username: registerArgs.username,
                    passwordHash: passwordHash,
                    salt: salt
                };

                User.create(userObject).then(user => {

                    let userProfile = {
                        user: user.id,
                        email: registerArgs.email,
                        description: ''
                    }

                    UserInfo.create(userProfile).then(info => {
                        user.userInfo = info.id;
                        user.save();

                        let scoreObject = {
                            user: user.id,
                            score: 0,
                            place: 0
                        }

                        Score.create(scoreObject).then(score => {
                            user.score = score.id;
                            user.save();
                        })
                    })

                    req.logIn(user, (err) => {
                        if (err) {
                            registerArgs.error = err.message;
                            res.render('user/register', registerArgs);
                            return;
                        }

                        res.redirect('/')
                    })

                })
            }
        })

    },
    registerGet: (req,res)=>{
        res.render('user/register');
    },


    loginPost: (req, res) => {
        let loginArgs = req.body;
        User.findOne({username: loginArgs.username}).then(user => {
            if (!user ||!user.authenticate(loginArgs.password)) {
                let errorMsg = 'Either username or password is invalid!';
                loginArgs.error = errorMsg;
                res.render('user/login', loginArgs);
                return;
            }

            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    res.redirect('user/login', {error: err.message});
                    return;
                }

                res.redirect('/');
            })
        })
    },
    loginGet:(req,res)=>{
        res.render('user/login');
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('/');
    }

};

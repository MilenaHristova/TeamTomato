/**
 * Created by Milena on 02/04/2017.
 */

const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');
const leaderboardController = require('./../controllers/leaderboard');


module.exports = (app) => {
    app.get('/', homeController.index);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/logout', userController.logout);

    app.get('/leaderboard/leaderboard', leaderboardController.leaderboard);

};

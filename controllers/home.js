/**
 * Created by Milena on 02/04/2017.
 */

module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },
    lobby: (req,res) => {
        res.render('home/lobby');
    }
}
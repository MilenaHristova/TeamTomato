/**
 * Created by Milena on 02/04/2017.
 */

const path = require('path');

module.exports = {
    development: {
        rootFolder: path.normalize(path.join(__dirname, '/../')),
        connectionString: 'mongodb://localhost:27017/game'
    },
    production:{}
};



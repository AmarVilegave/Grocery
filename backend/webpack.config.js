const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry : './src/server.js',
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'backend.bundle.js',
    },
    target : 'node'
};
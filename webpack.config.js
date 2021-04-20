const path = require('path');
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    experiments: {
        topLevelAwait: true
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve:{
        fallback: {
            "crypto": false
        }
    },

};
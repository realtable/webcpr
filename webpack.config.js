const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var files = fs.readdirSync(path.resolve(__dirname, 'src/')).map(function (x) {
  return './src/' + x
});

module.exports = {
  entry: {
    'webcpr.css': files
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webcpr.css'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [ new ExtractTextPlugin('webcpr.css') ]
};
var path = require('path');

module.exports = {
  entry: [
    './lib/client'
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'lib', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },
};

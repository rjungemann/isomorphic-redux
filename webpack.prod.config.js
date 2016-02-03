var path = require('path');

module.exports = {
  entry: [
    './lib/client'
  ],
  resolve: {
    modulesDirectories: [
      path.join(__dirname, 'node_modules', 'warning'),
      'node_modules', 'lib'
    ],
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

const path = require('path');

module.exports = {
  entry: './dist/app.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve()
  }
};

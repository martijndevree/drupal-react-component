const path = require('path');
const isDevMode = process.env.NODE_ENV !== 'production';

const config = {
  entry: {
    main: ['./assets/js/src/index.tsx']
  },
  devtool: (isDevMode) ? 'source-map' : false,
  mode: (isDevMode) ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, 'assets/js/dist'),
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.sass', '.scss'],
    // modules: [
    //   'node_modules',
    //   path.resolve(__dirname, 'assets/js/src')
    // ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'assets/js/src'),
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

module.exports = config;

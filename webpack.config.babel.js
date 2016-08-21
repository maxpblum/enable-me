import path from 'path'

export default {
  resolve: {
    root: [
      path.resolve(__dirname, 'client'),
    ],
    extensions: ['', '.js', '.jsx', '.scss', '.json'],
    modulesDirectories: ['node_modules'],
    fallback: path.join(__dirname, 'node_modules'),
  },
  devtool: '#eval-source-map',
  entry: 'client',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
}

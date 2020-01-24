const path = require('path');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [
  {
    mode: 'production',
    entry: './index.js',
    output: {
      filename: 'dist.js',
      path: path.resolve(__dirname, 'example'),
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    resolve: {
      extensions: ['.js'],
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: /(node_modules)/,
          use: 'babel-loader',
        }
      ]
    }
  },

  {
    mode: 'production',
    entry: './index.js',
    output: {
      filename: 'index.js',
      libraryTarget: 'var',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js'],
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: /(node_modules)/,
          use: 'babel-loader',
        }
      ]
    }
  }
];
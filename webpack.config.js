const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html',
    // inlineSource: 'src\/css\/.css$'
  }),
  new InjectManifest({
    swSrc: './sw.js',
    exclude: [/sw\.js/, /\.DS_Store$/],
  }),
];

module.exports = [
  {
    mode: 'none',
    // Tell Webpack which file kicks off our app.
    entry: './index.js',
    // Tell Weback to output our bundle.js
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, 'build')
    },
    // Tell Webpack which directories to look in to resolve import statements.
    // Normally Webpack will look in node_modules by default but since we’re overriding
    // the property we’ll need to tell it to look there in addition to the
    // bower_components folder.
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
      ]
    },
    // These rules tell Webpack how to process different module types.
    // Remember, *everything* is a module in Webpack. That includes
    // CSS, and (thanks to our loader) HTML.
    module: {
      rules: [
        {
          // If you see a file that ends in .html, send it to these loaders.
          test: /\.html$/,
          // This is an example of chained loaders in Webpack.
          // Chained loaders run last to first. So it will run
          // raw-loader, then polymer-webpack-loader and finally hand the output to
          // babel-loader. This let's us transpile JS in our `<script>` elements.
          use: [
            { loader: 'babel-loader' },
            { loader: 'raw-loader' }
          ]
        },
        // {
        //   // If you see a file that ends in .js, just send it to the babel-loader.
        //   test: /(\.js$)/,
        //   use: 'babel-loader'
        // },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: { 
                insert: 'head',
                injectType: 'singletonStyleTag'
              },
            },
            "css-loader",
          ]
        },
      ]
    },
    // Enable the Webpack dev server which will build, serve, and reload our
    // project on changes.
    devServer: {
      contentBase: __dirname,
      compress: true,
      port: 9000
    },
    plugins: [...plugins]
  }
];
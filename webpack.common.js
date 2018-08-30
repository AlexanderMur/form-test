// shared config (dev and prod)

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const prodMode = process.env.NODE_ENV
const HMRMode = process.env.HOT
const pages = require('./pages')
const settings = require('./settings_local')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const glob = require('glob')
module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    main: [
      './index.js',
    ],
  },

  stats: {
    children: false,
    excludeAssets: (assetName) => !/\.(js|css|html)$/.test(assetName),
    modules: false,
  },
  performance: {
    hints: false,
  },
  context: resolve(__dirname, settings.src_path),
  module: {
    rules: [

      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          HMRMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {

              plugins: [
                require('autoprefixer')
              ]
            }
          },
          'sass-loader',
        ],
      },

      {
        test: /\.less$/,
        use: [
          HMRMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {

              plugins: [
                require('autoprefixer')
              ]
            }
          },
          'less-loader',
        ],
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {

        test: /\.(jpe?g|png|gif)$/i,
        loader: 'cache-loader!file-loader',
        options: {
          name: HMRMode ? '[path][name].[hash:8].[ext]' : '[path][name].[ext]',
        },
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/,],
        loader: 'file-loader',
        options: {
          name: HMRMode ? 'fonts/[name].[hash:8].[ext]' : '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CheckerPlugin(),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        compress: true
      }
    }),
    // new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: 'img/',
      to: 'img/[path][name].[ext]',
    }]),
    prodMode ? new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,

      plugins: [
        imageminMozjpeg({
          quality: 90,
        })
      ]
    }) : ()=>{},
    ...pages,
  ],
};
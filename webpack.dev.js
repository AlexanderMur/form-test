// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const fs = require('fs');
const settings = require('./settings_local')
const address = require('ip').address();
const path = require('path')
const HMRMode = process.env.HOT
fs.writeFile(settings.dist_path+'/hot', address,()=>{});
module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    headers: {"Access-Control-Allow-Origin": "*"},
    host: address,
    overlay: true,
    hot: true,
    stats: {
      children: false,
      excludeAssets: (assetName) => !/\.(js|css|html)$/.test(assetName),
      modules: false,
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, settings.dist_path),
    chunkFilename: '[name].bundle.js',
  },
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    HMRMode ? new webpack.HotModuleReplacementPlugin() : ()=>{}, // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
});
if(!HMRMode){
  const browserSync = require('browser-sync')

  browserSync({
    // proxy: settings.proxy,
    notify: false,
    ghostMode: false,
    files: ['app/dist/*.css','app/src/*.html',],
    server: {
      baseDir: "app/dist",
    },
  });
}



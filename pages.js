const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const settings = require('./settings_local')
function walkSync(dir, regex) {
  function walkSync2(dir2,filelist = []){
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir2);
    files.forEach(function (file) {
      const path = dir2 + '/' + file
      if (fs.statSync(path).isDirectory()) {
        filelist = walkSync2(path, filelist);
      }
      else if (regex.test(path)) {
        const relativePath = path.replace(dir + '/','')
        filelist.push(relativePath);
      }
    });
    return filelist
  }
  return walkSync2(dir)
}

const mylist = walkSync(settings.src_path, /\.html$/i);
console.log(mylist)
module.exports = mylist.map(function (path) {
  return new HtmlWebpackPlugin({
    template: path,
    filename: path,
  })
});


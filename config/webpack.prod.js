// 路径
const path = require('path')
// 引入父包
const {stylelint,
  htmlPlugin,        
  bannerPlugin,
  providePlugin,
  hotModuleReplacementPlugin,
  cleanWebpackPlugin
} = require('./plugin.base')


module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.min.js'
  },
  //警告 webpack 的性能提示
  performance: {
    hints: 'warning',
    maxEntrypointSize: 50000000,  //入口起点的最大体积
    maxAssetSize: 30000000,  //生成文件的最大体积
    //只给出 js 文件的性能提示
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js')
    }
  },
  plugins: [
    ...stylelint,
    htmlPlugin,
    bannerPlugin,
    providePlugin,
    hotModuleReplacementPlugin,
    cleanWebpackPlugin
  ]
};
const path = require('path')
// 样式规范插件
const StyleLintPlugin = require('stylelint-webpack-plugin')
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入webpack
const webpack = require('webpack')
// 先清除再打包
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const STYLELINT_ENABLE = false
const ESLINT_SWITCH = false

module.exports = {
  ESLINT_SWITCH,
  stylelint: STYLELINT_ENABLE ? [new StyleLintPlugin({
    files: ['**/*.css', '**/*.less', '**/*.html', '**/*.scss']
  })] : [],
  htmlPlugin: new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../index.html'),
    // 配置上线后压缩html文件
    minify: {
      removeAttributeQuotes: true, // 删除打包后meta标签的双引号
      collapseWhitespace: true, // 压缩html文件
    },
    hash: true // 生成src属性的bundle.js?e351c6340ef103ea82cb
  }),
  bannerPlugin: new webpack.BannerPlugin('描述信息,会打包到文件的任何文件的头部'),
  providePlugin: new webpack.ProvidePlugin({ // 在每个模块中注入$符号
    $: 'jquery'
  }),
  hotModuleReplacementPlugin: new webpack.HotModuleReplacementPlugin(),  // 热部署-3-表明更新模块
  cleanWebpackPlugin: new CleanWebpackPlugin() // 每次先清空再打包
}

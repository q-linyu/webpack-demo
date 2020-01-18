const path = require('path');
const {stylelint,
    htmlPlugin,        
    bannerPlugin,
    providePlugin,
    hotModuleReplacementPlugin,
    cleanWebpackPlugin
} = require('./plugin.base')

module.exports = {
    mode: 'development', // 仅开发
    output: { // 仅开发
        filename: 'bundle.js'
    },
    resolve: { /* 配置第三方插件包 */
        modules: [path.resolve('node_modules')],
        extensions: ['.js', '.css', '.json']
    },
    /*
        1. source-map==》会独立生成一个sourcemap文件,出错了,会标识当前报错的列和行
        2. eval-source-map==》不会产生单独的文件,但可以显示行和列
        3. cheap-module-source-map==》会产生一个map文件,但不会跟源代码关联起来
        4. cheap-module-eval-source-map==》不会产生文件,但集成灶打包文件中,也不会产生列
    */
    watch: true,  // 实时打包,不用每次都要npm run buid打包命令
    watchOptions: {  // 监控的选项
        poll: 1000, // 秒:每1秒更新一次
        aggregateTimeout: 500,  // 防抖,500毫秒后才更新
        ignored: /node_modules/, // 忽略某个文件
    },
    plugins: [
        ...stylelint,
        htmlPlugin,
        bannerPlugin,
        providePlugin,
        hotModuleReplacementPlugin,
        cleanWebpackPlugin
    ],
    devServer: { // 仅开发
        contentBase: path.resolve(__dirname, '../'), // 加载的文件路径
        hot: true,  // 热部署
        compress: true, // 启动压缩
        open: true, // 默认打开浏览器
        port: 3000,
        proxy: { // 配置跨域代理
            '/api': {
                target: 'http://localhost:8001/',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }
        }
    }
};
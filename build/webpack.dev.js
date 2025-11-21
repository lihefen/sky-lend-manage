const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * 开发环境webpack配置
 * 合并基础配置，添加开发服务器和热更新支持
 */
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
        directory: path.join(__dirname, '../dist'), // 注意路径层级
        watch: true // 启用文件监听,
    },
    hot: true,
    open: '/home/index.html', // 指定默认打开页面
    port: 9000,
    historyApiFallback: {
        rewrites: [
            { from: /^\/$/, to: '/home/index.html' }, // 根路径重定向
            { from: /^\/check-list/, to: '/check-list/index.html' }, // 示例：其他页面
        ]
    },
    compress: true,
    proxy: {
        '/proxyDev': {
            target: 'http://123.60.107.0:8080',
            changeOrigin: true,
            secure: false,
            pathRewrite: { '^/proxyDev': '' }
        }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    })
  ]
});
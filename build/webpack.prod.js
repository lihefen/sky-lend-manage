const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
console.log(TerserPlugin);
/**
 * 生产环境webpack配置
 * @type {import('webpack').Configuration}
 */
module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    compress: { drop_console: true },
                    safari10: true,
                    mangle: {
                        safari10: true,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    autoprefixer: {
                        disable: true,
                    },
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true,
                    },
                },
                canPrint: true,
            }),
        ],
        runtimeChunk: false, // 不提取
        splitChunks: {
            name: false,
            chunks: 'all',
            minSize: 30000,
            minChunks: 3,
            cacheGroups: {
                default: false,
                chunkSwiper: {
                    name: 'chunk-swiper',
                    priority: 10,
                    reuseExistingChunk: true,
                    test(module, chunks) {
                        if (
                            module.resource &&
                            (module.resource.includes('vue-awesome-swiper') || module.resource.includes('swiper'))
                        ) {
                            return true;
                        }
                    },
                },
                chunkChart: {
                    name: 'chunk-chart',
                    priority: 10,
                    reuseExistingChunk: true,
                    minChunks: 2,
                    test(module, chunks) {
                        if (
                            module.resource &&
                            (module.resource.includes('echarts') || module.resource.includes('charts'))
                        ) {
                            return true;
                        }
                    },
                },
                vendors: {
                    name: 'common',
                    chunks: 'all',
                    minSize: 30000,
                    minChunks: 10,
                    test(module, chunks) {
                        // `module.resource` contains the absolute path of the file on disk.
                        // Note the usage of `path.sep` instead of / or \, for cross-platform compatibility.
                        // const path = require('path');
                        if (module.resource) {
                            if (
                                module.resource.endsWith('.js') &&
                                !module.resource.includes('vue-router') &&
                                !module.resource.includes('vuex') &&
                                module.resource.includes('node_modules')
                            ) {
                                return true;
                            }
                        }
                    },
                },
                styles: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 10000,
                    minSize: 500000,
                    test: /\.(css|less|scss|stylus)$/,
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        })
    ]
});
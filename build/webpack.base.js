const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');

/**
 * 获取多页面入口配置
 * @returns {Object} 包含入口配置和HTML插件的对象
 */
function getMultiPageConfig() {
  const pagesDir = path.resolve(__dirname, '../src/pages');
  const pages = fs.readdirSync(pagesDir);
  
  const entry = {};
  const htmlPlugins = [];
  
  pages.forEach(page => {
    const entryPath = path.resolve(pagesDir, page, 'index.js');
    const configPath = path.resolve(pagesDir, page, 'config.js');
    const config = fs.existsSync(configPath) ? require(configPath) : {};

    if (fs.existsSync(entryPath)) {
      entry[page] = entryPath;
      
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(pagesDir, page, 'index.html'),
          filename: `${page}/index.html`,
          chunks: [page],
          inject: true,
          title: config.title || '默认标题',
          meta: config.meta || [],
          minify: {
            html5: true, // 根据HTML5规范解析输入
            collapseWhitespace: true, // 折叠空白区域
            preserveLineBreaks: false,
            minifyCSS: true, // 压缩文内css
            minifyJS: true, // 压缩文内js
            removeComments: true, // 移除注释
            collapseWhitespace: true
          }
        })
      );
    }
  });
  
  return { entry, htmlPlugins };
}

const { entry, htmlPlugins } = getMultiPageConfig();

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/js/[name].[contenthash:8].js', // 按页面名分组
    publicPath: '/',
    // publicPath: '/customer/',
    clean: true, // Clean the output directory before emit.
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
        vue: 'vue/dist/vue.runtime.esm.js',
        '@': path.resolve(__dirname, '../src'),
        app: path.resolve(__dirname, '../src/app'),
        services: path.resolve(__dirname,  '../src/services'),
        utils: path.resolve(__dirname,  '../src/utils'),
        'assets': path.resolve(__dirname,  '../src/assets'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: false
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          filename: 'images/[name].[hash:8][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    ...htmlPlugins,
  ]
};
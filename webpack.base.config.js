
/*
 * webpack base config
 * 模块化打包后面再考虑
 */

const webpack            = require('webpack'),
      path               = require('path'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      HtmlWebpackPlugin  = require('html-webpack-plugin');

const SRC_PATH           = path.resolve('./src'),
      ELECTRON_PATH      = path.join(SRC_PATH, 'electron'),
      APP_PATH           = path.join(SRC_PATH, 'app'),
      ASSETS_BUILD_PATH  = path.resolve('./build');

module.exports = {
    context: APP_PATH, // 设置源代码的默认根路径
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./app.jsx']
    },
    output: {
        path: ASSETS_BUILD_PATH, 
        filename: './[name].js'
    },
    module: {
        rules: [
            // {
            //     enforce: 'pre',  // ESLint 优先级高于其他 JS 相关的 loader
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader'
            // },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use:
                [
                    {
                        loader: 'url-loader',
                        options:
                        {
                            limit: 8192,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:
                [
                    {
                        loader: 'url-loader',
                        options:
                        {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: false }),        
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './react/template/index.html',
            hash: false
        })
    ]
}
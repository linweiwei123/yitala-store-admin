/**
 * Created by Administrator on 2016/11/24.
 */
var webpackMerge = require('webpack-merge');
var helpers = require('./helpers');
var commonConfig = require('./webpack.common.js');

var ExtractTextPlugin = require('extract-text-webpack-plugin');



const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        filename: 'scripts/[name].bundle.js',
        sourceMapFilename: 'scripts/[name].map',
        chunkFilename: 'scripts/[id].chunk.js'
    },

    module: {
        rules: [
            /**
             * awesome-typescript-loader 用来配合tsconfig编译typescript
             * angular2-template-loader 用来把模块的样式和html打到component中， inlines all html and style's in angular2 components
             * angular2-router-loader lazy-load 跟之前的懒加载类似，从而写法上简单很多
             */
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        hot: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 300
        },
        proxy: [
            {
                context: ['/api/**'],
                target: 'http://localhost:8080',
                secure: false
            }
        ]
    }
});

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
var CompressionPlugin = require("compression-webpack-plugin");
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    output: {
        path: helpers.root('dist'),
        publicPath: '/admin/',
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[id].[chunkhash].chunk.js'
    },

    module: {
        rules: [
            /**
             * awesome-typescript-loader 用来配合tsconfig编译typescript
             * angular2-template-loader 用来把模块的样式和html打到component中， inlines all html and style's in angular2 components
             * angular2-router-loader lazy-load 跟之前的懒加载类似，从而写法上简单很多
             */
            {
                test: /\.ts/,
                loaders: [
                    '@ngtools/webpack'],
                exclude: [/\.(spec|e2e)\.ts$/]
            }
        ]
    },
    plugins: [
        new AotPlugin({
            tsConfigPath:path.resolve(__dirname, '..')+'/tsconfig-aot.json',
            entryModule:helpers.root('src/app/app.module#AppModule')
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            beautify: false, //prod
            output: {
                comments: false
            }, //prod
            mangle: {
                screw_ie8: true
            }, //prod
            compress: {
                screw_ie8: true,
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                negate_iife: false // we need this for lazy v8
            },
            sourceMap: false
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new ExtractTextPlugin('[name].[chunkhash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});

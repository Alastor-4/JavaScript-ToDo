const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); //revisar si funciona sin el terser
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',//production-development
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({}),
        ] //esta linea es para que minimice el css y js
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/, //todos los .css
                exclude: /styles\.css$/, //excluye este archivo fijarse bien
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /styles\.css$/, //busca style.css
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.html$/,  //todos los html
                loader: 'html-loader',
                options: {
                    sources: false,//antes era atributes
                    minimize: false,//para saber si comprime el archivo html
                }
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html', //archivo a tomar
            filename: './index.html' //hacia donde
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false,
        }),
        new CleanWebpackPlugin(),
    ]
}
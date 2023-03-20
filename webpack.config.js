const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'development',//production-development
    optimization: {
        minimizer: [new CssMinimizerPlugin()] //esta linea es para que minimice el css
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
            filename: '[name].css',
            ignoreOrder: false,
        }),
    ]
}
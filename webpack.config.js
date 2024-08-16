const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './main.js', // Основной файл для приложения
        transactionDetails: './scripts/transaction-details.js', // Файл для страницы деталей транзакции
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['main'], // Указывает, что для этой страницы нужен только main.js
        }),
        new HtmlWebpackPlugin({
            template: './transaction-details.html',
            filename: 'transaction-details.html',
            chunks: ['transactionDetails'], // Указывает, что для этой страницы нужен только transaction-details.js
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 8082,
    },
};

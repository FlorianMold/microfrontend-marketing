/**
 * With merge, we can merge two different webpack configurations.
 * With merge everything that is in the common file into this development file.
 */
const {merge} = require('webpack-merge');
/**
 * Takes the html of our project and inject some different script tags inside of it.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * We import our common-config from the package.
 */
const commonConfig = require('./webpack.common');

/**
 * This is our development configuration, we want to merge into the other config.
 */
const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
/**
 * We export the merged configuration
 *
 * We use devConfig as second parameter, so it overwrites the keys, which are in both configurations.
 */
module.exports = merge(commonConfig, devConfig);

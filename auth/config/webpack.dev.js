/**
 * With merge, we can merge two different webpack configurations.
 * With merge everything that is in the common file into this development file.
 */
const {merge} = require('webpack-merge');
/**
 * Takes the html of our project and inject some different script tags inside of it.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

/**
 * We import our common-config from the package.
 */
const commonConfig = require('./webpack.common');

const packageJson = require('../package.json');

/**
 * This is our development configuration, we want to merge into the other config.
 */
const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8082/'
    },
    devServer: {
        port: 8082,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            /**
             * The name of our project.
             * Remember that the plugin will create a global variable with the name marketing,
             * so no div should be called like this.
             *
             */
            name: 'auth',
            filename: 'remoteEntry.js',
            /**
             * We expose the src/bootstrap under Marketing
             * We export boostrap, because the mount function is exported there.
             */
            exposes: {
                './AuthApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        }),
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

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

/**
 * This is our development configuration, we want to merge into the other config.
 */
const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            /**
             * The name for the host actually never gets used, but it is good practice to set it up
             */
            name: 'container',
            /**
             * A collection of key-value pairs.
             * The keys are the names of the different modules, which we want to import.
             * The values where the remoteEntry file can be found for the module.
             */
            remotes: {
                /**
                 * The name before the @, must match the name inside the marketing webpack config
                 */
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            }
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

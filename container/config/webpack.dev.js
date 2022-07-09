/**
 * With merge, we can merge two different webpack configurations.
 * With merge everything that is in the common file into this development file.
 */
const {merge} = require('webpack-merge');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

/**
 * We import our common-config from the package.
 */
const commonConfig = require('./webpack.common');

/** We import the package.json */
const packageJson = require('../package.json');

/**
 * This is our development configuration, we want to merge into the other config.
 */
const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    output: {
        publicPath: 'http://localhost:8080/'
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
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js'
            },
            /**
             * We share all dependencies of our package.json.
             * So when we add a new dependency, we share it automatically
             * The plugin accepts a list of strings and a key-value pair object.
             */
            shared: packageJson.dependencies,
        }),
    ]
}
/**
 * We export the merged configuration
 *
 * We use devConfig as second parameter, so it overwrites the keys, which are in both configurations.
 */
module.exports = merge(commonConfig, devConfig);

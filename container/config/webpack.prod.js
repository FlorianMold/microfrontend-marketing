const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

/**
 * An environment variable that points the production url of the marketing service.
 * This environment variable will be set at build-time.
 *
 * @type {string}
 */
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        /**
         * When we build files for production, they will use this filename as template
         * The content-hash is for resolving caching issues.
         */
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                // We assume that the remoteEntry.js of marketing is located under /marketing/
                marketing: `marketing@${domain}/marketing/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]
}


module.exports = merge(commonConfig, prodConfig);

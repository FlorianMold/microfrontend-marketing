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
console.log(domain);

const prodConfig = {
    mode: 'production',
    output: {
        /**
         * When we build files for production, they will use this filename as template
         * The content-hash is for resolving caching issues.
         */
        filename: '[name].[contenthash].js',
        /**
         * This option is set very often in micro-frontend architectures.
         * This option is needed, when we want to refer to a file, which has been built by webpack.
         * Whenever our html-file wants to refer to the javascript file, which has been created.
         * Without the publicPath config it refers to the filename directly.
         *
         * Now whenever, the html-plugin prepends all files with the public-path.
         */
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                // We assume that the remoteEntry.js of marketing is located under /marketing/latest/
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]
}


module.exports = merge(commonConfig, prodConfig);

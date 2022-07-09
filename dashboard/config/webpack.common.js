const {VueLoaderPlugin} = require('vue-loader');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: '/\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i',
                use: [
                    {loader: 'file-loader'}
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss|\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                // This regex specifies mjs, js files to be used by babel
                test: /\.m?js$/,
                // Don't run babel on the node modules directory.
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        /**
                         * babel/present-env processes our code in different ways (converts the code to es5)
                         */
                        presets: ['@babel/preset-env'],
                        /**
                         * Adds some additional code to enable some features, like async-await
                         */
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin()],
}

module.exports = {
    module: {
        rules: [
            {
                // This regex specifies mjs, js files to be used by babel
                test: /\.m?js$/,
                // Don't run babel on the node modules directory.
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        /**
                         * babel/preset-react means that webpack processes all the different jsx tags
                         * babel/present-env processes our code in different ways (converts the code to es5)
                         */
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        /**
                         * Adds some additional code to enable some features, like async-await
                         */
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    }
}

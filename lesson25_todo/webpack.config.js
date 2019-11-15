const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    devtool: 'source-map', //
    devServer: {
        contentBase: './dist'
    },
    plugins: [],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            }
        ],
    },
};

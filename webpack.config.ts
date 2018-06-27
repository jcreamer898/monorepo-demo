import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

const env = process.env.NODE_ENV !== 'production' ? 'dev' : 'prod';
const settings = require('./settings.json');
const entry = settings.packages.reduce((memo, packageName) => {
    memo[packageName] = `./packages/${packageName}/src/index.jsx`;

    return memo;
}, {});

const config: webpack.Configuration = {
    mode: 'development',
    devtool: 'cheap-source-map',
    entry,
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/apps/',
        filename: `[name].web.${env === 'dev' ? '' : 'ipj.'}js`
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
};

export default config;

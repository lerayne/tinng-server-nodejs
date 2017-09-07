/**
 * Created by lerayne on 14.03.17.
 */

const webpack = require('webpack')
const path = require('path')
const getExternals = require('webpack-node-externals')

module.exports = function (env) {

    const babelOptions = {
        babelrc: false,
        presets: [
            ["env", {
                targets: {node: "current"}
            }],
            "stage-0",
            "flow"
        ]
    }

    return {
        target: 'node',

        devtool: 'inline-source-map',

        node: {
            __dirname: false,
            __filename: false,
        },

        entry: path.join(__dirname, 'src', 'server.js'),

        output: {
            path: path.join(__dirname),
            filename: 'tinng-server-node.js'
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: babelOptions
                    }
                }
            ]
        },

        externals: [
            {
                config: 'require("./config.js")' // require config as separate file
            },
            getExternals({
                whitelist: [
                    /\.css$/i //CSS files whitelisted so we can omit them by loader
                ]
            })
        ]
    }
}
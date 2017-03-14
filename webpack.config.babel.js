/**
 * Created by lerayne on 14.03.17.
 */

import webpack from 'webpack'
import path from 'path'
import getExternals from 'webpack-node-externals'

console.log('__dirname', __dirname)

export default function (env) {

    const babelOptions = {
        babelrc: false,
        presets: [
            ["env", {
                targets: {node: "current"},
                modules: false
            }],
            "stage-0"
        ],
        plugins: ["transform-flow-strip-types"]
    }

    return {
        target: 'node',

        entry: path.join(__dirname, 'src', 'server.js'),

        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'server.js'
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: babelOptions
                    }]
                }
            ]
        },

        externals: [getExternals()],

        node: {
            __dirname: false,
            __filename: false,
        }
    }
}
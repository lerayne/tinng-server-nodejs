/**
 * Created by lerayne on 14.03.17.
 */

require('babel-register')({
    babelrc: false,
    presets: [
        ["env", {
            targets: {node: "current"}
        }],
        "stage-0",
        "flow"
    ]
})

require('babel-polyfill')
require('./src/server.js')

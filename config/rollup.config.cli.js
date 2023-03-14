import { nodeResolve } from "@rollup/plugin-node-resolve"
import { babel } from "@rollup/plugin-babel"
import terser from "@rollup/plugin-terser"

import { readFileSync } from "fs"
const input = "src/cli/index.js"
const banner = readFileSync(input).toString().split("\n")[0]

const config = {
    input,
    output: [
        { banner, file: "bin/bundle.min.js", format: "iife" }
    ],
    plugins: [
        nodeResolve(),
        babel({ 
            babelHelpers: "bundled",
            presets: [
                ["@babel/preset-env", { targets: { node: 6 } }]
            ]
        }),
        terser({ maxWorkers: 6 })
    ]
}

export default config
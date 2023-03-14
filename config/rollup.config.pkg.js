import { nodeResolve } from "@rollup/plugin-node-resolve"
import { babel } from "@rollup/plugin-babel"
import terser from "@rollup/plugin-terser"

const config = {
    input: "src/index.js",
    output: [
        { file: "dist/bundle.min.js", format: "es" },
        { file: "dist/bundle.min.cjs", format: "cjs" },
        // { file: "dist/bundle-umd.min.cjs", format: "umd" }
    ],
    plugins: [
        nodeResolve(),
        babel({ 
            babelHelpers: "bundled",
            presets: [
                ["@babel/preset-env", { targets: { node: 12 } }]
            ]
        }),
        terser({ maxWorkers: 6 })
    ]
}

export default config
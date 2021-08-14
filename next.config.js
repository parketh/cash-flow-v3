const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    webpack: (config, { dev, isServer }) => {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        })
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.resolve.fallback.fs = false
        }
        // copy files you're interested in
        if (!dev) {
            config.plugins.push(
                new CopyPlugin({
                    patterns: [{ from: "content", to: "content" }],
                })
            )
        }
        return config
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
}

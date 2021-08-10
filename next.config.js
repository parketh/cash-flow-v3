const path = require("path")

module.exports = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        })
        config.resolve.alias = {
            ...config.resolve.alias,
            "@Elements": path.resolve(__dirname, "components/elements"),
            "@Modules": path.resolve(__dirname, "components/modules"),
            "@Sections": path.resolve(__dirname, "components/sections"),
            "@Layouts": path.resolve(__dirname, "components/layouts"),
            "@FormOptions": path.resolve(__dirname, "data/form-options"),
            "@FormValues": path.resolve(__dirname, "data/form-values"),
            "@CourseIndex": path.resolve(__dirname, "data/course-index"),
            "@Models": path.resolve(__dirname, "models"),
            "~": path.resolve(__dirname),
        }
        return config
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

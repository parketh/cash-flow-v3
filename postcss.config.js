// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors
const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: ["./components/**/*.js", "./data/**/*.js", "./pages/**/*.js", "./services/**/*.js", ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];

module.exports = {
  plugins: [
    "tailwindcss", 
    "autoprefixer", 
    "postcss-preset-env",
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ]
}

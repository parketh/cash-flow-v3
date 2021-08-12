module.exports = {
    mode: "jit",
    purge: {
        content: [
            "./pages/**/*.{js,ts,jsx,tsx}",
            "./components/**/*.{js,ts,jsx,tsx}",
            "./data/**/*.{js,ts,jsx,tsx}",
            "./services/**/*.{js,ts,jsx,tsx}",
        ],
        safelist: [
            "grid-cols-1",
            "grid-cols-2",
            "grid-cols-3",
            "grid-cols-4",
            "grid-cols-5",
            "grid-cols-6",
            "grid-cols-7",
            "sm:grid-cols-1",
            "sm:grid-cols-2",
            "sm:grid-cols-3",
            "sm:grid-cols-4",
            "sm:grid-cols-5",
            "sm:grid-cols-6",
            "sm:grid-cols-7",
        ],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                theme: {
                    DEFAULT: "#1440aa",
                    medium: "#396be3",
                    light: "#b3ccfc",
                    lighter: "#DAE5FB",
                    dark: "#0D2A6D",
                },
                accent: {
                    DEFAULT: "#f44336",
                    light: "#ffbdb8",
                    lighter: "#ffd7d4",
                    medium: "#f58178",
                    dark: "#c91d10",
                },
            },
            borderColor: {
                theme: {
                    DEFAULT: "#1440aa",
                    light: "#5B86EC",
                    lighter: "#DAE5FB",
                    dark: "#0D2A6D",
                },
                accent: {
                    DEFAULT: "#f44336",
                    light: "#ffbdb8",
                    lighter: "#ffd7d4",
                    medium: "#f58178",
                    dark: "#c91d10",
                },
            },
            borderWidth: {
                1: "1px",
            },
            maxWidth: {
                768: "48rem",
            },
            spacing: {
                960: "60rem",
                768: "48rem",
                496: "31rem",
                400: "25rem",
                1.75: "0.4375rem",
            },
            outline: {
                theme: "1px solid #1440aa",
            },
            animation: {
                easeIn: "easeIn 0.5s",
                easeInSlow: "easeInSlow 0.8s",
                fadeIn: "fadeIn 0.8s",
            },
            keyframes: {
                easeIn: {
                    "0%": { transform: "translateY(-60%)", opacity: "0%" },
                    "100%": { transform: "none", opacity: "100%" },
                },
                easeInSlow: {
                    "0%": { transform: "translateY(-60%)", opacity: "0%" },
                    "50%": { transform: "translateY(-60%)", opacity: "0%" },
                    "100%": { transform: "none", opacity: "100%" },
                },
                fadeIn: {
                    "0%": { opacity: "0%" },
                    "50%": { opacity: "0%" },
                    "100%": { opacity: "100%" },
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        "ul li": {
                            "&::before": {
                                backgroundColor: "#1440aa",
                            },
                        },
                        strong: {
                            color: "#1440aa",
                            fontWeight: 700,
                        },
                        h4: {
                            color: "#1440aa",
                            fontWeight: 700,
                            textAlign: "center",
                        },
                        h6: {
                            textAlign: "center",
                            fontSize: "small",
                            fontWeight: 600,
                        },
                    },
                },
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["active", "focus"],
            borderColor: ["focus"],
        },
    },
    plugins: [require("tailwind-scrollbar"), require("@tailwindcss/typography")],
}

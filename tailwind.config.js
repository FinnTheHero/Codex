/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    fontFamily: {
        sans: ["Merriweather", "sans-serif"],
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/postcss"),
    ],
};

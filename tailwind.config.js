module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontSize: {
                '4.5xl': '2.75rem' // Исправлено
            },
        },
    },
    plugins: [
        require('tailwind-children') // Подключение tailwind-children
    ],
};
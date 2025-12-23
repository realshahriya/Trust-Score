/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Syne', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                void: '#030303',
                surface: '#0A0A0A',
                neon: '#00F0FF',
                danger: '#FF2A3D',
                safe: '#00FF94',
                subtle: '#333333',
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
            },
            animation: {
                scanline: 'scanline 8s linear infinite',
                blink: 'blink 1.5s ease-in-out infinite',
                marquee: 'marquee 20s linear infinite',
                glow: 'glow 2s ease-in-out infinite',
            },
            keyframes: {
                scanline: {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '50%': { opacity: '0.5' },
                    '100%': { transform: 'translateY(100vh)', opacity: '0' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                glow: {
                    '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
                    '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
                },
            },
        },
    },
    plugins: [],
}

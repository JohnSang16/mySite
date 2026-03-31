import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#FFFFFF',
        accent: '#16a34a',
        gold: '#B3A369',
      },
      fontFamily: {
        display: ['var(--font-anime-ace)', 'sans-serif'],
        mono: ['var(--font-anime-ace)', 'sans-serif'],
        sans: ['var(--font-anime-ace)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

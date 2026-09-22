/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAF3DD', // Warm off-white / ivory (Eggshell)
          muted: '#F5EED3',
          card: '#FFFFFF',
          subtle: '#F6EFCF',
          contrast: '#EDE2C2',
        },
        ink: {
          DEFAULT: '#1E2229', // Deep charcoal
          secondary: '#4A5260', // Muted charcoal
          muted: '#696D7D', // Slate
          light: '#8F97A4',
        },
        rail: {
          coral: '#DC8665',
          teal: '#138086',
          purple: '#534666',
          rose: '#CD7672',
          amber: '#EEB462',
          slate: '#696D7D',
          tea: '#C8D5B9',
          mutedTeal: '#8FC0A9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'tactile': '0 1px 2px rgba(30, 34, 41, 0.05), 0 3px 8px -2px rgba(30, 34, 41, 0.08)',
        'tactile-hover': '0 2px 4px rgba(30, 34, 41, 0.06), 0 8px 16px -4px rgba(30, 34, 41, 0.10)',
        'tactile-active': '0 1px 1px rgba(30, 34, 41, 0.08), inset 0 2px 3px rgba(30, 34, 41, 0.06)',
        'panel': '0 10px 30px -10px rgba(30, 34, 41, 0.08), 0 1px 2px rgba(30, 34, 41, 0.03)',
        'subtle': '0 1px 3px rgba(30, 34, 41, 0.04)',
      },
      borderRadius: {
        'tactile': '10px',
        'panel': '16px',
      }
    },
  },
  plugins: [],
}

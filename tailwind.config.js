/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#F8F9FA',
        surface: '#FFFFFF',
        subtle: '#F1F3F5',
        border: '#E2E6EA',
        'border-strong': '#CBD5E1',
        brand: {
          900: '#0B192C',
          800: '#102A45',
          700: '#1A3A6B',
          600: '#244F8C',
          500: '#3568B2',
          100: '#EAF1FB',
          50: '#F4F7FC',
        },
        status: {
          positive: '#107E54',
          'positive-bg': '#E6F4EA',
          warning: '#B46808',
          'warning-bg': '#FEF7E0',
          danger: '#B82323',
          'danger-bg': '#FCE8E6',
          ai: '#5B3FA0',
          'ai-bg': '#F2EEFC',
        },
        ink: {
          primary: '#0F172A',
          secondary: '#334155',
          muted: '#64748B',
          faint: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'sm-subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'drawer': '-4px 0 24px -2px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}

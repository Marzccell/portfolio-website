/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: '#050816',
        panel: 'rgba(12, 18, 34, 0.62)',
        cyanGlow: '#5ee7ff',
        violetGlow: '#a78bfa',
        solar: '#f8d66d',
      },
      boxShadow: {
        glow: '0 0 48px rgba(94, 231, 255, 0.22)',
        violet: '0 0 42px rgba(167, 139, 250, 0.22)',
      },
      backgroundImage: {
        'radial-grid':
          'radial-gradient(circle at top left, rgba(94,231,255,0.18), transparent 34%), radial-gradient(circle at 80% 20%, rgba(167,139,250,0.16), transparent 30%), linear-gradient(135deg, #050816, #08111f 50%, #070815)',
      },
    },
  },
  plugins: [],
};

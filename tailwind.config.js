/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Inter fonts
        inter: ['Inter', 'sans-serif'],

        // poppins fonts
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // primary colors
        primary: {
          100: '#fffaf6',
          200: '#fff9f4',
          300: '#fff7f1',
          400: '#f7f2ed',
          500: '#d4cdc6',
          600: '#aaa49f',
          700: '#807b77',
          800: '#55524f',
          900: '#333130',
        },

        // neutral/transparent colors
        neutral: {
          100: '#f8f9fa',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        
        // secondary colors
        secondary: {
          50: '#cdcffc',
          100: '#9c9ff8',
          200: '#f0f1fe',
          300: '#8387f7',
          400: '#6a6ff5',
          500: '#585ccc',
          600: '#474aa3',
          700: '#35377a',
          800: '#232552',
          900: '#151631',
        },
        
        // toaster colors
        success: '#55b938',
        info: '#6a6ff5',
        error: '#d10909',
        warning: '#f38920',
      },
    },
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      tab: { max: '900px' },
      // => @media (max-width: 900px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }

      xs: { max: '500px' },
      // => @media (max-width: 500px) { ... }

      xss: { max: '300px' },
      // => @media (max-width: 300px) { ... }
    },
  },
  plugins: [],
};

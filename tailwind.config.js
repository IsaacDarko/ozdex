/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'primary' : '#03112F'
      },
      fontFamily: {
        jockey: ["Jockey One", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        montserratalt: ["Montserrat Alternates", "serif"],
        urbanist: ["Urbanist", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        garamond: ["Garamond", "sans-serif"],
        covered: ["Covered By Your Grace", "open-sans"],
        orbitron: ["Orbitron", "sans-serif"]
      },
      screens: {
        '2xs': '360px',
        // => @media (min-width: 360px) { ... }

        'xs': '412px',
        // => @media (min-width: 412px) { ... }

        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1366px',
         // => @media (min-width: 1366px) { ... }
  
        '3xl': '1536px',
        // => @media (min-width: 1536px) { ... }

        '4xl': '1920px',
         // => @media (min-width: 1926px) { ... }
        
        '4k': '3830px',
        // => @media (min-width: 3840px) { ... }
      }
    },
  },
  plugins: [],
}


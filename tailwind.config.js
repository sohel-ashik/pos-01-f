/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            'maindeep-1': '#040D12',
            'maindeep-2': '#183D3D',
            'maindeep-3': '#5C8374',
            'maindeep-4': '#93B1A6',
            'red-1': '#C70039',
            'red-2': '#FF6969',
            'green-1': '#5B9A8B'
          },
      },
    },
    daisyui: {
        themes: ["light", "dark", "cupcake"],
      },
    plugins: [require("daisyui")],
    
  }

  
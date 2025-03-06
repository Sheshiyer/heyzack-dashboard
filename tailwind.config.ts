import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'heyzack-black': '#121212',
        'heyzack-dark': '#1E1E1E',
        'heyzack-gray': '#2D2D2D',
        'heyzack-light-gray': '#3D3D3D',
        'heyzack-purple': '#7928CA',
        'heyzack-magenta': '#FF0080',
        'heyzack-gradient-start': '#7928CA',
        'heyzack-gradient-end': '#FF0080',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "heyzack-gradient": "linear-gradient(to right, #7928CA, #FF0080)",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;

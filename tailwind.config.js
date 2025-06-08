/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--color-bg-primary)",
        "bg-secondary": "var(--color-bg-secondary)",
        "bg-tertiary": "var(--color-bg-tertiary)",
        "bg-quaternary": "var(--color-bg-quaternary)",

        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",
        "color-accent": "var(--color-accent)",
        "color-accent-light": "var(--color-accent-light)",

        "color-success": "var(--color-success)",
        "color-warning": "var(--color-warning)",
        "color-danger": "var(--color-danger)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        "primary-hover": "var(--primary-hover-color)",

        secondary: "var(--secondary-color)",
        "secondary-hover": "var(--secondary-hover-color)",

        success: "var(--success-color)",
        "success-hover": "var(--success-hover-color)",

        warning: "var(--warning-color)",
        "warning-hover": "var(--warning-hover-color)",

        error: "var(--error-color)",
        "error-hover": "var(--error-hover-color)",

        background: "var(--background-color)",
        surface: "var(--surface-color)",

        border: "var(--border-color)",
        "border-hover": "var(--border-hover-color)",

        text: "var(--text-color)",
        "text-muted": "var(--text-muted-color)",
        "text-inverted": "var(--text-inverted-color)",

        disabled: "var(--disabled-bg-color)",
        "disabled-text": "var(--disabled-text-color)",

        focus: "var(--focus-ring-color)",
      },
    },
  },
  plugins: [],
}


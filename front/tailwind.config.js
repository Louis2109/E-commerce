/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF4500",
          dark: "#E63E00",
        },
        background: {
          light: "#FFFFFF",
          dark: "#0F0F0F",
        },
        surface: {
          light: "#F8F9FA",
          "light-secondary": "#F5F5F5",
          dark: "#1F1F1F",
          "dark-secondary": "#2A2A2A",
        },
        text: {
          "primary-light": "#1A1A1A",
          "secondary-light": "#6B7280",
          "muted-light": "#9CA3AF",
          "primary-dark": "#FFFFFF",
          "secondary-dark": "#B0B0B0",
          "muted-dark": "#6B7280",
        },
        border: {
          light: "#E5E7EB",
          dark: "#374151",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        accent: {
          yellow: "#FCD34D",
          "cream-light": "#FEF7ED",
          "cream-dark": "#292524",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      fontSize: {
        "heading-large": "32px",
        "heading-medium": "24px",
        "heading-small": "20px",
        "body-large": "18px",
        "body-regular": "16px",
        "body-small": "14px",
        caption: "12px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
      },
      borderRadius: {
        small: "8px",
        medium: "12px",
        large: "16px",
        "extra-large": "24px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.06)",
        modal: "0 8px 24px rgba(0, 0, 0, 0.12)",
        floating: "0 4px 16px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "slide-up": "slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        culturin: {
          primary: "#333333", // Dark Gray
          secondary: "#8A898C", // Medium Gray
          accent: "#1A1F2C", // Dark Purple
          white: "#F6F6F7", // Light Gray
          charcoal: "#4A4A4A", // Soft Charcoal (updated)
          highlight: "#8E9196", // Neutral Gray
          subtle: "#F1F1F1", // Light Gray
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "subtle-scale": {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.02)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-right": "fade-in-right 0.6s ease-out forwards",
        "hover-scale": "subtle-scale 0.3s ease-out forwards",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.06)",
        card: "0 8px 30px rgba(0, 0, 0, 0.08)",
        editorial: "0px 8px 16px rgba(0, 0, 0, 0.04)",
        "editorial-hover": "0px 12px 24px rgba(0, 0, 0, 0.03)",
      },
      spacing: {
        "18": "4.5rem",
        "30": "7.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      height: {
        "screen-90": "90vh",
      },
      dropShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.15)",
      },
      textShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.25)",
        DEFAULT: "0 2px 6px rgba(0, 0, 0, 0.3)",
        lg: "0 4px 8px rgba(0, 0, 0, 0.25)",
      },
      opacity: {
        "15": "0.15",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-textshadow"), // Adding textShadow plugin
  ],
} satisfies Config;

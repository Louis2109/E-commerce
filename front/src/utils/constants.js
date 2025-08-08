// Design system constants from design-system.json
export const COLORS = {
  light: {
    primary: "#FF4500",
    primaryDark: "#E63E00",
    background: "#FFFFFF",
    surface: "#F8F9FA",
    surfaceSecondary: "#F5F5F5",
    textPrimary: "#1A1A1A",
    textSecondary: "#6B7280",
    textMuted: "#9CA3AF",
    border: "#E5E7EB",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    accentYellow: "#FCD34D",
    accentCream: "#FEF7ED",
  },
  dark: {
    primary: "#FF4500",
    primaryDark: "#E63E00",
    background: "#0F0F0F",
    surface: "#1F1F1F",
    surfaceSecondary: "#2A2A2A",
    textPrimary: "#FFFFFF",
    textSecondary: "#B0B0B0",
    textMuted: "#6B7280",
    border: "#374151",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    accentYellow: "#FCD34D",
    accentCream: "#292524",
  },
};

export const FONT_SIZES = {
  headingLarge: "32px",
  headingMedium: "24px",
  headingSmall: "20px",
  bodyLarge: "18px",
  bodyRegular: "16px",
  bodySmall: "14px",
  caption: "12px",
  button: "16px",
};

export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
};

export const BORDER_RADIUS = {
  small: "8px",
  medium: "12px",
  large: "16px",
  extraLarge: "24px",
  full: "50%",
};

export const BREAKPOINTS = {
  mobile: "0px",
  tablet: "768px",
  desktop: "1024px",
};

// App constants
export const APP_NAME = "Mervason Marketplace";
export const API_BASE_URL = "http://localhost:5000/api";

export const USER_ROLES = {
  VISITOR: "visitor",
  CLIENT: "client",
  MERCHANT: "merchant",
  ADMIN: "admin",
};

export const PAYMENT_METHODS = {
  ORANGE_MONEY: "orange_money",
  MOBILE_MONEY: "mobile_money",
  VISA: "visa",
  WHATSAPP: "whatsapp",
};

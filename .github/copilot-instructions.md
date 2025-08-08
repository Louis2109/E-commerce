# Mervason Marketplace - AI Coding Instructions

## Project Overview

Mervason Marketplace is a multi-vendor e-commerce platform with three user roles: visitors (browse freely), clients (purchase with account), and merchants (sell with subscription). The stack is React+Vite frontend with planned Node.js+Express+PostgreSQL backend.

## Architecture & Structure

**Frontend (`/front`):**

- React+Vite with Tailwind CSS and mobile-first responsive design
- Component hierarchy: `ui/` (Button, Card, Input) → `layout/` (Header, Footer) → `pages/` (Home, Products, Login, Register)
- Design system driven by `design-system.json` with extensive color palette for light/dark modes
- Custom Tailwind theme with semantic color tokens (e.g., `text-primary-light`, `bg-surface-dark`)

**Key Files:**

- `design-system.json` - Complete design specification with colors, typography, components
- `tailwind.config.js` - Custom theme extending design system colors and utilities
- `src/utils/constants.js` - App constants including user roles and payment methods
- `src/utils/cn.js` - Utility for merging Tailwind classes with clsx+tailwind-merge

## Design System Conventions

**Color System:**

- Primary brand: `#FF4500` (orange) with consistent light/dark mode variations
- Semantic naming: `text-primary-light`/`text-primary-dark` instead of arbitrary values
- All colors defined in both Tailwind config and constants.js for consistency

**Component Patterns:**

- Use `React.forwardRef` for all UI components (Button, Card, Input)
- `cn()` utility for conditional styling: `cn("base-classes", variants[variant], className)`
- Component variants via object mapping (see Button.jsx variants)
- CSS classes use `@layer components` for reusable button/card styles

## Payment Integration Strategy

- **Multi-provider**: CinetPay/Flutterwave for cards, Orange Money/Mobile Money for local payments
- **WhatsApp fallback**: Alternative payment flow redirecting to WhatsApp contact
- **User roles**: Visitors browse freely, clients need accounts to purchase, merchants need subscription to sell

## Development Workflow

**Frontend Development:**

```bash
cd front && npm run dev  # Vite dev server on port 3000
npm run build           # Production build
npm run lint           # ESLint with React hooks rules
```

**Project Structure:**

- Backend planned but not implemented (`/back` is empty)
- Design mockups available as `light-mode.jpg` and `dark-mode.jpg`
- Full specifications in French PDF: `Cahier de Charges - Mervason marketplace.pdf`

## Critical Implementation Notes

**CSS Setup:**

- Must install Tailwind CSS IntelliSense extension for `@apply` directive support
- Custom font: Inter from Google Fonts loaded in index.css
- Responsive breakpoints: mobile (0-767px), tablet (768px-1023px), desktop (1024px+)

**Missing Dependencies:**

- Install: `clsx tailwind-merge` for the cn() utility
- Install: `lucide-react framer-motion react-router-dom` for icons/animations/routing

**Component Development:**

- Follow the established pattern in Button.jsx for variant-based styling
- Use semantic color tokens from constants.js rather than hardcoded values
- Implement mobile-first responsive design with Tailwind breakpoint prefixes
- All interactive elements should have proper focus states and accessibility

**Integration Points:**

- Backend API planned at `http://localhost:5000/api` (see constants.js)
- File structure ready for common components (ProductCard, CategoryCard not yet implemented)
- Authentication flow designed for login/register pages (components exist but empty)

## Next Development Priorities

1. Complete empty page components (Login, Register, Products, Footer)
2. Implement ProductCard and CategoryCard components based on design-system.json specs
3. Build backend API following the user role and payment method structure
4. Integrate payment providers (CinetPay/Flutterwave) and WhatsApp redirect functionality

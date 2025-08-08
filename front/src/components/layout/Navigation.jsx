import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../../utils/cn";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
  ];

  return (
    <nav className="w-full">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "text-base font-medium transition-colors",
              "hover:text-primary-light dark:hover:text-primary-dark"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 p-4 shadow-lg">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block py-2 text-base font-medium hover:text-primary-light dark:hover:text-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

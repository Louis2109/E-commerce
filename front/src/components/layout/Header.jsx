import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-medium flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-heading-small text-text-primary-light dark:text-text-primary-dark">
              Mervason
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full pl-10 pr-4 py-3 rounded-large bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/products"
              className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
            >
              Produits
            </Link>
            <Button variant="icon">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Link to="/login">
              <Button variant="secondary" size="sm">
                Connexion
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">S'inscrire</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-light dark:border-border-dark">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-3 rounded-large bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-4">
              <Link
                to="/products"
                className="block text-text-primary-light dark:text-text-primary-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Produits
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary-light dark:text-text-secondary-dark">
                  Panier
                </span>
                <ShoppingCart className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
              </div>
              <div className="flex space-x-4 pt-4">
                <Link to="/login" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button className="w-full">S'inscrire</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

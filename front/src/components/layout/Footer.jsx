import React from "react";

export default function Footer() {
  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-6 text-center text-text-secondary-light dark:text-text-secondary-dark text-body-small">
      © {new Date().getFullYear()} Mervason Marketplace. Tous droits réservés.
    </footer>
  );
}

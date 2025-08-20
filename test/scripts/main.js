// 🤖 Main JavaScript file for Mervason Marketplace (compiled from TypeScript)

// Global State Management
class AppState {
  constructor() {
    this.user = null;
    this.cart = [];
    this.darkMode = false;
    this.loadFromStorage();
    this.initializeDarkMode();
  }

  static getInstance() {
    if (!AppState.instance) {
      AppState.instance = new AppState();
    }
    return AppState.instance;
  }

  // User Management
  setUser(user) {
    this.user = user;
    this.saveToStorage();
  }

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    return this.user !== null;
  }

  // Cart Management
  addToCart(product, quantity = 1) {
    const existingItem = this.cart.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }

    this.saveToStorage();
    this.updateCartUI();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.product.id !== productId);
    this.saveToStorage();
    this.updateCartUI();
  }

  getCart() {
    return this.cart;
  }

  getCartTotal() {
    return this.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  clearCart() {
    this.cart = [];
    this.saveToStorage();
    this.updateCartUI();
  }

  // Dark Mode Management
  setDarkMode(enabled) {
    this.darkMode = enabled;
    const html = document.documentElement;

    if (enabled) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(enabled));
  }

  getDarkMode() {
    return this.darkMode;
  }

  toggleDarkMode() {
    this.setDarkMode(!this.darkMode);
  }

  // Storage Management
  saveToStorage() {
    localStorage.setItem(
      "appState",
      JSON.stringify({
        user: this.user,
        cart: this.cart,
      })
    );
  }

  loadFromStorage() {
    const stored = localStorage.getItem("appState");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.user = data.user || null;
        this.cart = data.cart || [];
      } catch (error) {
        console.error("Error loading app state from storage:", error);
      }
    }
  }

  // Dark Mode Management
  setDarkMode(isDark) {
    this.darkMode = isDark;
    const html = document.documentElement;

    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(isDark));
  }

  toggleDarkMode() {
    this.setDarkMode(!this.darkMode);
  }

  initializeDarkMode() {
    const stored = localStorage.getItem("darkMode");
    if (stored) {
      this.setDarkMode(JSON.parse(stored));
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      this.setDarkMode(prefersDark);
    }
  }

  updateCartUI() {
    const cartBadge = document.getElementById("cartBadge");
    if (cartBadge) {
      const itemCount = this.cart.reduce(
        (count, item) => count + item.quantity,
        0
      );
      cartBadge.textContent = itemCount.toString();
      cartBadge.style.display = itemCount > 0 ? "block" : "none";
    }
  }
}

// Global app instance
const app = AppState.getInstance();

// Utility Functions
class Utils {
  static formatPrice(price) {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  }

  static formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("237")) {
      return (
        "+" +
        cleaned.slice(0, 3) +
        " " +
        cleaned.slice(3, 4) +
        " " +
        cleaned.slice(4, 6) +
        " " +
        cleaned.slice(6, 8) +
        " " +
        cleaned.slice(8, 10)
      );
    }
    return phone;
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone) {
    const phoneRegex = /^(\+237|237)?[26][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  }

  static debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  static showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-transform duration-300 translate-x-full ${
      type === "success"
        ? "bg-green-600 text-white"
        : type === "error"
        ? "bg-red-600 text-white"
        : "bg-blue-600 text-white"
    }`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("translate-x-full");
    }, 100);

    setTimeout(() => {
      toast.classList.add("translate-x-full");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  static generateWhatsAppLink(phone, message) {
    const encodedMessage = encodeURIComponent(message);
    const cleanPhone = phone.replace(/\D/g, "");
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  }

  static trackEvent(eventName, eventData) {
    console.log(`Track: ${eventName}`, eventData);
  }
}

// Common DOM Manipulation Functions
class DOMUtils {
  static createElement(tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }

  static createProductCard(product) {
    const card = this.createElement(
      "div",
      "product-card group cursor-pointer animate-fade-in"
    );

    card.innerHTML = `
            <div class="product-card-image relative">
                <img src="${product.image}" alt="${
      product.title
    }" class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105">
                <div class="absolute top-3 right-3">
                    <span class="product-price-badge">
                        ${Utils.formatPrice(product.price)}
                    </span>
                </div>
                ${
                  product.originalPrice
                    ? `<div class="absolute top-3 left-3">
                        <span class="bg-error text-white text-xs px-2 py-1 rounded-pill font-medium">
                            -${Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}%
                        </span>
                    </div>`
                    : ""
                }
            </div>
            <div class="pt-4">
                <h3 class="text-subtitle text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">${
                  product.title
                }</h3>
                <div class="flex items-center space-x-2 mb-3">
                    ${this.createStarRating(product.rating)}
                    <span class="text-caption text-gray-500 dark:text-gray-400">(${
                      product.reviewCount
                    })</span>
                </div>
                <div class="flex items-center justify-between mb-4">
                    <div class="flex flex-col">
                        ${
                          product.originalPrice
                            ? `<span class="text-caption text-gray-400 line-through">${Utils.formatPrice(
                                product.originalPrice
                              )}</span>`
                            : ""
                        }
                        <span class="text-h3 font-bold text-gray-900 dark:text-white">${Utils.formatPrice(
                          product.price
                        )}</span>
                    </div>
                    <span class="text-overline px-3 py-1 rounded-pill ${
                      product.inStock
                        ? "bg-success/10 text-success"
                        : "bg-error/10 text-error"
                    }">
                        ${product.inStock ? "EN STOCK" : "ÉPUISÉ"}
                    </span>
                </div>
                <div class="flex space-x-2">
                    <button class="btn-primary flex-1 text-center justify-center" 
                            onclick="app.addToCart(${JSON.stringify(
                              product
                            ).replace(
                              /"/g,
                              "&quot;"
                            )}, 1); event.stopPropagation();">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6"></path>
                        </svg>
                        Ajouter
                    </button>
                    <button class="btn-outline p-3" 
                            onclick="window.open('https://wa.me/237000000000?text=Je suis intéressé par ${encodeURIComponent(
                              product.title
                            )} - ${Utils.formatPrice(
      product.price
    )}', '_blank'); event.stopPropagation();">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

    card.addEventListener("click", () => {
      Utils.trackEvent("click_product_card", { productId: product.id });
      window.location.href = `product.html?id=${product.id}`;
    });

    return card;
  }

  static createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return `
            ${Array(fullStars)
              .fill(
                '<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
              )
              .join("")}
            ${
              hasHalfStar
                ? '<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
                : ""
            }
            ${Array(emptyStars)
              .fill(
                '<svg class="w-4 h-4 text-gray-300 dark:text-gray-600 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
              )
              .join("")}
        `;
  }

  static showLoading(element) {
    element.innerHTML = `
            <div class="flex items-center justify-center py-8">
                <svg class="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        `;
  }
}

// Global Event Handlers
function toggleDarkMode() {
  app.toggleDarkMode();
  Utils.trackEvent("toggle_dark_mode", { enabled: app.getDarkMode() });
}

function toggleProfileMenu() {
  const menu = document.getElementById("profileMenu");
  if (menu) {
    menu.classList.toggle("hidden");
  }
}

function toggleMobileSearch() {
  const search = document.getElementById("mobileSearch");
  if (search) {
    search.classList.toggle("hidden");
  }
}

function logout() {
  app.setUser(null);
  app.clearCart();
  Utils.showToast("Vous avez été déconnecté", "info");
  Utils.trackEvent("logout");
  window.location.href = "index.html";
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Close profile menu when clicking outside
  document.addEventListener("click", (event) => {
    const menu = document.getElementById("profileMenu");
    const button = event.target;

    if (
      menu &&
      !menu.contains(button) &&
      !button.closest('[onclick*="toggleProfileMenu"]')
    ) {
      menu.classList.add("hidden");
    }
  });

  // Update UI based on auth state
  const user = app.getUser();
  if (user) {
    const profileMenu = document.getElementById("profileMenu");
    if (profileMenu) {
      profileMenu.innerHTML = `
                <a href="account.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Mon compte</a>
                <a href="#" onclick="logout()" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Déconnexion</a>
                ${
                  user.role === "merchant"
                    ? '<div class="border-t border-gray-200 dark:border-gray-600"></div><a href="merchant/dashboard.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Espace vendeur</a>'
                    : ""
                }
                <div class="border-t border-gray-200 dark:border-gray-600"></div>
                <button onclick="toggleDarkMode()" class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span class="dark:hidden">Mode sombre</span>
                    <span class="hidden dark:inline">Mode clair</span>
                </button>
            `;
    }
  }

  // Track page view
  Utils.trackEvent("page_view", {
    page: window.location.pathname,
    user: user ? "authenticated" : "guest",
  });

  // Load featured products on home page
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("test/")
  ) {
    loadFeaturedProducts();
  }
});

// Mock data for demonstration
const mockProducts = [
  {
    id: "1",
    title: "Smartphone XYZ Pro",
    price: 299000,
    originalPrice: 349000,
    image: "https://via.placeholder.com/400x400/FFD700/333333?text=Smartphone",
    rating: 4.5,
    reviewCount: 127,
    category: "electronics",
    inStock: true,
    description:
      'Smartphone haut de gamme avec écran AMOLED 6.7", processeur octa-core, 128GB de stockage et appareil photo 108MP.',
    seller: {
      name: "TechMaster Store",
      rating: 4.8,
      salesCount: 1234,
    },
  },
  {
    id: "2",
    title: "Casque Bluetooth Premium",
    price: 85000,
    image: "https://via.placeholder.com/400x400/FFD700/333333?text=Casque",
    rating: 4.2,
    reviewCount: 89,
    category: "electronics",
    inStock: true,
  },
  {
    id: "3",
    title: "Montre Connectée Sport",
    price: 145000,
    originalPrice: 165000,
    image: "https://via.placeholder.com/400x400/FFD700/333333?text=Montre",
    rating: 4.7,
    reviewCount: 203,
    category: "electronics",
    inStock: true,
  },
  {
    id: "4",
    title: "Sac à Dos Design",
    price: 35000,
    image: "https://via.placeholder.com/400x400/FFD700/333333?text=Sac",
    rating: 4.3,
    reviewCount: 156,
    category: "fashion",
    inStock: false,
  },
];

function loadFeaturedProducts() {
  const grid = document.getElementById("featuredProducts");
  if (!grid) return;

  DOMUtils.showLoading(grid);

  setTimeout(() => {
    grid.innerHTML = "";
    mockProducts.forEach((product) => {
      const card = DOMUtils.createProductCard(product);
      grid.appendChild(card);
    });
  }, 500);
}

// Export globals
window.app = app;
window.Utils = Utils;
window.DOMUtils = DOMUtils;
window.mockProducts = mockProducts;

// Theme Toggle Function
function toggleTheme() {
  app.toggleDarkMode();
}

// Profile Menu Toggle
function toggleProfileMenu() {
  const menu = document.getElementById("profileMenu");
  if (menu) {
    menu.classList.toggle("hidden");
  }
}

// Update Cart and Favorites Badges
function updateAllBadges() {
  // Update cart badges
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const cartBadges = ["cart-badge", "mobile-cart-badge"];
  cartBadges.forEach((badgeId) => {
    const badge = document.getElementById(badgeId);
    if (badge) {
      badge.textContent = totalCartItems;
      badge.style.display = totalCartItems > 0 ? "flex" : "none";
    }
  });

  // Update favorites badges
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const totalFavorites = favorites.length;

  const favoritesBadges = ["favorites-badge", "mobile-favorites-badge"];
  favoritesBadges.forEach((badgeId) => {
    const badge = document.getElementById(badgeId);
    if (badge) {
      badge.textContent = totalFavorites;
      badge.style.display = totalFavorites > 0 ? "flex" : "none";
    }
  });
}

// Initialize theme toggle and badges when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Setup theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Update all badges
  updateAllBadges();

  // Load featured products if on home page
  if (document.getElementById("featuredProducts")) {
    loadFeaturedProducts();
  }

  // Close profile menu when clicking outside
  document.addEventListener("click", function (event) {
    const profileMenu = document.getElementById("profileMenu");
    const profileButton = event.target.closest(
      '[onclick="toggleProfileMenu()"]'
    );

    if (profileMenu && !profileButton && !profileMenu.contains(event.target)) {
      profileMenu.classList.add("hidden");
    }
  });
});

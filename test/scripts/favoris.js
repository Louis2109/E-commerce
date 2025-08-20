// Favorites functionality
class FavoritesManager {
  constructor() {
    this.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.init();
  }

  init() {
    this.renderFavorites();
    this.updateFavoritesBadges();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", () =>
        this.sortFavorites(sortSelect.value)
      );
    }
  }

  renderFavorites() {
    const favoritesGrid = document.getElementById("favorites-grid");
    const emptyFavorites = document.getElementById("empty-favorites");
    const favoritesCount = document.getElementById("favorites-count");

    if (favoritesCount) {
      favoritesCount.textContent = this.favorites.length;
    }

    if (this.favorites.length === 0) {
      favoritesGrid.style.display = "none";
      emptyFavorites.style.display = "block";
      return;
    }

    favoritesGrid.style.display = "grid";
    emptyFavorites.style.display = "none";

    favoritesGrid.innerHTML = this.favorites
      .map((item) => this.createFavoriteItemHTML(item))
      .join("");
  }

  createFavoriteItemHTML(item) {
    return `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden group">
                <div class="relative">
                    <img src="${item.image}" alt="${
      item.name
    }" class="w-full h-48 object-cover">
                    <button 
                        class="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onclick="favoritesManager.removeFromFavorites('${
                          item.id
                        }')"
                    >
                        <svg class="w-5 h-5 text-red-500" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        ${item.name}
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">${
                      item.seller
                    }</p>
                    <div class="flex items-center mb-3">
                        <div class="flex items-center">
                            ${this.renderStars(item.rating)}
                        </div>
                        <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">(${
                          item.reviews
                        })</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xl font-bold text-primary">${item.price.toLocaleString()} FCFA</span>
                    </div>
                    <div class="mt-4 space-y-2">
                        <button 
                            class="w-full bg-primary hover:bg-primary-dark text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                            onclick="addToCart('${item.id}')"
                        >
                            Ajouter au panier
                        </button>
                        <button 
                            class="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                            onclick="window.location.href='product.html?id=${
                              item.id
                            }'"
                        >
                            Voir détails
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHTML = "";

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML +=
        '<svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
    }

    // Half star
    if (hasHalfStar) {
      starsHTML +=
        '<svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" opacity="0.5"></path></svg>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML +=
        '<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
    }

    return starsHTML;
  }

  addToFavorites(product) {
    const exists = this.favorites.find((item) => item.id === product.id);
    if (!exists) {
      this.favorites.push({
        ...product,
        addedAt: Date.now(),
      });
      this.saveFavorites();
      this.updateFavoritesBadges();
      return true;
    }
    return false;
  }

  removeFromFavorites(productId) {
    const index = this.favorites.findIndex((item) => item.id === productId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
      this.renderFavorites();
      this.updateFavoritesBadges();

      if (window.Utils) {
        Utils.showToast("Produit retiré des favoris", "success");
      }
      return true;
    }
    return false;
  }

  isFavorite(productId) {
    return this.favorites.some((item) => item.id === productId);
  }

  sortFavorites(sortBy) {
    switch (sortBy) {
      case "recent":
        this.favorites.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
        break;
      case "price-low":
        this.favorites.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        this.favorites.sort((a, b) => b.price - a.price);
        break;
      case "name":
        this.favorites.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    this.renderFavorites();
  }

  updateFavoritesBadges() {
    const badges = ["favorites-badge", "mobile-favorites-badge"];
    badges.forEach((badgeId) => {
      const badge = document.getElementById(badgeId);
      if (badge) {
        badge.textContent = this.favorites.length;
        badge.style.display = this.favorites.length > 0 ? "flex" : "none";
      }
    });
  }

  saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
}

// Global functions
function addToCart(productId) {
  const product = favoritesManager.favorites.find(
    (item) => item.id === productId
  );
  if (product) {
    // Get existing cart or create new one
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already in cart
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart badges if cart manager exists
    if (window.cartManager) {
      window.cartManager.cart = cart;
      window.cartManager.updateCartBadges();
    } else {
      // Update badges manually
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      const cartBadges = ["cart-badge", "mobile-cart-badge"];
      cartBadges.forEach((badgeId) => {
        const badge = document.getElementById(badgeId);
        if (badge) {
          badge.textContent = totalItems;
          badge.style.display = totalItems > 0 ? "flex" : "none";
        }
      });
    }

    if (window.Utils) {
      Utils.showToast("Produit ajouté au panier", "success");
    }
  }
}

function clearAllFavorites() {
  if (favoritesManager.favorites.length === 0) {
    if (window.Utils) {
      Utils.showToast("Aucun favori à supprimer", "info");
    }
    return;
  }

  if (confirm("Êtes-vous sûr de vouloir supprimer tous vos favoris ?")) {
    favoritesManager.favorites = [];
    favoritesManager.saveFavorites();
    favoritesManager.renderFavorites();
    favoritesManager.updateFavoritesBadges();

    if (window.Utils) {
      Utils.showToast("Tous les favoris ont été supprimés", "success");
    }
  }
}

// Initialize favorites manager when page loads
let favoritesManager;
document.addEventListener("DOMContentLoaded", function () {
  favoritesManager = new FavoritesManager();

  // Add some sample favorites for demo if empty
  if (favoritesManager.favorites.length === 0) {
    const sampleFavorites = [
      {
        id: "fav-1",
        name: "iPhone 14 Pro Max",
        price: 550000,
        image:
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        seller: "TechStore",
        rating: 4.8,
        reviews: 124,
        addedAt: Date.now() - 86400000, // 1 day ago
      },
      {
        id: "fav-2",
        name: "MacBook Pro M2",
        price: 850000,
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        seller: "CompuWorld",
        rating: 4.9,
        reviews: 89,
        addedAt: Date.now() - 172800000, // 2 days ago
      },
      {
        id: "fav-3",
        name: "AirPods Pro 2",
        price: 125000,
        image:
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400",
        seller: "AudioPlus",
        rating: 4.7,
        reviews: 203,
        addedAt: Date.now() - 259200000, // 3 days ago
      },
    ];

    favoritesManager.favorites = sampleFavorites;
    favoritesManager.saveFavorites();
    favoritesManager.renderFavorites();
    favoritesManager.updateFavoritesBadges();
  }
});

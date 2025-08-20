// Promotions functionality
class PromotionsManager {
  constructor() {
    this.flashDeals = [];
    this.allPromotions = [];
    this.init();
  }

  init() {
    this.loadPromotions();
    this.renderFlashDeals();
    this.renderAllPromotions();
    this.setupEventListeners();
    this.startCountdown();
    this.startFlashTimer();
  }

  setupEventListeners() {
    const discountFilter = document.getElementById("discount-filter");
    const categoryFilter = document.getElementById("category-filter");
    const sortSelect = document.getElementById("sort-select");

    if (discountFilter) {
      discountFilter.addEventListener("change", () => this.applyFilters());
    }
    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => this.applyFilters());
    }
    if (sortSelect) {
      sortSelect.addEventListener("change", () =>
        this.sortPromotions(sortSelect.value)
      );
    }
  }

  loadPromotions() {
    // Sample flash deals data
    this.flashDeals = [
      {
        id: "flash-1",
        name: "iPhone 13 Pro",
        originalPrice: 500000,
        salePrice: 350000,
        discount: 30,
        image:
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        seller: "TechStore",
        rating: 4.8,
        reviews: 124,
        stock: 5,
        category: "electronique",
        endTime: Date.now() + 3 * 60 * 60 * 1000, // 3 hours from now
      },
      {
        id: "flash-2",
        name: "AirPods Pro 2",
        originalPrice: 150000,
        salePrice: 75000,
        discount: 50,
        image:
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400",
        seller: "AudioPlus",
        rating: 4.7,
        reviews: 203,
        stock: 12,
        category: "electronique",
        endTime: Date.now() + 3 * 60 * 60 * 1000,
      },
      {
        id: "flash-3",
        name: "Montre Apple Watch",
        originalPrice: 200000,
        salePrice: 120000,
        discount: 40,
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
        seller: "WatchWorld",
        rating: 4.6,
        reviews: 156,
        stock: 8,
        category: "electronique",
        endTime: Date.now() + 3 * 60 * 60 * 1000,
      },
      {
        id: "flash-4",
        name: "Casque Gaming RGB",
        originalPrice: 80000,
        salePrice: 32000,
        discount: 60,
        image:
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
        seller: "GameZone",
        rating: 4.5,
        reviews: 89,
        stock: 15,
        category: "electronique",
        endTime: Date.now() + 3 * 60 * 60 * 1000,
      },
    ];

    // Sample all promotions data
    this.allPromotions = [
      ...this.flashDeals,
      {
        id: "promo-1",
        name: "Robe d'été élégante",
        originalPrice: 35000,
        salePrice: 24500,
        discount: 30,
        image:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
        seller: "FashionStore",
        rating: 4.4,
        reviews: 67,
        category: "mode",
        endTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      },
      {
        id: "promo-2",
        name: "Chaussures de sport",
        originalPrice: 45000,
        salePrice: 31500,
        discount: 30,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        seller: "SportMax",
        rating: 4.6,
        reviews: 142,
        category: "sport",
        endTime: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5 days
      },
      {
        id: "promo-3",
        name: "Aspirateur sans fil",
        originalPrice: 120000,
        salePrice: 84000,
        discount: 30,
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        seller: "HomeTech",
        rating: 4.3,
        reviews: 95,
        category: "maison",
        endTime: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 days
      },
      {
        id: "promo-4",
        name: "Set de maquillage",
        originalPrice: 25000,
        salePrice: 12500,
        discount: 50,
        image:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
        seller: "BeautyWorld",
        rating: 4.7,
        reviews: 178,
        category: "mode",
        endTime: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days
      },
      {
        id: "promo-5",
        name: 'Tablet Android 10"',
        originalPrice: 180000,
        salePrice: 108000,
        discount: 40,
        image:
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
        seller: "TechWorld",
        rating: 4.5,
        reviews: 234,
        category: "electronique",
        endTime: Date.now() + 6 * 24 * 60 * 60 * 1000, // 6 days
      },
    ];
  }

  renderFlashDeals() {
    const container = document.getElementById("flash-deals");
    if (!container) return;

    container.innerHTML = this.flashDeals
      .map((deal) => this.createFlashDealHTML(deal))
      .join("");
  }

  createFlashDealHTML(deal) {
    const progressPercentage = Math.max(0, 100 - (deal.stock / 20) * 100);

    return `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="relative">
                    <img src="${deal.image}" alt="${
      deal.name
    }" class="w-full h-48 object-cover">
                    <div class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                        -${deal.discount}%
                    </div>
                    <button 
                        class="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onclick="toggleFavorite('${deal.id}')"
                    >
                        <svg class="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        ${deal.name}
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">${
                      deal.seller
                    }</p>
                    <div class="flex items-center mb-3">
                        <div class="flex items-center">
                            ${this.renderStars(deal.rating)}
                        </div>
                        <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">(${
                          deal.reviews
                        })</span>
                    </div>
                    <div class="flex items-center space-x-2 mb-3">
                        <span class="text-xl font-bold text-red-600">${deal.salePrice.toLocaleString()} FCFA</span>
                        <span class="text-sm text-gray-500 line-through">${deal.originalPrice.toLocaleString()} FCFA</span>
                    </div>
                    <div class="mb-3">
                        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <span>Stock restant</span>
                            <span>${deal.stock} pièces</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="bg-red-600 h-2 rounded-full transition-all duration-300" style="width: ${progressPercentage}%"></div>
                        </div>
                    </div>
                    <button 
                        class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        onclick="addToCartFromPromo('${deal.id}')"
                    >
                        Acheter maintenant
                    </button>
                </div>
            </div>
        `;
  }

  renderAllPromotions() {
    const container = document.getElementById("all-promotions");
    if (!container) return;

    container.innerHTML = this.allPromotions
      .map((promo) => this.createPromotionHTML(promo))
      .join("");
  }

  createPromotionHTML(promo) {
    return `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="relative">
                    <img src="${promo.image}" alt="${
      promo.name
    }" class="w-full h-48 object-cover">
                    <div class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                        -${promo.discount}%
                    </div>
                    <button 
                        class="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onclick="toggleFavorite('${promo.id}')"
                    >
                        <svg class="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        ${promo.name}
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">${
                      promo.seller
                    }</p>
                    <div class="flex items-center mb-3">
                        <div class="flex items-center">
                            ${this.renderStars(promo.rating)}
                        </div>
                        <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">(${
                          promo.reviews
                        })</span>
                    </div>
                    <div class="flex items-center space-x-2 mb-3">
                        <span class="text-xl font-bold text-red-600">${promo.salePrice.toLocaleString()} FCFA</span>
                        <span class="text-sm text-gray-500 line-through">${promo.originalPrice.toLocaleString()} FCFA</span>
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Se termine le ${new Date(
                          promo.endTime
                        ).toLocaleDateString("fr-FR")}
                    </div>
                    <div class="space-y-2">
                        <button 
                            class="w-full bg-primary hover:bg-primary-dark text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                            onclick="addToCartFromPromo('${promo.id}')"
                        >
                            Ajouter au panier
                        </button>
                        <button 
                            class="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                            onclick="window.location.href='product.html?id=${
                              promo.id
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

  applyFilters() {
    const discountFilter = document.getElementById("discount-filter").value;
    const categoryFilter = document.getElementById("category-filter").value;

    let filteredPromotions = [...this.allPromotions];

    if (discountFilter) {
      filteredPromotions = filteredPromotions.filter(
        (promo) => promo.discount >= parseInt(discountFilter)
      );
    }

    if (categoryFilter) {
      filteredPromotions = filteredPromotions.filter(
        (promo) => promo.category === categoryFilter
      );
    }

    const container = document.getElementById("all-promotions");
    if (container) {
      container.innerHTML = filteredPromotions
        .map((promo) => this.createPromotionHTML(promo))
        .join("");
    }
  }

  sortPromotions(sortBy) {
    let sortedPromotions = [...this.allPromotions];

    switch (sortBy) {
      case "discount":
        sortedPromotions.sort((a, b) => b.discount - a.discount);
        break;
      case "price-low":
        sortedPromotions.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case "price-high":
        sortedPromotions.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case "ending-soon":
        sortedPromotions.sort((a, b) => a.endTime - b.endTime);
        break;
    }

    const container = document.getElementById("all-promotions");
    if (container) {
      container.innerHTML = sortedPromotions
        .map((promo) => this.createPromotionHTML(promo))
        .join("");
    }
  }

  startCountdown() {
    const endTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days from now

    const updateCountdown = () => {
      const now = Date.now();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = days;
      document.getElementById("hours").textContent = hours
        .toString()
        .padStart(2, "0");
      document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
      document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  startFlashTimer() {
    const flashEndTime = Date.now() + 3 * 60 * 60 * 1000; // 3 hours from now

    const updateFlashTimer = () => {
      const now = Date.now();
      const timeLeft = flashEndTime - now;

      if (timeLeft <= 0) {
        const timerElement = document.getElementById("flash-timer");
        if (timerElement) {
          timerElement.textContent = "00:00:00";
        }
        return;
      }

      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      const timerElement = document.getElementById("flash-timer");
      if (timerElement) {
        timerElement.textContent = `${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
      }
    };

    updateFlashTimer();
    setInterval(updateFlashTimer, 1000);
  }
}

// Global functions
function copyPromoCode(code) {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      if (window.Utils) {
        Utils.showToast(`Code ${code} copié !`, "success");
      } else {
        alert(`Code ${code} copié !`);
      }
    })
    .catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      if (window.Utils) {
        Utils.showToast(`Code ${code} copié !`, "success");
      } else {
        alert(`Code ${code} copié !`);
      }
    });
}

function addToCartFromPromo(productId) {
  const product = promotionsManager.allPromotions.find(
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
        id: product.id,
        name: product.name,
        price: product.salePrice, // Use sale price
        originalPrice: product.originalPrice,
        quantity: 1,
        image: product.image,
        seller: product.seller,
      });
    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart badges
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBadges = ["cart-badge", "mobile-cart-badge"];
    cartBadges.forEach((badgeId) => {
      const badge = document.getElementById(badgeId);
      if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? "flex" : "none";
      }
    });

    if (window.Utils) {
      Utils.showToast("Produit ajouté au panier", "success");
    }
  }
}

function toggleFavorite(productId) {
  const product = promotionsManager.allPromotions.find(
    (item) => item.id === productId
  );
  if (product) {
    // Get existing favorites or create new array
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const existingIndex = favorites.findIndex((item) => item.id === productId);
    if (existingIndex !== -1) {
      // Remove from favorites
      favorites.splice(existingIndex, 1);
      if (window.Utils) {
        Utils.showToast("Retiré des favoris", "success");
      }
    } else {
      // Add to favorites
      favorites.push({
        id: product.id,
        name: product.name,
        price: product.salePrice,
        originalPrice: product.originalPrice,
        image: product.image,
        seller: product.seller,
        rating: product.rating,
        reviews: product.reviews,
        addedAt: Date.now(),
      });
      if (window.Utils) {
        Utils.showToast("Ajouté aux favoris", "success");
      }
    }

    // Save favorites
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Update favorites badges
    const favoritesBadges = ["favorites-badge", "mobile-favorites-badge"];
    favoritesBadges.forEach((badgeId) => {
      const badge = document.getElementById(badgeId);
      if (badge) {
        badge.textContent = favorites.length;
        badge.style.display = favorites.length > 0 ? "flex" : "none";
      }
    });
  }
}

// Initialize promotions manager when page loads
let promotionsManager;
document.addEventListener("DOMContentLoaded", function () {
  promotionsManager = new PromotionsManager();
});

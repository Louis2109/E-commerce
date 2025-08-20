// 🤖 Product page functionality for Mervason Marketplace

let currentProduct = null;

document.addEventListener("DOMContentLoaded", () => {
  loadProduct();
  setupEventListeners();
});

function setupEventListeners() {
  // Accordion toggles
  window.toggleAccordion = (id) => {
    const content = document.getElementById(`${id}-content`);
    const icon = document.getElementById(`${id}-icon`);

    if (content && icon) {
      content.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    }
  };

  // Product actions
  window.addToCart = () => {
    if (!currentProduct) return;

    app.addToCart(currentProduct, 1);
    Utils.showToast("Produit ajouté au panier", "success");
    Utils.trackEvent("add_to_cart", { productId: currentProduct.id });

    // Redirect to checkout
    setTimeout(() => {
      window.location.href = "checkout.html";
    }, 1000);
  };

  window.contactWhatsApp = () => {
    if (!currentProduct) return;

    const message = `Bonjour ! Je suis intéressé(e) par ce produit : ${
      currentProduct.title
    } (${Utils.formatPrice(currentProduct.price)}) - ${window.location.href}`;
    const whatsappLink = Utils.generateWhatsAppLink("+237612345678", message);

    Utils.trackEvent("contact_whatsapp", { productId: currentProduct.id });
    window.open(whatsappLink, "_blank");
  };
}

function loadProduct() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "1";

  // Find product (in real app, this would be an API call)
  currentProduct = findProductById(productId);

  if (!currentProduct) {
    showProductNotFound();
    return;
  }

  renderProduct();
  loadSimilarProducts();

  Utils.trackEvent("view_product", {
    productId: currentProduct.id,
    productTitle: currentProduct.title,
    price: currentProduct.price,
  });
}

function findProductById(id) {
  // First check mock products from main.js
  if (window.mockProducts) {
    const found = window.mockProducts.find((p) => p.id === id);
    if (found) return found;
  }

  // If not found, return default product
  return {
    id: id,
    title: "Smartphone XYZ Pro",
    price: 299000,
    originalPrice: 349000,
    image: "https://via.placeholder.com/600x600/FFD700/333333?text=Produit",
    rating: 4.5,
    reviewCount: 127,
    category: "electronics",
    inStock: true,
    description:
      'Smartphone haut de gamme avec écran AMOLED 6.7", processeur octa-core, 128GB de stockage et appareil photo 108MP. Livraison gratuite incluse.',
    seller: {
      name: "TechMaster Store",
      rating: 4.8,
      salesCount: 1234,
    },
    specifications: {
      Écran: '6.7" AMOLED 4K',
      Processeur: "Octa-core 2.8GHz",
      RAM: "8GB",
      Stockage: "128GB",
      "Appareil photo": "108MP + 12MP",
      Batterie: "4500mAh",
    },
  };
}

function renderProduct() {
  if (!currentProduct) return;

  // Update page title
  document.title = `${currentProduct.title} - Mervason Marketplace`;

  // Update product image
  const mainImage = document.getElementById("mainImage");
  if (mainImage) {
    mainImage.src = currentProduct.image;
    mainImage.alt = currentProduct.title;
  }

  // Update product title
  const productTitle = document.getElementById("productTitle");
  if (productTitle) {
    productTitle.textContent = currentProduct.title;
  }

  // Update price
  const currentPrice = document.getElementById("currentPrice");
  if (currentPrice) {
    currentPrice.textContent = Utils.formatPrice(currentProduct.price).replace(
      " FCFA",
      ""
    );

    // Add discount badge if applicable
    if (currentProduct.originalPrice) {
      const discountPercent = Math.round(
        (1 - currentProduct.price / currentProduct.originalPrice) * 100
      );
      const priceContainer = currentPrice.closest(".mb-6");
      if (priceContainer && !priceContainer.querySelector(".bg-red-100")) {
        const discountBadge = document.createElement("span");
        discountBadge.className =
          "inline-block bg-red-100 text-red-800 text-sm px-2 py-1 rounded-lg mt-2";
        discountBadge.textContent = `-${discountPercent}% de réduction`;
        priceContainer.appendChild(discountBadge);
      }
    }
  }

  // Update rating
  updateRating();

  // Update stock status
  updateStockStatus();

  // Update seller info
  updateSellerInfo();

  // Update description in accordion
  updateProductDetails();
}

function updateRating() {
  if (!currentProduct) return;

  const ratingContainer = document.querySelector(
    ".flex.items-center.space-x-1"
  );
  if (ratingContainer) {
    const starsHtml = DOMUtils.createStarRating(currentProduct.rating);
    const reviewText = `${currentProduct.rating} (${currentProduct.reviewCount} avis)`;

    ratingContainer.innerHTML = `
            <div class="flex items-center space-x-1">
                ${starsHtml}
                <span class="text-sm text-gray-600 dark:text-gray-300">${reviewText}</span>
            </div>
        `;
  }
}

function updateStockStatus() {
  if (!currentProduct) return;

  const stockElement = document.querySelector(".text-green-600");
  if (stockElement) {
    if (currentProduct.inStock) {
      stockElement.textContent = "En stock";
      stockElement.className = "text-sm text-green-600 dark:text-green-400";
    } else {
      stockElement.textContent = "Épuisé";
      stockElement.className = "text-sm text-red-600 dark:text-red-400";
    }
  }
}

function updateSellerInfo() {
  if (!currentProduct?.seller) return;

  const sellerContainer = document.querySelector(".bg-surface");
  if (sellerContainer) {
    const seller = currentProduct.seller;
    const initials = seller.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2);

    sellerContainer.innerHTML = `
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vendeur</h3>
            <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span class="text-white font-semibold">${initials}</span>
                </div>
                <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">${seller.name}</h4>
                    <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <span>${seller.rating}/5</span>
                        <span>•</span>
                        <span>${seller.salesCount} ventes</span>
                    </div>
                </div>
                <button class="ml-auto text-primary hover:text-primary-dark font-medium">
                    Voir la boutique
                </button>
            </div>
        `;
  }
}

function updateProductDetails() {
  if (!currentProduct) return;

  // Update description
  const descriptionContent = document.getElementById("description-content");
  if (descriptionContent) {
    descriptionContent.innerHTML = `
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                ${currentProduct.description}
            </p>
        `;
  }

  // Update specifications
  const specsContent = document.getElementById("specs-content");
  if (specsContent && currentProduct.specifications) {
    const specs = currentProduct.specifications;
    const specsHtml = Object.entries(specs)
      .map(
        ([key, value]) => `
            <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300">${key}:</span>
                <span class="text-gray-900 dark:text-white">${value}</span>
            </div>
        `
      )
      .join("");

    specsContent.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    ${specsHtml}
                </div>
            </div>
        `;
  }
}

function loadSimilarProducts() {
  const similarGrid = document.getElementById("similarProducts");
  if (!similarGrid || !currentProduct) return;

  // Generate similar products (in real app, this would be an API call)
  const similarProducts = generateSimilarProducts(currentProduct, 4);

  similarGrid.innerHTML = "";
  similarProducts.forEach((product) => {
    const card = DOMUtils.createProductCard(product);
    similarGrid.appendChild(card);
  });
}

function generateSimilarProducts(baseProduct, count) {
  const products = [];
  const adjectives = ["Premium", "Pro", "Ultra", "Smart", "Elite", "Classic"];

  for (let i = 0; i < count; i++) {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const basePrice = Math.floor(Math.random() * 200000) + 50000;

    products.push({
      id: `similar-${i + 1}`,
      title: `${adjective} ${baseProduct.category} ${i + 1}`,
      price: basePrice,
      originalPrice: Math.random() > 0.5 ? Math.floor(basePrice * 1.2) : null,
      image: `https://via.placeholder.com/400x400/FFD700/333333?text=${adjective}`,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      reviewCount: Math.floor(Math.random() * 100) + 10,
      category: baseProduct.category,
      inStock: true,
    });
  }

  return products;
}

function showProductNotFound() {
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = `
            <div class="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
                <svg class="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Produit non trouvé</h1>
                <p class="text-gray-600 dark:text-gray-300 mb-8">Le produit que vous recherchez n'existe pas ou n'est plus disponible.</p>
                <div class="space-x-4">
                    <a href="catalog.html" class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Voir le catalogue
                    </a>
                    <a href="index.html" class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Retour à l'accueil
                    </a>
                </div>
            </div>
        `;
  }
}

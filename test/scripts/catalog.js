// 🤖 Catalog page functionality for Mervason Marketplace

let currentFilters = {
  search: "",
  categories: [],
  minPrice: null,
  maxPrice: null,
  sortBy: "newest",
};

let allProducts = [];
let displayedProducts = [];
let currentPage = 1;
const productsPerPage = 12;

// Initialize catalog page
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupEventListeners();

  // Check URL parameters for filters
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("cat")) {
    const category = urlParams.get("cat");
    currentFilters.categories = [category];
    updateCategoryFilters();
  }
  if (urlParams.has("search")) {
    const search = urlParams.get("search");
    currentFilters.search = search;
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = search;
  }

  applyFilters();
});

function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      Utils.debounce((e) => {
        currentFilters.search = e.target.value;
        applyFilters();
        updateURL();
      }, 300)
    );
  }

  // Sort select
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentFilters.sortBy = e.target.value;
      applyFilters();
    });
  }

  // Category checkboxes
  const categoryCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]'
  );
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const category = e.target.nextElementSibling.textContent
        .trim()
        .toLowerCase();
      if (e.target.checked) {
        if (!currentFilters.categories.includes(category)) {
          currentFilters.categories.push(category);
        }
      } else {
        currentFilters.categories = currentFilters.categories.filter(
          (c) => c !== category
        );
      }
      applyFilters();
      updateURL();
    });
  });

  // Price filter
  const priceForm = document.querySelector(".space-y-3");
  if (priceForm) {
    const applyBtn = priceForm.querySelector("button");
    if (applyBtn) {
      applyBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const minInput = priceForm.querySelector('input[placeholder="Min"]');
        const maxInput = priceForm.querySelector('input[placeholder="Max"]');

        currentFilters.minPrice = minInput.value
          ? parseInt(minInput.value)
          : null;
        currentFilters.maxPrice = maxInput.value
          ? parseInt(maxInput.value)
          : null;

        applyFilters();
      });
    }
  }

  // Load more button
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadMoreProducts);
  }

  // Clear filters
  const clearFiltersBtn = document.querySelector(
    ".text-primary.hover\\:text-primary-dark"
  );
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", clearFilters);
  }
}

function loadProducts() {
  // Simulate API call with mock data
  allProducts = generateMockProducts(50);
  applyFilters();
}

function generateMockProducts(count) {
  const categories = ["électronique", "mode", "maison", "beauté"];
  const adjectives = [
    "Premium",
    "Pro",
    "Ultra",
    "Smart",
    "Elite",
    "Classic",
    "Modern",
    "Luxury",
  ];
  const products = [];

  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const basePrice = Math.floor(Math.random() * 500000) + 10000;
    const hasDiscount = Math.random() > 0.7;

    products.push({
      id: i.toString(),
      title: `${adjective} ${
        category.charAt(0).toUpperCase() + category.slice(1)
      } ${i}`,
      price: hasDiscount ? Math.floor(basePrice * 0.8) : basePrice,
      originalPrice: hasDiscount ? basePrice : null,
      image: `https://via.placeholder.com/400x400/FFD700/333333?text=${category}+${i}`,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      reviewCount: Math.floor(Math.random() * 200) + 5,
      category: category,
      inStock: Math.random() > 0.1,
      description: `Description du produit ${adjective} ${category} avec toutes ses caractéristiques.`,
      seller: {
        name: `Store ${String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        )}`,
        rating: Math.round((Math.random() * 1 + 4) * 10) / 10,
        salesCount: Math.floor(Math.random() * 1000) + 50,
      },
    });
  }

  return products;
}

function applyFilters() {
  let filtered = [...allProducts];

  // Search filter
  if (currentFilters.search) {
    const searchTerm = currentFilters.search.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  }

  // Category filter
  if (currentFilters.categories.length > 0) {
    filtered = filtered.filter((product) =>
      currentFilters.categories.some((cat) =>
        product.category.toLowerCase().includes(cat.toLowerCase())
      )
    );
  }

  // Price filter
  if (currentFilters.minPrice !== null) {
    filtered = filtered.filter(
      (product) => product.price >= currentFilters.minPrice
    );
  }
  if (currentFilters.maxPrice !== null) {
    filtered = filtered.filter(
      (product) => product.price <= currentFilters.maxPrice
    );
  }

  // Sort
  switch (currentFilters.sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
    default:
      // Keep original order (newest first)
      break;
  }

  displayedProducts = filtered;
  currentPage = 1;
  renderProducts();
  updateResultCount();

  Utils.trackEvent("filter_products", currentFilters);
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const emptyState = document.getElementById("emptyState");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (!grid) return;

  if (displayedProducts.length === 0) {
    grid.classList.add("hidden");
    if (emptyState) emptyState.classList.remove("hidden");
    if (loadMoreBtn) loadMoreBtn.classList.add("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");
  grid.classList.remove("hidden");

  // Show products for current page
  const startIndex = 0;
  const endIndex = currentPage * productsPerPage;
  const productsToShow = displayedProducts.slice(startIndex, endIndex);

  grid.innerHTML = "";
  productsToShow.forEach((product) => {
    const card = DOMUtils.createProductCard(product);
    grid.appendChild(card);
  });

  // Update load more button
  if (loadMoreBtn) {
    if (endIndex >= displayedProducts.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  }
}

function loadMoreProducts() {
  currentPage++;
  renderProducts();

  Utils.trackEvent("load_more_products", {
    page: currentPage,
    totalProducts: displayedProducts.length,
  });
}

function updateResultCount() {
  const resultCount = document.getElementById("resultCount");
  if (resultCount) {
    resultCount.textContent = displayedProducts.length;
  }
}

function updateCategoryFilters() {
  const categoryCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]'
  );
  categoryCheckboxes.forEach((checkbox) => {
    const category = checkbox.nextElementSibling.textContent
      .trim()
      .toLowerCase();
    checkbox.checked = currentFilters.categories.includes(category);
  });
}

function clearFilters() {
  currentFilters = {
    search: "",
    categories: [],
    minPrice: null,
    maxPrice: null,
    sortBy: "newest",
  };

  // Clear UI
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";

  const categoryCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]'
  );
  categoryCheckboxes.forEach((checkbox) => (checkbox.checked = false));

  const priceInputs = document.querySelectorAll('input[type="number"]');
  priceInputs.forEach((input) => (input.value = ""));

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) sortSelect.value = "newest";

  applyFilters();
  updateURL();

  Utils.trackEvent("clear_filters");
}

function updateURL() {
  const params = new URLSearchParams();

  if (currentFilters.search) {
    params.set("search", currentFilters.search);
  }

  if (currentFilters.categories.length > 0) {
    params.set("cat", currentFilters.categories.join(","));
  }

  if (currentFilters.minPrice) {
    params.set("min", currentFilters.minPrice.toString());
  }

  if (currentFilters.maxPrice) {
    params.set("max", currentFilters.maxPrice.toString());
  }

  if (currentFilters.sortBy !== "newest") {
    params.set("sort", currentFilters.sortBy);
  }

  const newURL = params.toString()
    ? `?${params.toString()}`
    : window.location.pathname;
  window.history.replaceState({}, "", newURL);
}

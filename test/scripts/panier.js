// Panier functionality
class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.init();
  }

  init() {
    this.renderCart();
    this.updateCartSummary();
    this.updateCartBadges();
  }

  renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const emptyCartState = document.getElementById("empty-cart");
    const cartSummary = document.getElementById("cart-summary");

    if (this.cart.length === 0) {
      cartItemsContainer.style.display = "none";
      emptyCartState.style.display = "block";
      cartSummary.style.display = "none";
      return;
    }

    cartItemsContainer.style.display = "block";
    emptyCartState.style.display = "none";
    cartSummary.style.display = "block";

    cartItemsContainer.innerHTML = this.cart
      .map((item) => this.createCartItemHTML(item))
      .join("");
  }

  createCartItemHTML(item) {
    return `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div class="flex items-center space-x-4">
                    <img src="${item.image}" alt="${
      item.name
    }" class="w-20 h-20 object-cover rounded-lg">
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${
                          item.name
                        }</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">${
                          item.seller
                        }</p>
                        <p class="text-lg font-bold text-primary">${item.price.toLocaleString()} FCFA</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button 
                            class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                            onclick="cartManager.updateQuantity('${item.id}', ${
      item.quantity - 1
    })"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                            </svg>
                        </button>
                        <span class="w-8 text-center font-semibold">${
                          item.quantity
                        }</span>
                        <button 
                            class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                            onclick="cartManager.updateQuantity('${item.id}', ${
      item.quantity + 1
    })"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                        </button>
                    </div>
                    <button 
                        class="text-red-500 hover:text-red-700 p-2"
                        onclick="cartManager.removeItem('${item.id}')"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
  }

  updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeItem(itemId);
      return;
    }

    const itemIndex = this.cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      this.cart[itemIndex].quantity = newQuantity;
      this.saveCart();
      this.renderCart();
      this.updateCartSummary();
      this.updateCartBadges();
    }
  }

  removeItem(itemId) {
    this.cart = this.cart.filter((item) => item.id !== itemId);
    this.saveCart();
    this.renderCart();
    this.updateCartSummary();
    this.updateCartBadges();

    // Show success toast
    if (window.Utils) {
      Utils.showToast("Produit retiré du panier", "success");
    }
  }

  updateCartSummary() {
    const subtotal = this.calculateSubtotal();
    const shipping = subtotal > 0 ? 2000 : 0; // Free shipping over certain amount could be added
    const total = subtotal + shipping;

    const subtotalElement = document.getElementById("subtotal");
    const shippingElement = document.getElementById("shipping");
    const totalElement = document.getElementById("total");
    const checkoutBtn = document.getElementById("checkout-btn");
    const cartItemsCount = document.getElementById("cart-items-count");

    if (subtotalElement)
      subtotalElement.textContent = `${subtotal.toLocaleString()} FCFA`;
    if (shippingElement)
      shippingElement.textContent = `${shipping.toLocaleString()} FCFA`;
    if (totalElement)
      totalElement.textContent = `${total.toLocaleString()} FCFA`;
    if (cartItemsCount) cartItemsCount.textContent = this.cart.length;

    // Enable/disable checkout button
    if (checkoutBtn) {
      checkoutBtn.disabled = this.cart.length === 0;
    }
  }

  calculateSubtotal() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  updateCartBadges() {
    const totalItems = this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Update all cart badges
    const badges = ["cart-badge", "mobile-cart-badge"];
    badges.forEach((badgeId) => {
      const badge = document.getElementById(badgeId);
      if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? "flex" : "none";
      }
    });
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}

// Global functions
function proceedToCheckout() {
  if (cartManager.cart.length === 0) {
    if (window.Utils) {
      Utils.showToast("Votre panier est vide", "error");
    }
    return;
  }

  // Save cart data for checkout
  sessionStorage.setItem(
    "checkoutData",
    JSON.stringify({
      items: cartManager.cart,
      subtotal: cartManager.calculateSubtotal(),
      shipping: 2000,
      total: cartManager.calculateSubtotal() + 2000,
    })
  );

  window.location.href = "checkout.html";
}

// Initialize cart manager when page loads
let cartManager;
document.addEventListener("DOMContentLoaded", function () {
  cartManager = new CartManager();

  // Add some sample items for demo if cart is empty
  if (cartManager.cart.length === 0) {
    const sampleItems = [
      {
        id: "sample-1",
        name: "iPhone 13 Pro",
        price: 450000,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        seller: "TechStore",
      },
      {
        id: "sample-2",
        name: "MacBook Air M2",
        price: 650000,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        seller: "CompuWorld",
      },
    ];

    cartManager.cart = sampleItems;
    cartManager.saveCart();
    cartManager.renderCart();
    cartManager.updateCartSummary();
    cartManager.updateCartBadges();
  }
});

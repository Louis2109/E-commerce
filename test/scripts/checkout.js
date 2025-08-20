// 🤖 Checkout functionality for Mervason Marketplace

let currentStep = 1;
let orderData = {
  address: {},
  paymentMethod: "",
  items: [],
};

document.addEventListener("DOMContentLoaded", () => {
  initializeCheckout();
  setupCheckoutEventListeners();
});

function initializeCheckout() {
  // Check if user is authenticated
  const user = app.getUser();
  if (!user) {
    window.location.href =
      "auth/login.html?redirect=" +
      encodeURIComponent(window.location.pathname);
    return;
  }

  // Pre-fill form with user data if available
  if (user.address) {
    prefillAddressForm(user.address);
  } else {
    prefillAddressForm({
      firstName: user.name?.split(" ")[0] || "",
      lastName: user.name?.split(" ").slice(1).join(" ") || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }

  // Load cart items
  loadCartItems();

  Utils.trackEvent("checkout_start");
}

function setupCheckoutEventListeners() {
  // Step navigation
  window.nextStep = () => {
    if (validateCurrentStep()) {
      currentStep++;
      updateStepperUI();
      showStep(currentStep);

      if (currentStep === 3) {
        updateConfirmationData();
      }

      Utils.trackEvent("checkout_step_completed", { step: currentStep - 1 });
    }
  };

  window.previousStep = () => {
    currentStep--;
    updateStepperUI();
    showStep(currentStep);
  };

  window.submitOrder = async () => {
    await processOrder();
  };

  // Payment method selection
  const paymentInputs = document.querySelectorAll(
    'input[name="paymentMethod"]'
  );
  paymentInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      orderData.paymentMethod = e.target.value;
      Utils.trackEvent("payment_method_selected", { method: e.target.value });
    });
  });
}

function validateCurrentStep() {
  switch (currentStep) {
    case 1:
      return validateAddressForm();
    case 2:
      return validatePaymentMethod();
    default:
      return true;
  }
}

function validateAddressForm() {
  const form = document.getElementById("addressForm");
  if (!form) return false;

  const formData = new FormData(form);
  const requiredFields = [
    "firstName",
    "lastName",
    "phone",
    "email",
    "address",
    "city",
    "region",
  ];

  for (const field of requiredFields) {
    const value = formData.get(field);
    if (!value || value.trim() === "") {
      Utils.showToast(`Le champ ${getFieldLabel(field)} est requis`, "error");
      return false;
    }
  }

  // Validate email and phone
  const email = formData.get("email");
  const phone = formData.get("phone");

  if (!Utils.validateEmail(email)) {
    Utils.showToast("Veuillez entrer un email valide", "error");
    return false;
  }

  if (!Utils.validatePhone(phone)) {
    Utils.showToast("Veuillez entrer un numéro de téléphone valide", "error");
    return false;
  }

  // Save address data
  orderData.address = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    city: formData.get("city"),
    region: formData.get("region"),
  };

  return true;
}

function validatePaymentMethod() {
  if (!orderData.paymentMethod) {
    Utils.showToast("Veuillez sélectionner un mode de paiement", "error");
    return false;
  }
  return true;
}

function getFieldLabel(field) {
  const labels = {
    firstName: "Prénom",
    lastName: "Nom",
    phone: "Téléphone",
    email: "Email",
    address: "Adresse",
    city: "Ville",
    region: "Région",
  };
  return labels[field] || field;
}

function updateStepperUI() {
  // Update step circles and connectors
  for (let i = 1; i <= 3; i++) {
    const circle = document.getElementById(`step${i}-circle`);
    const label = document.getElementById(`step${i}-label`);
    const connector = document.getElementById(`connector${i}`);

    if (circle && label) {
      if (i < currentStep) {
        // Completed step
        circle.className =
          "flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-medium";
        circle.innerHTML = "✓";
        label.className = "ml-2 text-sm font-medium text-green-600";
      } else if (i === currentStep) {
        // Current step
        circle.className =
          "flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-medium";
        circle.textContent = i;
        label.className = "ml-2 text-sm font-medium text-primary";
      } else {
        // Future step
        circle.className =
          "flex items-center justify-center w-8 h-8 bg-gray-300 dark:bg-gray-600 text-gray-500 rounded-full text-sm font-medium";
        circle.textContent = i;
        label.className =
          "ml-2 text-sm font-medium text-gray-500 dark:text-gray-400";
      }
    }

    if (connector && i < 3) {
      if (i < currentStep) {
        connector.className = "flex-1 h-0.5 bg-green-600 mx-4 w-16";
      } else {
        connector.className =
          "flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 mx-4 w-16";
      }
    }
  }
}

function showStep(step) {
  // Hide all steps
  for (let i = 1; i <= 3; i++) {
    const stepContent = document.getElementById(`step${i}-content`);
    if (stepContent) {
      stepContent.classList.add("hidden");
    }
  }

  // Show current step
  const currentStepContent = document.getElementById(`step${step}-content`);
  if (currentStepContent) {
    currentStepContent.classList.remove("hidden");
  }
}

function prefillAddressForm(data) {
  Object.keys(data).forEach((key) => {
    const input = document.getElementById(key);
    if (input && data[key]) {
      input.value = data[key];
    }
  });
}

function loadCartItems() {
  const cart = app.getCart();

  if (cart.length === 0) {
    // No items in cart, redirect to catalog
    Utils.showToast("Votre panier est vide", "info");
    setTimeout(() => {
      window.location.href = "catalog.html";
    }, 2000);
    return;
  }

  orderData.items = cart;
  updateOrderSummary();
}

function updateOrderSummary() {
  // This would update the sidebar with cart items
  // For now, we keep the mock data in HTML
  const total = app.getCartTotal();

  // Update total if element exists
  const totalElement = document.querySelector(
    ".text-lg.font-semibold.text-gray-900.dark\\:text-white:last-child"
  );
  if (totalElement) {
    totalElement.textContent = Utils.formatPrice(total);
  }
}

function updateConfirmationData() {
  // Update address confirmation
  const confirmAddress = document.getElementById("confirmAddress");
  if (confirmAddress && orderData.address) {
    const addr = orderData.address;
    confirmAddress.innerHTML = `
            <p><strong>${addr.firstName} ${addr.lastName}</strong></p>
            <p>${addr.address}</p>
            <p>${addr.city}, ${addr.region}</p>
            <p>Tél: ${Utils.formatPhoneNumber(addr.phone)}</p>
            <p>Email: ${addr.email}</p>
        `;
  }

  // Update payment method confirmation
  const confirmPayment = document.getElementById("confirmPayment");
  if (confirmPayment && orderData.paymentMethod) {
    const paymentLabels = {
      visa: "Carte Visa",
      "orange-money": "Orange Money",
      "mtn-momo": "MTN Mobile Money",
      whatsapp: "WhatsApp",
    };
    confirmPayment.textContent =
      paymentLabels[orderData.paymentMethod] || orderData.paymentMethod;
  }
}

async function processOrder() {
  const submitBtn = document.getElementById("submitOrderBtn");
  const submitText = document.getElementById("submitText");
  const submitSpinner = document.getElementById("submitSpinner");

  if (submitBtn && submitText && submitSpinner) {
    submitBtn.disabled = true;
    submitText.textContent = "Traitement...";
    submitSpinner.classList.remove("hidden");
  }

  try {
    Utils.trackEvent("checkout_submit", {
      paymentMethod: orderData.paymentMethod,
      itemCount: orderData.items.length,
      total: app.getCartTotal(),
    });

    // Handle different payment methods
    switch (orderData.paymentMethod) {
      case "whatsapp":
        await processWhatsAppOrder();
        break;
      case "visa":
      case "orange-money":
      case "mtn-momo":
        await processOnlinePayment();
        break;
      default:
        throw new Error("Mode de paiement non supporté");
    }
  } catch (error) {
    console.error("Order processing error:", error);
    Utils.showToast("Erreur lors du traitement de la commande", "error");

    if (submitBtn && submitText && submitSpinner) {
      submitBtn.disabled = false;
      submitText.textContent = "Confirmer la commande";
      submitSpinner.classList.add("hidden");
    }
  }
}

async function processWhatsAppOrder() {
  // Generate WhatsApp message
  const items = orderData.items
    .map(
      (item) =>
        `• ${item.product.title} (x${item.quantity}) - ${Utils.formatPrice(
          item.product.price * item.quantity
        )}`
    )
    .join("\n");

  const total = Utils.formatPrice(app.getCartTotal());
  const addr = orderData.address;

  const message = `🛍️ NOUVELLE COMMANDE - Mervason Marketplace

📦 Produits:
${items}

💰 Total: ${total}

📍 Adresse de livraison:
${addr.firstName} ${addr.lastName}
${addr.address}
${addr.city}, ${addr.region}
Tél: ${addr.phone}
Email: ${addr.email}

Merci de confirmer cette commande et m'indiquer les modalités de paiement et de livraison.`;

  const whatsappLink = Utils.generateWhatsAppLink("+237612345678", message);

  Utils.trackEvent("whatsapp_order_created", {
    total: app.getCartTotal(),
    itemCount: orderData.items.length,
  });

  // Clear cart and redirect
  app.clearCart();
  Utils.showToast("Redirection vers WhatsApp...", "success");

  setTimeout(() => {
    window.open(whatsappLink, "_blank");
    window.location.href = "index.html";
  }, 1500);
}

async function processOnlinePayment() {
  // Simulate payment processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate payment gateway integration
  const paymentResult = await simulatePaymentGateway();

  if (paymentResult.success) {
    // Clear cart
    app.clearCart();

    Utils.trackEvent("purchase_success", {
      paymentMethod: orderData.paymentMethod,
      total: app.getCartTotal(),
      transactionId: paymentResult.transactionId,
    });

    // Redirect to success page
    window.location.href = `order-success.html?ref=${paymentResult.transactionId}`;
  } else {
    throw new Error(paymentResult.error || "Échec du paiement");
  }
}

async function simulatePaymentGateway() {
  // Simulate payment gateway response
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 90% success rate for demo
  if (Math.random() > 0.1) {
    return {
      success: true,
      transactionId: "TXN" + Date.now(),
    };
  } else {
    return {
      success: false,
      error: "Paiement refusé par la banque",
    };
  }
}

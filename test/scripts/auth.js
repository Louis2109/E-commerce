// 🤖 Authentication functionality for Mervason Marketplace

document.addEventListener("DOMContentLoaded", () => {
  setupAuthEventListeners();

  // Check if user is already authenticated and redirect if needed
  const user = app.getUser();
  const currentPage = window.location.pathname;

  if (
    user &&
    (currentPage.includes("login.html") ||
      currentPage.includes("register.html"))
  ) {
    window.location.href = "../index.html";
  }
});

function setupAuthEventListeners() {
  // Password toggle functionality
  window.togglePassword = (fieldId = "password") => {
    const passwordField = document.getElementById(fieldId);
    const eyeOpen =
      document.getElementById(`${fieldId}-eye-open`) ||
      document.getElementById("eye-open");
    const eyeClosed =
      document.getElementById(`${fieldId}-eye-closed`) ||
      document.getElementById("eye-closed");

    if (passwordField && eyeOpen && eyeClosed) {
      if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeOpen.classList.add("hidden");
        eyeClosed.classList.remove("hidden");
      } else {
        passwordField.type = "password";
        eyeOpen.classList.remove("hidden");
        eyeClosed.classList.add("hidden");
      }
    }
  };

  // Login form handler
  window.handleLogin = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const identifier = formData.get("identifier");
    const password = formData.get("password");
    const rememberMe = formData.get("remember-me") === "on";

    // Validate inputs
    if (!identifier || !password) {
      showError("Veuillez remplir tous les champs");
      return;
    }

    if (!isValidIdentifier(identifier)) {
      showError("Veuillez entrer un email ou numéro de téléphone valide");
      return;
    }

    try {
      setLoading(true, "loginBtn", "loginText", "loginSpinner");

      // Simulate API call
      const user = await simulateLogin(identifier, password);

      if (user) {
        app.setUser(user);
        Utils.showToast("Connexion réussie", "success");
        Utils.trackEvent("login_success", { method: "email", rememberMe });

        // Redirect
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get("redirect") || "../index.html";

        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1000);
      } else {
        showError("Identifiants invalides");
      }
    } catch (error) {
      showError("Erreur de connexion. Veuillez réessayer.");
      console.error("Login error:", error);
    } finally {
      setLoading(false, "loginBtn", "loginText", "loginSpinner");
    }
  };

  // Register form handler
  window.handleRegister = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const termsAccepted = formData.get("terms") === "on";
    const marketingConsent = formData.get("marketing") === "on";

    // Validate inputs
    const validation = validateRegistrationForm({
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      termsAccepted,
    });

    if (!validation.isValid) {
      showMessage(validation.message, "error");
      return;
    }

    try {
      setLoading(true, "registerBtn", "registerText", "registerSpinner");

      // Simulate API call
      const user = await simulateRegister({
        fullName,
        email,
        phone,
        password,
        marketingConsent,
      });

      if (user) {
        app.setUser(user);
        showMessage("Compte créé avec succès !", "success");
        Utils.trackEvent("register_success", {
          method: "email",
          marketingConsent,
        });

        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1500);
      } else {
        showMessage("Erreur lors de la création du compte", "error");
      }
    } catch (error) {
      showMessage("Erreur de création de compte. Veuillez réessayer.", "error");
      console.error("Register error:", error);
    } finally {
      setLoading(false, "registerBtn", "registerText", "registerSpinner");
    }
  };

  // Password strength checker for registration
  const passwordField = document.getElementById("password");
  const confirmField = document.getElementById("confirmPassword");

  if (passwordField) {
    passwordField.addEventListener("input", checkPasswordStrength);
  }

  if (confirmField) {
    confirmField.addEventListener("input", checkPasswordMatch);
  }
}

function isValidIdentifier(identifier) {
  // Check if it's a valid email or phone number
  return Utils.validateEmail(identifier) || Utils.validatePhone(identifier);
}

function validateRegistrationForm({
  fullName,
  email,
  phone,
  password,
  confirmPassword,
  termsAccepted,
}) {
  if (!fullName || fullName.trim().length < 2) {
    return { isValid: false, message: "Veuillez entrer un nom complet valide" };
  }

  if (!Utils.validateEmail(email)) {
    return { isValid: false, message: "Veuillez entrer un email valide" };
  }

  if (!Utils.validatePhone(phone)) {
    return {
      isValid: false,
      message: "Veuillez entrer un numéro de téléphone valide",
    };
  }

  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: "Le mot de passe doit contenir au moins 8 caractères",
    };
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: "Les mots de passe ne correspondent pas",
    };
  }

  if (!termsAccepted) {
    return {
      isValid: false,
      message: "Vous devez accepter les conditions d'utilisation",
    };
  }

  return { isValid: true };
}

function checkPasswordStrength() {
  const password = document.getElementById("password").value;
  const feedback = document.getElementById("password-feedback");
  const strengthBars = [1, 2, 3, 4].map((i) =>
    document.getElementById(`strength-${i}`)
  );

  if (!feedback || !strengthBars[0]) return;

  let strength = 0;
  let message = "";

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  // Update visual indicators
  strengthBars.forEach((bar, index) => {
    if (bar) {
      if (index < strength) {
        bar.className =
          "h-1 w-1/4 rounded-full " +
          (strength === 1
            ? "bg-red-500"
            : strength === 2
            ? "bg-yellow-500"
            : strength === 3
            ? "bg-blue-500"
            : "bg-green-500");
      } else {
        bar.className = "h-1 w-1/4 bg-gray-200 dark:bg-gray-700 rounded-full";
      }
    }
  });

  // Update message
  switch (strength) {
    case 0:
    case 1:
      message = "Mot de passe faible";
      break;
    case 2:
      message = "Mot de passe moyen";
      break;
    case 3:
      message = "Mot de passe fort";
      break;
    case 4:
      message = "Mot de passe très fort";
      break;
  }

  feedback.textContent = message;
  feedback.className = `text-xs mt-1 ${
    strength <= 1
      ? "text-red-500"
      : strength === 2
      ? "text-yellow-500"
      : strength === 3
      ? "text-blue-500"
      : "text-green-500"
  }`;
}

function checkPasswordMatch() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const matchElement = document.getElementById("password-match");

  if (!matchElement || !confirmPassword) return;

  if (password === confirmPassword) {
    matchElement.textContent = "Les mots de passe correspondent";
    matchElement.className = "text-xs mt-1 text-green-500";
    matchElement.classList.remove("hidden");
  } else {
    matchElement.textContent = "Les mots de passe ne correspondent pas";
    matchElement.className = "text-xs mt-1 text-red-500";
    matchElement.classList.remove("hidden");
  }
}

function showError(message) {
  const errorElement = document.getElementById("errorMessage");
  const errorText = document.getElementById("errorText");

  if (errorElement && errorText) {
    errorText.textContent = message;
    errorElement.classList.remove("hidden");

    setTimeout(() => {
      errorElement.classList.add("hidden");
    }, 5000);
  }
}

function showMessage(message, type) {
  const messageElement = document.getElementById("message");
  const messageText = document.getElementById("messageText");
  const messageIcon = document.getElementById("messageIcon");

  if (messageElement && messageText && messageIcon) {
    messageText.textContent = message;

    if (type === "success") {
      messageElement.className =
        "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg text-sm";
      messageIcon.innerHTML =
        '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>';
    } else {
      messageElement.className =
        "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm";
      messageIcon.innerHTML =
        '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>';
    }

    messageElement.classList.remove("hidden");

    if (type === "error") {
      setTimeout(() => {
        messageElement.classList.add("hidden");
      }, 5000);
    }
  }
}

function setLoading(isLoading, btnId, textId, spinnerId) {
  const btn = document.getElementById(btnId);
  const text = document.getElementById(textId);
  const spinner = document.getElementById(spinnerId);

  if (btn && text && spinner) {
    if (isLoading) {
      btn.disabled = true;
      text.textContent = "Traitement...";
      spinner.classList.remove("hidden");
    } else {
      btn.disabled = false;
      text.textContent =
        btnId === "loginBtn" ? "Se connecter" : "Créer mon compte";
      spinner.classList.add("hidden");
    }
  }
}

// Simulate API calls (replace with real API in production)
async function simulateLogin(identifier, password) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock validation (in real app, this would be server-side)
  if (password === "password123") {
    return {
      id: "1",
      name: "John Doe",
      email: Utils.validateEmail(identifier) ? identifier : "john@example.com",
      phone: Utils.validatePhone(identifier) ? identifier : "+237612345678",
      role: "customer",
    };
  }

  return null;
}

async function simulateRegister({
  fullName,
  email,
  phone,
  password,
  marketingConsent,
}) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock successful registration
  return {
    id: Date.now().toString(),
    name: fullName,
    email: email,
    phone: phone,
    role: "customer",
    marketingConsent: marketingConsent,
  };
}

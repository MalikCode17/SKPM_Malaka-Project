const Storage = {
  // Save user data
  saveUser: function (userData) {
    localStorage.setItem("malaka_user", JSON.stringify(userData));
  },

  // Get user data
  getUser: function () {
    const user = localStorage.getItem("malaka_user");
    return user ? JSON.parse(user) : null;
  },

  // Save remember me status
  saveRememberMe: function (status) {
    localStorage.setItem("malaka_remember_me", status);
  },

  // Get remember me status
  getRememberMe: function () {
    return localStorage.getItem("malaka_remember_me") === "true";
  },

  // Set logged in session
  setLoggedIn: function (status, role = "mahasiswa") {
    if (status) {
      sessionStorage.setItem("malaka_logged_in", "true");
      sessionStorage.setItem("malaka_role", role);
    } else {
      sessionStorage.removeItem("malaka_logged_in");
      sessionStorage.removeItem("malaka_role");
    }
  },

  // Check if logged in
  isLoggedIn: function() {
    return sessionStorage.getItem("malaka_logged_in") === "true";
  },

  // Get current user role
  getRole: function() {
    return sessionStorage.getItem("malaka_role") || "mahasiswa";
  }
};

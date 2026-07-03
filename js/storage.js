const Storage = {
    // Save user data
    saveUser: function(userData) {
        localStorage.setItem('malaka_user', JSON.stringify(userData));
    },
    
    // Get user data
    getUser: function() {
        const user = localStorage.getItem('malaka_user');
        return user ? JSON.parse(user) : null;
    },
    
    // Save remember me status
    saveRememberMe: function(status) {
        localStorage.setItem('malaka_remember_me', status);
    },
    
    // Get remember me status
    getRememberMe: function() {
        return localStorage.getItem('malaka_remember_me') === 'true';
    },

    // Set logged in session
    setLoggedIn: function(status) {
        if(status) {
             sessionStorage.setItem('malaka_logged_in', 'true');
        } else {
             sessionStorage.removeItem('malaka_logged_in');
        }
    }
};

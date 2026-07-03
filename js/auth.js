const Auth = {
    initLogin: function() {
        const btnLogin = document.getElementById('btn-login');
        if (!btnLogin) return;
        
        const loginForm = btnLogin.closest('form');

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah form tersubmit otomatis
            
            const emailInput = document.getElementById('email').value.trim();
            const passwordInput = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember').checked;
            
            if (!emailInput || !passwordInput) {
                UI.showAlert('Email/NIM dan Password wajib diisi.', 'error');
                return;
            }
            
            const storedUser = Storage.getUser();
            
            // 2. Cek apakah ada data user di localStorage
            if (storedUser) {
                // 3. Validasi kredensial (bisa email atau nim/username)
                if ((emailInput === storedUser.email || emailInput === storedUser.nim) && passwordInput === storedUser.password) {
                    
                    const btnSubmit = e.target.querySelector('button[type="submit"]');
                    UI.setLoading(btnSubmit, true);

                    setTimeout(() => {
                        // 4. Jika "Ingat Saya" dicentang
                        Storage.saveRememberMe(rememberMe);
                        
                        // Berhasil login
                        Storage.setLoggedIn(true);
                        UI.setLoading(btnSubmit, false);
                        UI.showAlert('Login berhasil!', 'success');
                        
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 500);
                    }, 800);
                } else {
                    UI.showAlert('Email/NIM atau Password salah.', 'error');
                }
            } else {
                UI.showAlert('Akun tidak ditemukan. Silakan daftar terlebih dahulu.');
            }
        });
    },

    initRegister: function() {
        const btnDaftar = document.getElementById('btn-daftar');
        if (!btnDaftar) return;

        const registerForm = btnDaftar.closest('form');

        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah submit form otomatis
            
            const nama = document.getElementById('nama').value.trim();
            const nim = document.getElementById('nim').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const konfirmasi_password = document.getElementById('konfirmasi_password').value;
            const prodi = document.getElementById('prodi').value;
            const angkatan = document.getElementById('angkatan').value;
            
            // 1. Validasi Nama
            if (!nama) { 
                UI.showAlert('Nama lengkap wajib diisi.'); return; 
            }
            
            // 2. Validasi NIM (hanya angka, maksimal 9 karakter)
            if (!nim || !/^\d+$/.test(nim) || nim.length > 9) { 
                UI.showAlert('NIM wajib diisi, hanya angka, maksimal 9 karakter.'); return; 
            }
            
            // 3. Validasi Email format
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { 
                UI.showAlert('Email wajib diisi dan berformat valid.'); return; 
            }
            
            // 4. Validasi Password
            if (!password || password.length < 8) { 
                UI.showAlert('Password minimal 8 karakter.'); return; 
            }
            
            // 5. Validasi Konfirmasi Password
            if (password !== konfirmasi_password) { 
                UI.showAlert('Konfirmasi password harus sama dengan password.'); return; 
            }
            
            // 6. Validasi Program Studi & Angkatan
            if (!prodi) { 
                UI.showAlert('Program Studi wajib dipilih.'); return; 
            }
            if (!angkatan) { 
                UI.showAlert('Tahun Angkatan wajib dipilih.'); return; 
            }
            
            // 7. Simpan ke LocalStorage
            const userData = {
                nama: nama, 
                nim: nim, 
                email: email, 
                password: password, 
                prodi: prodi, 
                angkatan: angkatan
            };
            
            const btnSubmit = e.target.querySelector('button[type="submit"]');
            UI.setLoading(btnSubmit, true);

            setTimeout(() => {
                Storage.saveUser(userData);
                UI.setLoading(btnSubmit, false);
                UI.showAlert('Akun berhasil dibuat! Silakan login.', 'success');
                
                // Redirect ke halaman login
                setTimeout(() => {
                    window.location.href = '01-login.html';
                }, 500);
            }, 800);
        });
    }
};

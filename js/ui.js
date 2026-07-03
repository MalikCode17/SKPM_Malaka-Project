const UI = {
    showAlert: function(message, type = 'error') {
        // Buat container toast jika belum ada
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.style.position = 'fixed';
            toastContainer.style.top = '24px';
            toastContainer.style.right = '24px';
            toastContainer.style.zIndex = '9999';
            toastContainer.style.display = 'flex';
            toastContainer.style.flexDirection = 'column';
            toastContainer.style.gap = '12px';
            document.body.appendChild(toastContainer);
        }

        // Setup Warna dan Ikon berdasarkan Tipe (success, error, info/warning)
        let bgColor = '#ef4444'; // default error (merah)
        let icon = 'fa-exclamation-circle';
        
        if (type === 'success') {
            bgColor = '#10b981'; // hijau
            icon = 'fa-check-circle';
        } else if (type === 'info' || type === 'warning') {
            bgColor = '#f59e0b'; // oranye/kuning
            icon = 'fa-info-circle';
        }

        // Buat elemen Toast
        const toast = document.createElement('div');
        toast.style.background = 'white';
        toast.style.borderLeft = `6px solid ${bgColor}`;
        toast.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        toast.style.padding = '16px 20px';
        toast.style.borderRadius = '8px';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '16px';
        toast.style.minWidth = '300px';
        toast.style.maxWidth = '400px';
        toast.style.color = '#1e293b';
        toast.style.fontWeight = '600';
        toast.style.fontFamily = "'Nunito', sans-serif";
        toast.style.transform = 'translateX(120%)'; // Posisi awal diluar layar
        toast.style.opacity = '0';
        toast.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Efek memantul

        toast.innerHTML = `
            <i class="fas ${icon}" style="color: ${bgColor}; font-size: 1.5rem;" aria-hidden="true"></i>
            <span style="flex: 1; font-size: 0.95rem;">${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 1.2rem; padding: 0;">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Animasi masuk (slide in)
        requestAnimationFrame(() => {
            setTimeout(() => {
                toast.style.transform = 'translateX(0)';
                toast.style.opacity = '1';
            }, 10);
        });

        // Menghilang otomatis setelah 3 detik
        setTimeout(() => {
            toast.style.transform = 'translateX(120%)';
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentElement) toast.remove();
            }, 400); // Menunggu transisi selesai
        }, 3000);
    },

    showConfirm: function(message, onConfirm, title = "Konfirmasi", icon = "fa-exclamation-triangle", btnConfirmText = "Ya, Lanjutkan") {
        // Buat container modal
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '10000';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';

        // Buat kotak modal
        const modalBox = document.createElement('div');
        modalBox.style.backgroundColor = 'white';
        modalBox.style.padding = '24px';
        modalBox.style.borderRadius = '12px';
        modalBox.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        modalBox.style.textAlign = 'center';
        modalBox.style.minWidth = '320px';
        modalBox.style.transform = 'scale(0.9)';
        modalBox.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        modalBox.style.fontFamily = "'Nunito', sans-serif";

        modalBox.innerHTML = `
            <i class="fas ${icon}" style="font-size: 3rem; color: #ef4444; margin-bottom: 16px;"></i>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-bottom: 12px; margin-top: 0;">${title}</h3>
            <p style="color: #64748b; margin-bottom: 24px; font-size: 0.95rem;">${message}</p>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button id="btn-cancel-confirm" style="padding: 10px 20px; background-color: #f1f5f9; color: #475569; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: background 0.2s;">Batal</button>
                <button id="btn-ok-confirm" style="padding: 10px 20px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: background 0.2s; box-shadow: 0 4px 6px rgba(239,68,68,0.2);">${btnConfirmText}</button>
            </div>
        `;

        overlay.appendChild(modalBox);
        document.body.appendChild(overlay);

        // Hover efek tombol via JS (karena CSS inline tidak dukung hover)
        const btnCancel = modalBox.querySelector('#btn-cancel-confirm');
        const btnOk = modalBox.querySelector('#btn-ok-confirm');

        btnCancel.addEventListener('mouseenter', () => btnCancel.style.backgroundColor = '#e2e8f0');
        btnCancel.addEventListener('mouseleave', () => btnCancel.style.backgroundColor = '#f1f5f9');

        btnOk.addEventListener('mouseenter', () => btnOk.style.backgroundColor = '#dc2626');
        btnOk.addEventListener('mouseleave', () => btnOk.style.backgroundColor = '#ef4444');

        // Fungsi tutup modal
        const closeModal = () => {
            overlay.style.opacity = '0';
            modalBox.style.transform = 'scale(0.9)';
            setTimeout(() => {
                if (overlay.parentElement) overlay.remove();
            }, 300);
        };

        // Event listener klik
        btnCancel.addEventListener('click', closeModal);
        btnOk.addEventListener('click', () => {
            closeModal();
            onConfirm();
        });

        // Tampilkan dengan animasi
        requestAnimationFrame(() => {
            setTimeout(() => {
                overlay.style.opacity = '1';
                modalBox.style.transform = 'scale(1)';
            }, 10);
        });
    },

    renderProfileDropdown: function() {
        const logoutBtn = document.getElementById('btn-logout');
        // Only run if the logout button exists (meaning we're on a page with navbar)
        // and only if the user is actually logged in.
        if (!logoutBtn) return;

        const isLoggedIn = sessionStorage.getItem('malaka_logged_in') === 'true';
        const user = Storage.getUser();

        if (isLoggedIn && user) {
            // Create Initials
            const nameParts = user.nama.trim().split(' ');
            let initials = nameParts[0].charAt(0).toUpperCase();
            if (nameParts.length > 1) {
                initials += nameParts[1].charAt(0).toUpperCase();
            }

            // Replace the li content
            const navItem = logoutBtn.parentElement;
            
            navItem.classList.add('profile-dropdown');
            
            let prodiText = user.prodi;
            if(prodiText === 'ti') prodiText = 'Teknik Informatika';
            if(prodiText === 'si') prodiText = 'Sistem Informasi';
            if(prodiText === 'te') prodiText = 'Teknologi Informasi';
            if(prodiText === 'mn') prodiText = 'Manajemen';

            // Check if photo exists
            const avatarHtml = user.foto 
                ? `<div class="profile-avatar" id="profileToggle" aria-haspopup="true" aria-expanded="false" style="background-image: url('${user.foto}'); background-size: cover; background-position: center;"></div>`
                : `<div class="profile-avatar" id="profileToggle" aria-haspopup="true" aria-expanded="false">${initials}</div>`;

            const avatarLgHtml = user.foto 
                ? `<div class="profile-avatar-lg" style="background-image: url('${user.foto}'); background-size: cover; background-position: center;"></div>`
                : `<div class="profile-avatar-lg">${initials}</div>`;

            navItem.innerHTML = `
                ${avatarHtml}
                <div class="dropdown-menu" id="profileDropdownMenu">
                    <div class="dropdown-header">
                        ${avatarLgHtml}
                        <div class="dropdown-header-info">
                            <span class="name" id="dropdown-name">${user.nama}</span>
                            <span class="details" id="dropdown-details">${user.nim} &bull; ${prodiText}</span>
                        </div>
                    </div>
                    <a href="08-profil.html" class="dropdown-item">
                        <i class="fas fa-user-circle"></i> Profil Saya
                    </a>
                    <a href="11-riwayat.html" class="dropdown-item">
                        <i class="fas fa-calendar-check"></i> Riwayat Pendaftaran
                    </a>
                    <div class="dropdown-divider" style="border-top: 1px solid #e2e8f0; margin: 4px 0;"></div>
                    <a href="#" class="dropdown-item text-danger" id="dropdown-logout">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            `;

            // Add Event Listeners
            const toggle = document.getElementById('profileToggle');
            const menu = document.getElementById('profileDropdownMenu');
            const logoutAction = document.getElementById('dropdown-logout');

            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                menu.classList.toggle('show');
                const isExpanded = menu.classList.contains('show');
                toggle.setAttribute('aria-expanded', isExpanded);
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!navItem.contains(e.target)) {
                    menu.classList.remove('show');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });

            // --- MOBILE SPECIFIC LOGIC ---
            const mobileProfileBlock = document.getElementById('mobileProfileBlock');
            if (mobileProfileBlock) {
                // Populate profile block at the top
                mobileProfileBlock.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 16px; margin-top: 8px; padding-bottom: 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 12px;">
                        ${user.foto 
                            ? `<div style="width: 50px; height: 50px; border-radius: 50%; background-image: url('${user.foto}'); background-size: cover; background-position: center;"></div>`
                            : `<div style="width: 50px; height: 50px; border-radius: 50%; background-color: var(--secondary-blue); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 700;">${initials}</div>`
                        }
                        <div style="color: white; line-height: 1.4;">
                            <div style="font-weight: 700; font-size: 1.05rem;">${user.nama}</div>
                            <div style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 6px;">${user.email || 'mahasiswa@email.com'}</div>
                            <span style="background-color: var(--secondary-blue); font-size: 0.75rem; padding: 3px 12px; border-radius: 12px; font-weight: 600;">Mahasiswa</span>
                        </div>
                    </div>
                `;

                // Add mobile extra links
                const extraLinksHTML = `
                    <li class="mobile-only-link" style="border-top: 1px solid rgba(255, 255, 255, 0.1); margin-top: 12px; padding-top: 12px;"><a href="08-profil.html"><i class="fas fa-user nav-icon"></i> Profil Saya</a></li>
                    <li class="mobile-only-link"><a href="11-riwayat.html"><i class="fas fa-clock nav-icon"></i> Riwayat Pendaftaran</a></li>
                `;
                navItem.insertAdjacentHTML('beforebegin', extraLinksHTML);

                // Add mobile logout button inside navItem
                navItem.insertAdjacentHTML('beforeend', `
                    <a href="#" class="mobile-logout-btn" id="mobile-logout">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                `);
                
                const mobileLogoutAction = document.getElementById('mobile-logout');
                if (mobileLogoutAction) {
                    mobileLogoutAction.addEventListener('click', function(e) {
                        e.preventDefault();
                        UI.showConfirm(
                            "Apakah Anda yakin ingin keluar dari sistem?", 
                            () => {
                                Storage.setLoggedIn(false);
                                UI.showAlert('Logout berhasil! Sampai jumpa kembali.', 'success');
                                setTimeout(() => { window.location.href = '01-login.html'; }, 800);
                            },
                            "Konfirmasi Logout",
                            "fa-sign-out-alt",
                            "Ya, Keluar"
                        );
                    });
                }
            }

            // Handle Logout
            if (logoutAction) {
                logoutAction.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    UI.showConfirm(
                        "Apakah Anda yakin ingin keluar dari sistem?", 
                        () => {
                            Storage.setLoggedIn(false);
                            UI.showAlert('Logout berhasil! Sampai jumpa kembali.', 'success');
                            
                            setTimeout(() => {
                                window.location.href = '01-login.html';
                            }, 800);
                        },
                        "Konfirmasi Logout",
                        "fa-sign-out-alt",
                        "Ya, Keluar"
                    );
                });
            }
        }
    },

    setLoading: function(btn, isLoading, originalHTML = '') {
        if (!btn) return;
        
        if (isLoading) {
            btn.disabled = true;
            if (!btn.dataset.originalHtml) {
                btn.dataset.originalHtml = btn.innerHTML;
            }
            btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Loading...';
            btn.style.opacity = '0.7';
            btn.style.cursor = 'not-allowed';
        } else {
            btn.disabled = false;
            btn.innerHTML = originalHTML || btn.dataset.originalHtml;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }
    }
};

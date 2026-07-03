document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi logika Auth (Login / Register) jika elemen tombolnya ada di halaman
    if (document.getElementById('btn-login')) {
        Auth.initLogin();
    }
    
    if (document.getElementById('btn-daftar')) {
        Auth.initRegister();
    }

    // Render Profile Dropdown if navbar is present
    if (typeof UI !== 'undefined') {
        UI.renderProfileDropdown();
    }
    
    // Initialize profile page if script is loaded
    if (typeof Profile !== 'undefined') {
        Profile.init();
    }

    // Universal Detail Trigger
    const detailButtons = document.querySelectorAll('.btn-detail-trigger');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            if(id) {
                localStorage.setItem('selected_kegiatan_id', id);
                window.location.href = '09-detail.html';
            }
        });
    });

    // Universal Daftar Trigger
    const daftarButtons = document.querySelectorAll('.btn-daftar-trigger');
    daftarButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            if(id) {
                localStorage.setItem('selected_kegiatan_id', id);
                window.location.href = '10-pendaftaran-form.html';
            }
        });
    });

    // Scroll To Top Logic
    const btnScrollTop = document.getElementById('btn-scroll-top');
    if (btnScrollTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnScrollTop.classList.add('show');
            } else {
                btnScrollTop.classList.remove('show');
            }
        });

        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

const Profile = {
    init: function() {
        const form = document.getElementById('profile-form');
        if (!form) return; // Exit if not on profile page

        // Ensure user is logged in
        const isLoggedIn = sessionStorage.getItem('malaka_logged_in') === 'true';
        if (!isLoggedIn) {
            window.location.href = '01-login.html';
            return;
        }

        this.loadProfileData();
        this.bindEvents();
    },

    loadProfileData: function() {
        const user = Storage.getUser();
        if (!user) return;

        // Set inputs
        document.getElementById('prof_nama').value = user.nama || '';
        document.getElementById('prof_nim').value = user.nim || '';
        document.getElementById('prof_prodi').value = user.prodi || 'ti';
        document.getElementById('prof_email').value = user.email || '';
        document.getElementById('prof_hp').value = user.hp || '';
        document.getElementById('prof_semester').value = user.semester || '';
        document.getElementById('prof_angkatan').value = user.angkatan || '2026';

        // Set Header
        document.getElementById('profileNameDisplay').innerText = user.nama || 'Profil Pengguna';

        // Set Avatar / Initials
        const profileImageDiv = document.getElementById('profileImage');
        if (user.foto) {
            profileImageDiv.style.backgroundImage = `url(${user.foto})`;
            profileImageDiv.innerHTML = '';
        } else {
            profileImageDiv.style.backgroundImage = '';
            const nameParts = (user.nama || '').trim().split(' ');
            if (nameParts.length > 0 && nameParts[0] !== '') {
                let initials = nameParts[0].charAt(0).toUpperCase();
                if (nameParts.length > 1) {
                    initials += nameParts[1].charAt(0).toUpperCase();
                }
                profileImageDiv.innerHTML = initials;
            } else {
                profileImageDiv.innerHTML = '<i class="fas fa-user"></i>';
            }
        }
    },

    bindEvents: function() {
        const btnEdit = document.getElementById('btn-edit-profil');
        const btnSimpan = document.getElementById('btn-simpan-profil');
        const form = document.getElementById('profile-form');
        
        const inputs = form.querySelectorAll('input:not(#foto-profil), select');

        const profileImageContainer = document.getElementById('profileImageContainer');
        const fileInput = document.getElementById('foto-profil');

        if (profileImageContainer && fileInput) {
            profileImageContainer.addEventListener('click', function() {
                fileInput.click();
            });

            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (!file) return;

                // Validasi ekstensi
                const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (!validTypes.includes(file.type)) {
                    UI.showAlert('Hanya mendukung format .jpg, .jpeg, .png');
                    return;
                }

                // Gunakan FileReader
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64Image = e.target.result;
                    
                    // Langsung simpan ke localStorage
                    const user = Storage.getUser() || {};
                    user.foto = base64Image;
                    Storage.saveUser(user);

                    // Update UI langsung
                    Profile.loadProfileData();
                    UI.renderProfileDropdown();
                    UI.showAlert('Foto profil berhasil diperbarui!', 'success');
                };
                reader.readAsDataURL(file);
            });
        }

        btnEdit.addEventListener('click', function() {
            // Aktifkan form
            inputs.forEach(input => input.removeAttribute('disabled'));
            
            // Ganti tombol
            btnEdit.style.display = 'none';
            btnSimpan.style.display = 'block';
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Ambil tombol simpan
            const btnSubmit = document.getElementById('btn-simpan-profil');
            UI.setLoading(btnSubmit, true);

            setTimeout(() => {
                // Kumpulkan data baru
                const updatedUser = {
                    nama: document.getElementById('prof_nama').value.trim(),
                    nim: document.getElementById('prof_nim').value.trim(),
                    prodi: document.getElementById('prof_prodi').value,
                    email: document.getElementById('prof_email').value.trim(),
                    hp: document.getElementById('prof_hp').value.trim(),
                    semester: document.getElementById('prof_semester').value.trim(),
                    angkatan: document.getElementById('prof_angkatan').value
                };
                
                // Validasi dasar
                if(!updatedUser.nama || !updatedUser.nim || !updatedUser.email) {
                    UI.setLoading(btnSubmit, false);
                    UI.showAlert('Nama, NIM, dan Email wajib diisi.');
                    return;
                }

                // Pertahankan data lama (seperti password)
                const oldUser = Storage.getUser() || {};
                const newUser = { ...oldUser, ...updatedUser };

                // Simpan ke localstorage
                Storage.saveUser(newUser);

                // Kunci form kembali
                inputs.forEach(input => input.setAttribute('disabled', 'true'));
                
                // Ganti tombol
                btnSimpan.style.display = 'none';
                btnEdit.style.display = 'block';

                // Refresh UI Profile
                Profile.loadProfileData();
                UI.renderProfileDropdown(); // Update navbar

                UI.setLoading(btnSubmit, false);
                UI.showAlert('Profil berhasil disimpan!', 'success');
            }, 800);
        });
    }
};

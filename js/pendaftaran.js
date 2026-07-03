const Pendaftaran = {
    init: function() {
        const form = document.getElementById('form-pendaftaran');
        if (!form) return;

        // Pastikan user login
        const isLoggedIn = sessionStorage.getItem('malaka_logged_in') === 'true';
        if (!isLoggedIn) {
            UI.showAlert('Anda harus login untuk mendaftar kegiatan.');
            window.location.href = '01-login.html';
            return;
        }

        const user = Storage.getUser();
        if (!user) {
            window.location.href = '01-login.html';
            return;
        }

        // Ambil ID Kegiatan
        const kegiatanId = localStorage.getItem('selected_kegiatan_id');
        if (!kegiatanId) {
            UI.showAlert('Tidak ada kegiatan yang dipilih.');
            window.location.href = '04-kegiatan.html';
            return;
        }

        const kegiatan = kegiatanDB.find(k => k.id === kegiatanId);
        if (!kegiatan) return;

        // Isi Info Kegiatan
        document.getElementById('reg-kegiatan-nama').innerText = kegiatan.nama;
        document.getElementById('reg-kegiatan-kategori').innerText = kegiatan.kategori;
        document.getElementById('reg-kegiatan-tanggal').innerText = kegiatan.tanggal;
        document.getElementById('reg-kegiatan-lokasi').innerText = kegiatan.lokasi;
        document.getElementById('reg-kegiatan-kuota').innerText = `Tersisa: ${kegiatan.kuota}`;

        if (kegiatan.image) {
            document.getElementById('reg-image').src = kegiatan.image;
        }

        // Isi Data Mahasiswa (Autofill & Disabled)
        document.getElementById('reg-nama').value = user.nama || '';
        document.getElementById('reg-nim').value = user.nim || '';
        
        let prodiText = user.prodi || '';
        if(prodiText === 'ti') prodiText = 'Teknik Informatika';
        if(prodiText === 'si') prodiText = 'Sistem Informasi';
        if(prodiText === 'te') prodiText = 'Teknologi Informasi';
        if(prodiText === 'mn') prodiText = 'Manajemen';
        
        document.getElementById('reg-prodi').value = prodiText;
        document.getElementById('reg-email').value = user.email || '';

        // Prefill tambahan jika ada di profil
        if (user.hp) document.getElementById('reg-hp').value = user.hp;
        if (user.semester) document.getElementById('reg-semester').value = user.semester;

        this.bindEvents(kegiatan, user);
    },

    bindEvents: function(kegiatan, user) {
        const form = document.getElementById('form-pendaftaran');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const hp = document.getElementById('reg-hp').value.trim();
            const semester = document.getElementById('reg-semester').value.trim();
            const catatan = document.getElementById('reg-catatan').value.trim();

            if (!hp || !semester) {
                UI.showAlert('Silakan lengkapi Nomor HP dan Semester Anda.');
                return;
            }

            // Ambil riwayat pendaftaran saat ini (Pastikan selalu array)
            let rawRiwayat = localStorage.getItem('riwayat_pendaftaran');
            let riwayat = [];
            try {
                if (rawRiwayat) {
                    riwayat = JSON.parse(rawRiwayat);
                    if (!Array.isArray(riwayat)) riwayat = [];
                }
            } catch(e) {
                riwayat = [];
            }

            // Cek duplikasi pendaftaran
            const isDuplicate = riwayat.some(item => item.kegiatanId === kegiatan.id && item.nim === user.nim);
            
            if (isDuplicate) {
                UI.showAlert('Anda sudah terdaftar pada kegiatan ini! Tidak dapat mendaftar ganda.');
                return;
            }

            const btnSubmit = e.target.querySelector('button[type="submit"]');
            UI.setLoading(btnSubmit, true);

            setTimeout(() => {
                // Buat objek pendaftaran baru
                const pendaftaranBaru = {
                    idDaftar: 'REG-' + new Date().getTime(),
                    kegiatanId: kegiatan.id,
                    kegiatanNama: kegiatan.nama,
                    kegiatanKategori: kegiatan.kategori,
                    kegiatanTanggal: kegiatan.tanggal,
                    kegiatanLokasi: kegiatan.lokasi,
                    nim: user.nim,
                    nama: user.nama,
                    hp: hp,
                    semester: semester,
                    catatan: catatan,
                    tanggalDaftar: new Date().toISOString(),
                    statusDaftar: 'TERDAFTAR'
                };

                // Simpan ke array riwayat
                riwayat.push(pendaftaranBaru);
                localStorage.setItem('riwayat_pendaftaran', JSON.stringify(riwayat));

                // Perbarui data pengguna agar HP/Semester tersimpan untuk ke depannya
                const updatedUser = { ...user, hp: hp, semester: semester };
                Storage.saveUser(updatedUser);

                UI.setLoading(btnSubmit, false);
                UI.showAlert('Pendaftaran Berhasil!', 'success');
                
                // Arahkan ke Halaman Riwayat Pendaftaran
                setTimeout(() => {
                    window.location.href = '11-riwayat.html';
                }, 1000);
            }, 800);
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    Pendaftaran.init();
});
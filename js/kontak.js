const Kontak = {
    init: function() {
        const form = document.getElementById('form-kontak');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nama = document.getElementById('nama_kontak').value.trim();
            const email = document.getElementById('email_kontak').value.trim();
            const pesan = document.getElementById('pesan').value.trim();

            if (!nama) {
                UI.showAlert('Nama lengkap wajib diisi.');
                return;
            }

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                UI.showAlert('Email wajib diisi dan berformat valid.');
                return;
            }

            if (!pesan) {
                UI.showAlert('Pesan wajib diisi.');
                return;
            }

            const newMessage = {
                id: 'MSG-' + new Date().getTime(),
                nama: nama,
                email: email,
                pesan: pesan,
                tanggal: new Date().toISOString()
            };

            const btnSubmit = e.target.querySelector('button[type="submit"]');
            UI.setLoading(btnSubmit, true);

            setTimeout(() => {
                let pesanTersimpan = [];
                try {
                    const raw = localStorage.getItem('pesan_kontak');
                    if (raw) {
                        pesanTersimpan = JSON.parse(raw);
                        if (!Array.isArray(pesanTersimpan)) pesanTersimpan = [];
                    }
                } catch (err) {
                    pesanTersimpan = [];
                }

                pesanTersimpan.push(newMessage);
                localStorage.setItem('pesan_kontak', JSON.stringify(pesanTersimpan));

                UI.setLoading(btnSubmit, false);
                UI.showAlert('Pesan berhasil dikirim.', 'success');
                form.reset();
            }, 800);
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    Kontak.init();
});

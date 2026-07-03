const DetailKegiatan = {
    init: function() {
        const titleElement = document.getElementById('detail-title');
        // Pastikan kita berada di halaman detail
        if (!titleElement) return;

        const kegiatanId = localStorage.getItem('selected_kegiatan_id');
        
        if (!kegiatanId) {
            UI.showAlert('Tidak ada kegiatan yang dipilih. Mengalihkan ke daftar kegiatan.');
            window.location.href = '04-kegiatan.html';
            return;
        }

        // Cari data di database (kegiatanDB ada di data.js)
        const kegiatan = kegiatanDB.find(k => k.id === kegiatanId);

        if (!kegiatan) {
            UI.showAlert('Data kegiatan tidak ditemukan.');
            window.location.href = '04-kegiatan.html';
            return;
        }

        this.renderData(kegiatan);
    },

    renderData: function(kegiatan) {
        // Judul & Kategori
        document.getElementById('detail-title').innerText = kegiatan.nama;
        document.getElementById('detail-category').innerText = `Kategori: ${kegiatan.kategori}`;

        // Gambar
        const img = document.getElementById('detail-image');
        if (kegiatan.image) {
            img.src = kegiatan.image;
            img.alt = `Ilustrasi ${kegiatan.nama}`;
            img.style.display = 'block';
        }

        // Deskripsi
        document.getElementById('detail-description').innerHTML = kegiatan.deskripsi;

        // Materi / Agenda
        const materiContainer = document.getElementById('detail-materi');
        if (kegiatan.materi && kegiatan.materi.length > 0) {
            materiContainer.innerHTML = kegiatan.materi.map(item => `<li>${item}</li>`).join('');
        } else {
            materiContainer.innerHTML = '<li>Tidak ada materi spesifik.</li>';
        }

        // Info Pelaksanaan
        document.getElementById('detail-tanggal').innerText = kegiatan.tanggal;
        document.getElementById('detail-waktu').innerText = kegiatan.waktu;
        document.getElementById('detail-lokasi').innerText = kegiatan.lokasi;
        document.getElementById('detail-kuota').innerHTML = kegiatan.kuota.includes('Penuh') 
            ? `<span class="text-red">${kegiatan.kuota}</span>` 
            : kegiatan.kuota;

        // Status & Tombol Daftar
        const statusDiv = document.getElementById('detail-status');
        const btnDaftar = document.getElementById('btn-daftar-sekarang');
        
        statusDiv.innerText = `Status: ${kegiatan.status}`;

        if (kegiatan.statusBadge === 'bg-red' || kegiatan.statusBadge === 'bg-gray' || kegiatan.status === 'Khusus Anggota') {
            statusDiv.style.backgroundColor = '#64748b'; // Gray for unavailable
            if (kegiatan.statusBadge === 'bg-red') statusDiv.style.backgroundColor = '#ef4444'; // Red for full

            // Nonaktifkan tombol daftar
            btnDaftar.className = 'btn btn-outline-blue w-100';
            btnDaftar.style.pointerEvents = 'none';
            btnDaftar.innerHTML = `<i class="fas fa-lock"></i> ${kegiatan.status}`;
        } else {
            // Biarkan tombol aktif (mengarah ke halaman pendaftaran)
            btnDaftar.className = 'btn btn-orange w-100';
            btnDaftar.style.pointerEvents = 'auto';
            btnDaftar.innerHTML = 'Daftar Sekarang';
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    DetailKegiatan.init();
});
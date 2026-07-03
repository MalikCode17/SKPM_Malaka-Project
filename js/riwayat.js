const Riwayat = {
    init: function() {
        const listContainer = document.getElementById('riwayat-list-container');
        if (!listContainer) return;

        // Pastikan login
        const isLoggedIn = sessionStorage.getItem('malaka_logged_in') === 'true';
        const user = Storage.getUser();

        if (!isLoggedIn || !user) {
            UI.showAlert('Silakan login terlebih dahulu.');
            window.location.href = '01-login.html';
            return;
        }

        this.renderRiwayat(user);
        this.bindEvents(user);
    },

    getRiwayatMahasiswa: function(nim) {
        let rawRiwayat = localStorage.getItem('riwayat_pendaftaran');
        let semuaRiwayat = [];
        try {
            if (rawRiwayat) {
                semuaRiwayat = JSON.parse(rawRiwayat);
                if (!Array.isArray(semuaRiwayat)) semuaRiwayat = [];
            }
        } catch(e) {
            semuaRiwayat = [];
        }

        // Kita anggap default status jika tidak ada adalah TERDAFTAR
        return semuaRiwayat.filter(item => item.nim === nim).map(item => {
            if(!item.statusDaftar) item.statusDaftar = 'TERDAFTAR';
            return item;
        });
    },

    renderRiwayat: function(user, searchQuery = '', filterStatus = 'Semua') {
        const listContainer = document.getElementById('riwayat-list-container');
        const emptyState = document.getElementById('empty-state');
        const totalPengajuan = document.getElementById('total-pengajuan');
        if (!listContainer || !emptyState || !totalPengajuan) return;

        let myRiwayat = this.getRiwayatMahasiswa(user.nim);

        // Update Dashboard Statistik
        document.getElementById('stat-seminar').innerText = myRiwayat.filter(r => r.kegiatanKategori === 'Seminar & Workshop').length;
        document.getElementById('stat-lomba').innerText = myRiwayat.filter(r => r.kegiatanKategori === 'Lomba Akademik').length;
        document.getElementById('stat-organisasi').innerText = myRiwayat.filter(r => r.kegiatanKategori === 'Organisasi Mahasiswa').length;
        document.getElementById('stat-softskill').innerText = myRiwayat.filter(r => r.kegiatanKategori === 'Pelatihan Soft Skill').length;

        // Terapkan Filter
        if (filterStatus !== 'Semua') {
            myRiwayat = myRiwayat.filter(r => r.statusDaftar === filterStatus);
        }

        // Terapkan Pencarian
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            myRiwayat = myRiwayat.filter(r => 
                r.kegiatanNama.toLowerCase().includes(query) || 
                r.kegiatanKategori.toLowerCase().includes(query)
            );
        }

        // Update Total
        totalPengajuan.innerText = myRiwayat.length;

        if (myRiwayat.length === 0) {
            listContainer.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        listContainer.style.display = 'block';
        emptyState.style.display = 'none';
        listContainer.innerHTML = '';

        // Generate Table Header
        const tableHeader = document.createElement('div');
        tableHeader.className = 'riwayat-table-header';
        tableHeader.innerHTML = `
            <div class="th-kegiatan">Kegiatan</div>
            <div class="th-kategori">Kategori</div>
            <div class="th-tanggal">Tanggal Pendaftaran</div>
            <div class="th-status">Status</div>
            <div class="th-aksi">Aksi</div>
        `;
        listContainer.appendChild(tableHeader);

        myRiwayat.forEach(item => {
            let iconClass = 'fas fa-calendar-alt';
            let iconBgClass = 'icon-bg-blue';
            
            if (item.kegiatanKategori === 'Seminar & Workshop') {
                iconClass = 'fas fa-chalkboard-teacher';
                iconBgClass = 'icon-bg-blue';
            } else if (item.kegiatanKategori === 'Lomba Akademik') {
                iconClass = 'fas fa-trophy';
                iconBgClass = 'icon-bg-orange';
            } else if (item.kegiatanKategori === 'Organisasi Mahasiswa') {
                iconClass = 'fas fa-users';
                iconBgClass = 'icon-bg-green';
            } else if (item.kegiatanKategori === 'Pelatihan Soft Skill') {
                iconClass = 'fas fa-lightbulb';
                iconBgClass = 'icon-bg-purple';
            }

            const isTerdaftar = item.statusDaftar === 'TERDAFTAR';
            const statusColor = isTerdaftar ? 'color: #f59e0b; background: rgba(245, 158, 11, 0.1);' : 'color: #ef4444; background: rgba(239, 68, 68, 0.1);';

            const row = document.createElement('div');
            row.className = 'riwayat-table-row';
            
            row.innerHTML = `
                <div class="td-kegiatan">
                    <div class="icon-wrapper ${iconBgClass}">
                        <i class="${iconClass}"></i>
                    </div>
                    <div class="kegiatan-info">
                        <h4>${item.kegiatanNama}</h4>
                        <span class="location"><i class="fas fa-map-marker-alt"></i> ${item.kegiatanLokasi}</span>
                    </div>
                </div>
                <div class="td-kategori">
                    <span class="table-text-muted">${item.kegiatanKategori}</span>
                </div>
                <div class="td-tanggal">
                    <span class="table-text-muted">${new Date(item.tanggalDaftar).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
                </div>
                <div class="td-status">
                    <span class="status-badge-table" style="${statusColor}">${item.statusDaftar}</span>
                </div>
                <div class="td-aksi">
                    <button class="btn-action-table btn-edit" data-id="${item.idDaftar}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    ${isTerdaftar ? `
                    <button class="btn-action-table btn-cancel" data-id="${item.idDaftar}" style="color: #f59e0b; border-color: rgba(245, 158, 11, 0.3); background: rgba(245, 158, 11, 0.05);">
                        <i class="fas fa-times-circle"></i> Batal
                    </button>
                    ` : `
                    <button class="btn-action-table btn-delete" data-id="${item.idDaftar}">
                        <i class="fas fa-trash-alt"></i> Hapus
                    </button>
                    `}
                </div>
            `;
            listContainer.appendChild(row);
        });
    },

    bindEvents: function(user) {
        const listContainer = document.getElementById('riwayat-list-container');
        const modal = document.getElementById('editModal');
        const formEdit = document.getElementById('form-edit-riwayat');
        const btnCloseModal = document.getElementById('btn-close-modal');
        
        const searchInput = document.getElementById('search-riwayat');
        const filterSelect = document.getElementById('filter-status');

        // Event Pencarian (Search)
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            const status = filterSelect.value;
            this.renderRiwayat(user, query, status);
        });

        // Event Filter (Status)
        filterSelect.addEventListener('change', (e) => {
            const status = e.target.value;
            const query = searchInput.value;
            this.renderRiwayat(user, query, status);
        });

        // Event Hapus Semua
        const btnHapusSemua = document.getElementById('btn-hapus-semua');
        if (btnHapusSemua) {
            btnHapusSemua.addEventListener('click', () => {
                const myRiwayat = this.getRiwayatMahasiswa(user.nim);
                if (myRiwayat.length === 0) {
                    UI.showAlert('Tidak ada data riwayat untuk dihapus.', 'info');
                    return;
                }

                UI.showConfirm(
                    "Peringatan: Semua data riwayat pendaftaran Anda akan dihapus permanen. Lanjutkan?", 
                    () => {
                        let semuaRiwayat = JSON.parse(localStorage.getItem('riwayat_pendaftaran')) || [];
                        semuaRiwayat = semuaRiwayat.filter(item => item.nim !== user.nim);
                        localStorage.setItem('riwayat_pendaftaran', JSON.stringify(semuaRiwayat));
                        
                        this.renderRiwayat(user);
                        UI.showAlert('Seluruh riwayat berhasil dihapus.', 'success');
                    },
                    "Hapus Semua Riwayat",
                    "fa-trash-alt",
                    "Ya, Hapus Semua"
                );
            });
        }
            // Tutup Modal via Tutup Button
            const btnCancelEdit = document.getElementById('btn-cancel-edit');
            if (btnCancelEdit) {
                btnCancelEdit.addEventListener('click', () => {
                    modal.classList.remove('modal-active');
                });
            }

            // Logika Hapus dari dalam Modal
            const btnDeleteModal = document.getElementById('btn-delete-modal');
            if (btnDeleteModal) {
                btnDeleteModal.addEventListener('click', () => {
                    const idDaftar = formEdit.getAttribute('data-current-id');
                    const semuaRiwayat = JSON.parse(localStorage.getItem('riwayat_pendaftaran')) || [];
                    const targetData = semuaRiwayat.find(item => item.idDaftar === idDaftar);
                    
                    if (targetData && targetData.statusDaftar === 'DIBATALKAN') {
                        UI.showAlert('Pendaftaran ini sudah dibatalkan sebelumnya.', 'info');
                        return;
                    }
                    
                    modal.classList.remove('modal-active');
                    
                    UI.showConfirm(
                        "Apakah Anda yakin ingin membatalkan pendaftaran ini?", 
                        () => {
                            const index = semuaRiwayat.findIndex(item => item.idDaftar === idDaftar);
                            if (index !== -1) {
                                semuaRiwayat[index].statusDaftar = 'DIBATALKAN';
                                localStorage.setItem('riwayat_pendaftaran', JSON.stringify(semuaRiwayat));
                                UI.showAlert('Pendaftaran berhasil dibatalkan.', 'success');
                                
                                const query = document.getElementById('search-riwayat').value;
                                const status = document.getElementById('filter-status').value;
                                this.renderRiwayat(user, query, status);
                            }
                        },
                        "Batal Daftar",
                        "fa-times-circle",
                        "Ya, Batalkan"
                    );
                });
            }

        // Delegasi Event untuk Edit dan Delete pada Kartu
        if (listContainer) {
            listContainer.addEventListener('click', (e) => {
                const target = e.target.closest('button');
                if (!target) return;

                const idDaftar = target.getAttribute('data-id');
                const semuaRiwayat = JSON.parse(localStorage.getItem('riwayat_pendaftaran')) || [];
                // Logika Batal Daftar (btn-cancel)
                if (target.classList.contains('btn-cancel')) {
                    const targetData = semuaRiwayat.find(item => item.idDaftar === idDaftar);
                    if (targetData && targetData.statusDaftar === 'DIBATALKAN') {
                        return; // Sudah batal
                    }
                    
                    UI.showConfirm(
                        "Apakah Anda yakin ingin membatalkan pendaftaran ini?", 
                        () => {
                            const index = semuaRiwayat.findIndex(item => item.idDaftar === idDaftar);
                            if (index !== -1) {
                                semuaRiwayat[index].statusDaftar = 'DIBATALKAN';
                                localStorage.setItem('riwayat_pendaftaran', JSON.stringify(semuaRiwayat));
                                UI.showAlert('Pendaftaran berhasil dibatalkan.', 'success');
                                
                                const query = searchInput.value;
                                const status = filterSelect.value;
                                this.renderRiwayat(user, query, status);
                            }
                        },
                        "Batal Daftar",
                        "fa-times-circle",
                        "Ya, Batalkan"
                    );
                }

                // Logika Hapus Permanen (btn-delete)
                if (target.classList.contains('btn-delete')) {
                    UI.showConfirm(
                        "Peringatan: Data riwayat pendaftaran ini akan dihapus permanen. Lanjutkan?", 
                        () => {
                            const filteredRiwayat = semuaRiwayat.filter(item => item.idDaftar !== idDaftar);
                            localStorage.setItem('riwayat_pendaftaran', JSON.stringify(filteredRiwayat));
                            UI.showAlert('Data riwayat berhasil dihapus.', 'success');
                            
                            const query = searchInput.value;
                            const status = filterSelect.value;
                            this.renderRiwayat(user, query, status);
                        },
                        "Hapus Permanen",
                        "fa-trash-alt",
                        "Ya, Hapus"
                    );
                }

                // Logika Buka Modal Edit
                if (target.classList.contains('btn-edit')) {
                    const dataEdit = semuaRiwayat.find(item => item.idDaftar === idDaftar);
                    if (dataEdit) {
                        document.getElementById('edit-idDaftar').value = dataEdit.idDaftar;
                        document.getElementById('edit-nama-kegiatan').value = dataEdit.kegiatanNama;
                        document.getElementById('edit-hp').value = dataEdit.hp || '';
                        document.getElementById('edit-semester').value = dataEdit.semester || '';
                        document.getElementById('edit-catatan').value = dataEdit.catatan || '';
                        
                        modal.classList.add('modal-active');
                    }
                }
            });
        }

        // Logika Simpan Modal Edit
        formEdit.addEventListener('submit', (e) => {
            e.preventDefault();
            const idDaftar = document.getElementById('edit-idDaftar').value;
            let semuaRiwayat = JSON.parse(localStorage.getItem('riwayat_pendaftaran')) || [];
            
            const index = semuaRiwayat.findIndex(item => item.idDaftar === idDaftar);
            if (index !== -1) {
                const btnSubmit = e.target.querySelector('button[type="submit"]');
                UI.setLoading(btnSubmit, true);

                setTimeout(() => {
                    semuaRiwayat[index].hp = document.getElementById('edit-hp').value;
                    semuaRiwayat[index].semester = document.getElementById('edit-semester').value;
                    semuaRiwayat[index].catatan = document.getElementById('edit-catatan').value;
                    
                    localStorage.setItem('riwayat_pendaftaran', JSON.stringify(semuaRiwayat));
                    
                    UI.setLoading(btnSubmit, false);
                    UI.showAlert('Data pendaftaran berhasil diperbarui!', 'success');
                    
                    modal.classList.remove('modal-active');
                    
                    const query = searchInput.value;
                    const status = filterSelect.value;
                    this.renderRiwayat(user, query, status);
                }, 600);
            }
        });

        // Logika Tutup Modal
        btnCloseModal.addEventListener('click', () => {
            modal.classList.remove('modal-active');
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    Riwayat.init();
});

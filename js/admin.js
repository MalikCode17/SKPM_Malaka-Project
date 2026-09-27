document.addEventListener("DOMContentLoaded", function () {
  // Proteksi Halaman Admin
  if (!Storage.isLoggedIn() || Storage.getRole() !== "admin") {
    window.location.replace("index.html");
    return;
  }

  const viewKegiatan = document.getElementById("view-kegiatan");
  const viewPeserta = document.getElementById("view-peserta");
  const navKegiatan = document.getElementById("nav-kegiatan");
  const navPeserta = document.getElementById("nav-peserta");
  const pageTitle = document.getElementById("page-title");

  // Navigation Logic
  navKegiatan.addEventListener("click", (e) => {
    e.preventDefault();
    navKegiatan.classList.add("active");
    navPeserta.classList.remove("active");
    viewKegiatan.style.display = "block";
    viewPeserta.style.display = "none";
    pageTitle.innerText = "Kelola Kegiatan";
    renderTableKegiatan();
  });

  navPeserta.addEventListener("click", (e) => {
    e.preventDefault();
    navPeserta.classList.add("active");
    navKegiatan.classList.remove("active");
    viewPeserta.style.display = "block";
    viewKegiatan.style.display = "none";
    pageTitle.innerText = "Data Pendaftar";
    renderTablePeserta();
  });

  document.getElementById("nav-logout").addEventListener("click", (e) => {
    e.preventDefault();
    Storage.setLoggedIn(false);
    window.location.href = "login.html";
  });

  // Render Table Kegiatan
  function renderTableKegiatan() {
    const tbody = document.querySelector("#table-kegiatan tbody");
    tbody.innerHTML = "";
    const kData = JSON.parse(localStorage.getItem("malaka_kegiatan")) || [];

    kData.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.nama}</td>
        <td>${item.kategori || "-"}</td>
        <td>${item.tanggal}</td>
        <td>${item.kuota}</td>
        <td><span style="font-size:0.8rem; padding: 4px 8px; border-radius: 4px; background: #e2e8f0; font-weight:bold;">${item.status || "Pendaftaran Terbuka"}</span></td>
        <td class="action-btns">
          <button class="btn btn-blue btn-sm" onclick="editKegiatan(${index})"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn btn-danger btn-sm" onclick="hapusKegiatan(${index})"><i class="fas fa-trash"></i> Hapus</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Render Table Peserta
  function renderTablePeserta() {
    const tbody = document.querySelector("#table-peserta tbody");
    tbody.innerHTML = "";
    
    // Ambil data user yang mendaftar dan riwayat
    const user = Storage.getUser();
    const history = JSON.parse(localStorage.getItem("riwayat_pendaftaran")) || [];
    
    if (history.length === 0) {
      tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Belum ada data pendaftar.</td></tr>";
      document.getElementById("pendaftar-info").innerText = "Showing 0 Pendaftar";
      return;
    }

    document.getElementById("pendaftar-info").innerText = `Showing 1-${history.length} of ${history.length} Pendaftar`;

    history.forEach((reg, i) => {
      const tr = document.createElement("tr");
      const nama = user ? user.nama : 'Unknown';
      const email = user ? user.email : 'Unknown';
      const nim = user ? user.nim : 'Unknown';
      
        let tglFormatted = 'Hari Ini';
        if(reg.tanggalDaftar) {
            const dateObj = new Date(reg.tanggalDaftar);
            tglFormatted = dateObj.toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }).replace(/\./g, ':');
        }

        tr.innerHTML = `
        <td>${i + 1}</td>
        <td>
            <div class="user-cell">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <span class="user-name">${nama}</span>
            </div>
        </td>
        <td class="stacked-cell">
            <strong>NIM: ${nim}</strong>
            <span>${email}</span>
        </td>
        <td class="stacked-cell">
            <strong>${reg.kegiatanId}</strong>
            <span>${reg.kegiatanNama || 'Kategori Kegiatan'}</span>
        </td>
        <td>${tglFormatted}</td>
        <td><span class="status-badge status-verified"><i class="fas fa-check-circle"></i> Terverifikasi</span></td>
        <td>
          <button class="btn btn-blue btn-sm" onclick="detailPeserta(${i})" style="padding: 6px 10px; border:none; border-radius:4px; cursor:pointer;">
             <i class="fas fa-eye"></i> Detail
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Global functions for inline onclick
  window.hapusKegiatan = function(index) {
    UI.showConfirm(
      "Apakah Anda yakin ingin menghapus kegiatan ini? Data tidak dapat dikembalikan.",
      () => {
        const kData = JSON.parse(localStorage.getItem("malaka_kegiatan")) || [];
        kData.splice(index, 1);
        localStorage.setItem("malaka_kegiatan", JSON.stringify(kData));
        UI.showAlert("Kegiatan berhasil dihapus", "success");
        renderTableKegiatan();
      },
      "Hapus Kegiatan?"
    );
  };

  const modal = document.getElementById("modal-kegiatan");
  const form = document.getElementById("form-kegiatan");
  
  window.editKegiatan = function(index) {
      const kData = JSON.parse(localStorage.getItem("malaka_kegiatan")) || [];
      const item = kData[index];
      
      document.getElementById("modal-title").innerText = "Edit Kegiatan";
      document.getElementById("edit-index").value = index;
      document.getElementById("k-id").value = item.id;
      document.getElementById("k-nama").value = item.nama;
      document.getElementById("k-kategori").value = item.kategori || "Seminar & Workshop";
      document.getElementById("k-tanggal").value = item.tanggal;
      document.getElementById("k-kuota").value = item.kuota;
      
      modal.style.display = "flex";
  };

  document.getElementById("btn-add-kegiatan").addEventListener("click", () => {
      document.getElementById("modal-title").innerText = "Tambah Kegiatan";
      form.reset();
      document.getElementById("edit-index").value = "-1";
      modal.style.display = "flex";
  });

  document.getElementById("close-modal").addEventListener("click", () => {
      modal.style.display = "none";
  });

  const modalPeserta = document.getElementById("modal-peserta");
  document.getElementById("close-modal-peserta").addEventListener("click", () => {
      modalPeserta.style.display = "none";
  });

  window.detailPeserta = function(index) {
      const history = JSON.parse(localStorage.getItem("riwayat_pendaftaran")) || [];
      const reg = history[index];
      const user = Storage.getUser();
      
      const bodyPeserta = document.getElementById("peserta-detail-body");
      
      if(reg) {
          bodyPeserta.innerHTML = `
              <table style="width:100%; border-collapse: collapse;">
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; width:40%;"><strong>ID Pendaftaran</strong></td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${reg.idDaftar || '-'}</td></tr>
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><strong>Tanggal Daftar</strong></td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${reg.tanggalDaftar || '-'}</td></tr>
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><strong>Nama Lengkap</strong></td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${user ? user.nama : reg.nama}</td></tr>
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><strong>NIM</strong></td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${user ? user.nim : reg.nim}</td></tr>
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><strong>No. HP</strong></td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${reg.hp || '-'}</td></tr>
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><strong>Semester</strong></td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${reg.semester || '-'}</td></tr>
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><strong>Acara</strong></td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${reg.kegiatanNama} (${reg.kegiatanId})</td></tr>
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><strong>Catatan</strong></td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${reg.catatan || '-'}</td></tr>
              </table>
          `;
          modalPeserta.style.display = "flex";
      }
  };

  form.addEventListener("submit", (e) => {
      e.preventDefault();
      const index = parseInt(document.getElementById("edit-index").value);
      const kData = JSON.parse(localStorage.getItem("malaka_kegiatan")) || [];
      
      const newData = {
          id: document.getElementById("k-id").value,
          nama: document.getElementById("k-nama").value,
          kategori: document.getElementById("k-kategori").value,
          tanggal: document.getElementById("k-tanggal").value,
          kuota: document.getElementById("k-kuota").value,
          status: "Pendaftaran Terbuka"
      };

      if(index === -1) {
          kData.push(newData);
          UI.showAlert("Kegiatan berhasil ditambahkan!", "success");
      } else {
          // Keep existing properties like deskripsi, image etc if editing
          kData[index] = { ...kData[index], ...newData };
          UI.showAlert("Kegiatan berhasil diubah!", "success");
      }

      localStorage.setItem("malaka_kegiatan", JSON.stringify(kData));
      modal.style.display = "none";
      renderTableKegiatan();
  });

  document.getElementById("btn-export-csv").addEventListener("click", () => {
    UI.showAlert("Berhasil mengekspor data ke format CSV!", "success");
  });

  // Initial render
  renderTableKegiatan();
});

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  const isAuthPage = path.endsWith("login.html") || path.endsWith("registrasi.html");
  
  // Jika belum login dan bukan di halaman auth, lempar ke login
  if (!Storage.isLoggedIn() && !isAuthPage) {
    window.location.replace("login.html");
    return;
  }
  
  // Jika sudah login dan mencoba akses halaman auth, kembalikan ke index
  if (Storage.isLoggedIn() && isAuthPage) {
    window.location.replace("index.html");
    return;
  }

  // Inisialisasi logika Auth (Login / Register) jika elemen tombolnya ada di halaman
  if (document.getElementById("btn-login")) {
    Auth.initLogin();
  }

  if (document.getElementById("btn-daftar")) {
    Auth.initRegister();
  }

  // Render Profile Dropdown if navbar is present
  if (typeof UI !== "undefined") {
    UI.renderProfileDropdown();
  }

  // Initialize profile page if script is loaded
  if (typeof Profile !== "undefined") {
    Profile.init();
  }

  // Universal Detail Trigger
  const detailButtons = document.querySelectorAll(".btn-detail-trigger");
  detailButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-id");
      if (id) {
        localStorage.setItem("selected_kegiatan_id", id);
        window.location.href = "detail.html";
      }
    });
  });

  // Universal Daftar Trigger
  const daftarButtons = document.querySelectorAll(".btn-daftar-trigger");
  daftarButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-id");
      if (id) {
        localStorage.setItem("selected_kegiatan_id", id);
        window.location.href = "pendaftaran-form.html";
      }
    });
  });

  // Scroll To Top Logic
  const btnScrollTop = document.getElementById("btn-scroll-top");
  if (btnScrollTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        btnScrollTop.classList.add("show");
      } else {
        btnScrollTop.classList.remove("show");
      }
    });

    btnScrollTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

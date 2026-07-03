const kegiatanDB = [
    {
        id: "ACT001",
        nama: "Workshop UI/UX Design",
        kategori: "Seminar & Workshop",
        tanggal: "10 Juli 2026",
        waktu: "09:00 - 15:00 WIB",
        lokasi: "Aula Fakultas",
        kuota: "50 Peserta",
        status: "Pendaftaran Terbuka",
        statusBadge: "bg-green",
        statusLabel: "TERBARU",
        image: "images/images_kategori/01-gambar-seminar.jpg",
        deskripsi: "Dalam era digital saat ini, antarmuka pengguna (UI) dan pengalaman pengguna (UX) memainkan peran krusial dalam kesuksesan sebuah aplikasi atau website. Workshop eksklusif ini dirancang khusus bagi mahasiswa yang ingin mendalami dunia UI/UX design dari dasar hingga mampu membuat purwarupa (prototype) yang interaktif dan berstandar industri.<br><br>Peserta akan diajak untuk praktik langsung menggunakan perangkat lunak desain terkini seperti Figma, serta memahami bagaimana riset pengguna dapat diubah menjadi desain visual yang menarik.",
        materi: [
            "Pemahaman fundamental dan perbedaan UI dengan UX",
            "Prinsip hierarki visual dan psikologi warna",
            "Pengenalan dan praktik langsung menggunakan Figma",
            "Pembuatan Wireframe hingga High-Fidelity Prototype"
        ]
    },
    {
        id: "ACT002",
        nama: "Workshop Logika & DOM JavaScript",
        kategori: "Seminar & Workshop",
        tanggal: "12 Mei 2026",
        waktu: "13:00 - 16:00 WIB",
        lokasi: "Lab Komputer 2",
        kuota: "45 Peserta",
        status: "Pendaftaran Terbuka",
        statusBadge: "",
        statusLabel: "POPULER",
        image: "images/images_kategori/01-gambar-seminar.jpg",
        deskripsi: "Tingkatkan kemampuan pemrograman web Anda dengan workshop teknis yang fokus pada manipulasi Document Object Model (DOM) menggunakan Vanilla JavaScript. Sangat cocok bagi mahasiswa yang ingin membangun website interaktif tanpa bergantung pada library eksternal.",
        materi: [
            "Konsep dasar DOM Tree",
            "Seleksi dan manipulasi elemen HTML",
            "Penanganan event (Event Handling)",
            "Pembuatan fitur interaktif sederhana"
        ]
    },
    {
        id: "ACT003",
        nama: "Seminar Kewirausahaan",
        kategori: "Seminar & Workshop",
        tanggal: "15 Juli 2026",
        waktu: "08:00 - 12:00 WIB",
        lokasi: "Gedung Serba Guna",
        kuota: "0 Peserta (Penuh)",
        status: "Pendaftaran Ditutup",
        statusBadge: "bg-red",
        statusLabel: "PENUH",
        image: "images/images_kategori/01-gambar-seminar.jpg",
        deskripsi: "Membangun jiwa wirausaha di kalangan mahasiswa sangat penting untuk menghadapi tantangan masa depan. Seminar ini menghadirkan praktisi bisnis dan alumni sukses yang akan membagikan strategi memulai startup dari nol.",
        materi: [
            "Mindset seorang Entrepreneur",
            "Validasi ide bisnis",
            "Strategi pemasaran digital untuk pemula",
            "Sesi tanya jawab dengan praktisi"
        ]
    },
    {
        id: "ACT004",
        nama: "Seminar Modul Spesifik S/4HANA",
        kategori: "Seminar & Workshop",
        tanggal: "10 Mei 2026",
        waktu: "09:00 - 14:00 WIB",
        lokasi: "Auditorium Kampus",
        kuota: "150 Peserta",
        status: "Pendaftaran Terbuka",
        statusBadge: "",
        statusLabel: "POPULER",
        image: "images/images_kategori/01-gambar-seminar.jpg",
        deskripsi: "Pelajari bagaimana sistem ERP kelas dunia seperti SAP S/4HANA membantu perusahaan besar mengelola operasional mereka. Seminar ini sangat direkomendasikan untuk mahasiswa jurusan Sistem Informasi dan Manajemen.",
        materi: [
            "Pengenalan konsep ERP modern",
            "Arsitektur dasar S/4HANA",
            "Studi kasus implementasi modul di industri nyata"
        ]
    },
    {
        id: "ACT005",
        nama: "Lomba Pengembangan Aplikasi",
        kategori: "Lomba Akademik",
        tanggal: "20 Juli 2026",
        waktu: "08:00 WIB - Selesai",
        lokasi: "Lab Komputer",
        kuota: "30 Tim",
        status: "Pendaftaran Terbuka",
        statusBadge: "bg-green",
        statusLabel: "TERBARU",
        image: "images/images_kategori/02-gambar-lomba.jpg",
        deskripsi: "Uji kemampuan pemrograman dan problem solving Anda dengan mengikuti lomba pengembangan aplikasi tingkat universitas. Ajang ini merupakan kesempatan emas untuk unjuk gigi dan memenangkan berbagai hadiah menarik.",
        materi: [
            "Tema kompetisi: Solusi Digital Kampus Hijau",
            "Presentasi prototipe aplikasi",
            "Penilaian oleh dewan juri ahli"
        ]
    },
    {
        id: "ACT006",
        nama: "Lomba Desain Poster Nasional",
        kategori: "Lomba Akademik",
        tanggal: "5 Agustus 2026",
        waktu: "Online Submission",
        lokasi: "Online",
        kuota: "Tidak Terbatas",
        status: "Pendaftaran Terbuka",
        statusBadge: "",
        statusLabel: "POPULER",
        image: "images/images_kategori/02-gambar-lomba.jpg",
        deskripsi: "Salurkan kreativitas desain visual Anda melalui Lomba Desain Poster Tingkat Nasional. Kompetisi ini terbuka untuk seluruh mahasiswa dari berbagai program studi.",
        materi: [
            "Pembuatan karya sesuai tema Inovasi Teknologi Berkelanjutan",
            "Pengumpulan karya dilakukan secara daring"
        ]
    },
    {
        id: "ACT007",
        nama: "Hackathon Inovasi Kampus",
        kategori: "Lomba Akademik",
        tanggal: "25-26 Agustus 2026",
        waktu: "24 Jam",
        lokasi: "Gedung Pusat Inovasi",
        kuota: "20 Tim",
        status: "Segera Dibuka",
        statusBadge: "bg-gray",
        statusLabel: "COMING SOON",
        image: "images/images_kategori/02-gambar-lomba.jpg",
        deskripsi: "Acara maraton pemrograman selama 24 jam non-stop! Berkumpullah dengan tim Anda, buat solusi inovatif untuk masalah di sekitar kampus, dan menangkan total hadiah puluhan juta rupiah.",
        materi: [
            "Sesi perancangan ide (Ideation)",
            "Koding 24 Jam Non-stop",
            "Sesi pitching di depan investor"
        ]
    },
    {
        id: "ACT008",
        nama: "Rapat Anggota BEM",
        kategori: "Organisasi Mahasiswa",
        tanggal: "15 September 2026",
        waktu: "15:00 - 17:30 WIB",
        lokasi: "Ruang Rapat Utama",
        kuota: "Seluruh Anggota",
        status: "Khusus Anggota",
        statusBadge: "",
        statusLabel: "INTERNAL",
        image: "images/images_kategori/03-gambar-organisasi.jpg",
        deskripsi: "Rapat kordinasi bulanan khusus untuk seluruh pengurus dan anggota Badan Eksekutif Mahasiswa (BEM) guna membahas agenda dan program kerja bulan mendatang.",
        materi: [
            "Evaluasi program kerja bulan sebelumnya",
            "Pembahasan kalender acara organisasi",
            "Penugasan panitia khusus"
        ]
    },
    {
        id: "ACT009",
        nama: "Open Recruitment HIMA",
        kategori: "Organisasi Mahasiswa",
        tanggal: "1-10 Oktober 2026",
        waktu: "Daring & Luring",
        lokasi: "Sekretariat HIMA",
        kuota: "100 Calon Anggota",
        status: "Pendaftaran Terbuka",
        statusBadge: "bg-green",
        statusLabel: "TERBARU",
        image: "images/images_kategori/03-gambar-organisasi.jpg",
        deskripsi: "Himpunan Mahasiswa (HIMA) kembali membuka pendaftaran untuk kepengurusan periode terbaru! Jika Anda mahasiswa yang aktif, kreatif, dan suka berorganisasi, segera daftarkan diri Anda.",
        materi: [
            "Seleksi berkas administrasi",
            "Sesi wawancara tatap muka",
            "Malam keakraban (Makrab)"
        ]
    },
    {
        id: "ACT010",
        nama: "Pelatihan Public Speaking",
        kategori: "Pelatihan Soft Skill",
        tanggal: "5 Agustus 2026",
        waktu: "09:00 - 12:00 WIB",
        lokasi: "Auditorium",
        kuota: "25 Peserta",
        status: "Pendaftaran Terbuka",
        statusBadge: "bg-green",
        statusLabel: "TERBARU",
        image: "images/images_kategori/04-gambar-pelatihan.jpg",
        deskripsi: "Kemampuan berbicara di depan umum sangat esensial baik di dunia akademik maupun karier profesional. Pelatihan ini dirancang untuk mengatasi rasa gugup dan meningkatkan percaya diri Anda saat melakukan presentasi.",
        materi: [
            "Menguasai bahasa tubuh (Body Language)",
            "Teknik artikulasi dan intonasi suara",
            "Menyusun struktur presentasi yang memikat",
            "Simulasi presentasi singkat"
        ]
    },
    {
        id: "ACT011",
        nama: "Pelatihan Kepemimpinan",
        kategori: "Pelatihan Soft Skill",
        tanggal: "12 September 2026",
        waktu: "08:00 - 15:00 WIB",
        lokasi: "Camp Ground Universitas",
        kuota: "50 Peserta",
        status: "Pendaftaran Terbuka",
        statusBadge: "",
        statusLabel: "POPULER",
        image: "images/images_kategori/04-gambar-pelatihan.jpg",
        deskripsi: "Program Latihan Dasar Kepemimpinan (LDK) untuk mencetak calon-calon pemimpin masa depan. Menggabungkan materi teoretis dengan aktivitas lapangan (outbound) yang menantang.",
        materi: [
            "Teori kepemimpinan dan manajemen konflik",
            "Kerja sama tim (Team Building)",
            "Pengambilan keputusan di bawah tekanan"
        ]
    }
];

// Data Keunggulan Platform
window.keunggulanData = [
    {
        id: 1,
        title: "Akses Mudah & Cepat",
        image: "images/images_platform/01-Akses-Mudah-dan-Cepat.jpg",
        desc1: "Kami memahami bahwa waktu mahasiswa sangatlah berharga. Oleh karena itu, Sistem Pendaftaran Kegiatan Mahasiswa ini dibangun dengan infrastruktur teknologi modern yang mengutamakan kecepatan dan kemudahan akses di setiap lapisannya.",
        desc2: "Anda tidak perlu lagi membuang waktu datang ke mading kampus atau mengantre di sekretariat himpunan hanya untuk mencari tahu dan mendaftar kegiatan. Semua informasi dari berbagai fakultas dan UKM kini terintegrasi penuh dan dapat diakses langsung dari genggaman Anda, kapan saja dan di mana saja.",
        points: [
            "<strong>Responsif di Semua Perangkat:</strong> Tampilan antarmuka yang akan menyesuaikan diri secara otomatis dengan sempurna, baik Anda membukanya di laptop, tablet, maupun layar smartphone yang sempit.",
            "<strong>Pemuatan Halaman Instan:</strong> Arsitektur kode yang ringan dan teroptimasi membuat setiap halaman web terbuka dalam hitungan detik.",
            "<strong>Pencarian Real-Time:</strong> Temukan seminar, lomba, atau organisasi yang spesifik Anda minati menggunakan fitur pencarian dan filter kategori yang cerdas.",
            "<strong>Proses 1-Klik:</strong> Alur pendaftaran yang disederhanakan tanpa birokrasi digital yang panjang dan rumit."
        ],
        spec1_label: "Ikon Fitur", spec1_value: "Rocket (Kecepatan)", spec1_icon: "fa-rocket",
        spec2_label: "Status", spec2_value: "Aktif & Optimal", spec2_icon: "fa-check-circle", spec2_color: "#10b981",
        spec3_label: "Dukungan", spec3_value: "Web & Mobile iOS/Android", spec3_icon: "fa-mobile-alt",
        statusText: "Pilar Utama Sistem", statusBg: "#3b82f6"
    },
    {
        id: 2,
        title: "Informasi Terpusat",
        image: "images/images_platform/02-Informasi-Terpusat.jpg",
        desc1: "Sistem Pendaftaran Kegiatan Mahasiswa berfungsi sebagai pusat data tunggal (*single source of truth*) untuk seluruh aktivitas akademik dan non-akademik di lingkungan kampus. Fitur Informasi Terpusat ini hadir untuk menghilangkan kebingungan mahasiswa akibat informasi yang sering kali tersebar di berbagai grup pesan, media sosial, atau papan pengumuman fisik.",
        desc2: "Dengan menggunakan basis data yang terintegrasi, setiap fakultas, program studi, hingga Unit Kegiatan Mahasiswa (UKM) dapat mempublikasikan acara mereka di satu wadah yang sama. Hal ini menjamin bahwa informasi yang Anda terima selalu akurat, resmi, dan terkini.",
        points: [
            "<strong>Basis Data Terpadu:</strong> Seluruh data kegiatan, kuota peserta, dan jadwal tersimpan dalam satu server yang aman dan tersinkronisasi.",
            "<strong>Sistem Satu Pintu:</strong> Anda tidak perlu membuat banyak akun; cukup gunakan akun mahasiswa Anda untuk mendaftar ke berbagai kepanitiaan, lomba, atau pelatihan.",
            "<strong>Arsip Digital:</strong> Melacak dan menyimpan seluruh riwayat partisipasi kegiatan Anda dari semester awal hingga akhir di satu tempat.",
            "<strong>Pengelolaan Mudah:</strong> Membantu pihak penyelenggara (panitia) dalam mengelola pendaftar tanpa perlu menggunakan lembar kerja (spreadsheet) terpisah yang rentan hilang."
        ],
        spec1_label: "Ikon Fitur", spec1_value: "Server (Basis Data)", spec1_icon: "fa-server",
        spec2_label: "Skala", spec2_value: "Seluruh Fakultas & UKM", spec2_icon: "fa-network-wired", spec2_color: "var(--primary-blue)",
        spec3_label: "Sistem", spec3_value: "Cloud & Sinkronisasi Real-time", spec3_icon: "fa-shield-alt",
        statusText: "Pusat Data Kampus", statusBg: "#f59e0b"
    },
    {
        id: 3,
        title: "Pelacakan Kemajuan",
        image: "images/images_platform/03-Pelacakan-Kemajuan.jpg",
        desc1: "Mengingat pentingnya portofolio bagi mahasiswa di masa kini, Sistem Pendaftaran Kegiatan Mahasiswa menghadirkan fitur <strong>Pelacakan Kemajuan</strong>. Fitur ini dirancang secara khusus agar Anda dapat memantau seluruh riwayat partisipasi kegiatan Anda secara terpusat dan <i>real-time</i>.",
        desc2: "Anda tidak perlu lagi mencatat secara manual atau takut kehilangan sertifikat fisik. Setiap seminar, lomba, atau pelatihan yang telah Anda ikuti dan selesaikan akan otomatis tercatat ke dalam sistem. Hal ini membentuk sebuah rekam jejak akademik dan non-akademik yang rapi, kredibel, dan siap digunakan sebagai portofolio pendamping ijazah Anda kelak.",
        points: [
            "<strong>Riwayat Terpusat:</strong> Pantau status pendaftaran, kegiatan yang sedang berjalan, hingga kegiatan yang sudah selesai dalam satu dasbor.",
            "<strong>Unduh E-Sertifikat:</strong> Akses dan unduh sertifikat elektronik (e-certificate) langsung dari sistem segera setelah kegiatan dinyatakan selesai oleh panitia.",
            "<strong>Portofolio Digital:</strong> Rekam jejak partisipasi Anda secara otomatis disusun menjadi draf portofolio kemahasiswaan yang terstruktur.",
            "<strong>Indikator Partisipasi:</strong> Visualisasi grafik sederhana yang membantu Anda mengukur seberapa aktif Anda dalam berbagai kategori kegiatan kampus."
        ],
        spec1_label: "Ikon Fitur", spec1_value: "Grafik (Pelacakan)", spec1_icon: "fa-chart-line",
        spec2_label: "Fungsi", spec2_value: "Monitoring Portofolio", spec2_icon: "fa-file-contract", spec2_color: "var(--primary-blue)",
        spec3_label: "Sistem", spec3_value: "Pembaruan Otomatis", spec3_icon: "fa-sync-alt",
        statusText: "Pusat Portofolio", statusBg: "#ef4444"
    },
    {
        id: 4,
        title: "Keamanan Data",
        image: "images/images_platform/04-Keamanan-Data.jpg",
        desc1: "Dalam mengelola Sistem Pendaftaran Kegiatan Mahasiswa, kami menempatkan <strong>Keamanan Data</strong> sebagai prioritas utama operasional kami. Kami sangat memahami bahwa data pribadi pengguna seperti Nama Lengkap, Nomor Induk Mahasiswa (NIM), alamat Email, hingga riwayat akademik merupakan informasi sensitif yang wajib dilindungi.",
        desc2: "Oleh karena itu, platform ini dirancang dengan standar enkripsi modern dan protokol keamanan berlapis untuk mencegah akses tidak sah, kebocoran data, maupun penyalahgunaan informasi oleh pihak ketiga. Anda dapat mendaftar dan berpartisipasi dalam berbagai kegiatan dengan tenang.",
        points: [
            "<strong>Enkripsi Data:</strong> Seluruh data pengguna yang dikirim ke peladen (server) dilindungi menggunakan standar enkripsi agar tidak dapat disadap.",
            "<strong>Kerahasiaan Terjamin:</strong> Data pribadi Anda hanya digunakan untuk keperluan administrasi pendaftaran kegiatan kampus dan tidak akan disebarluaskan.",
            "<strong>Autentikasi Terpusat:</strong> Melindungi akun Anda dari upaya peretasan dengan manajemen akses yang aman dan andal.",
            "<strong>Transparansi Privasi:</strong> Kami berkomitmen untuk selalu memastikan mahasiswa memiliki kendali penuh atas informasi yang mereka bagikan."
        ],
        spec1_label: "Ikon Fitur", spec1_value: "Perisai (Proteksi)", spec1_icon: "fa-shield-alt",
        spec2_label: "Privasi", spec2_value: "Terlindungi Penuh", spec2_icon: "fa-lock", spec2_color: "#10b981",
        spec3_label: "Standar", spec3_value: "Enkripsi Industri", spec3_icon: "fa-server",
        statusText: "Privasi Terjamin", statusBg: "#10b981"
    }
];

// Data Tim Pengembang
window.timData = [
    {
        id: 1,
        nama: "Malikul Sholeh Rangkuti",
        jabatan: "Anggota",
        peran: "Front-End Developer",
        deskripsi: "Bertanggung jawab menerjemahkan desain ke dalam kode HTML dan CSS interaktif yang responsif di berbagai perangkat.",
        foto: "images/images_tim/Malikul_Sholeh_Rangkuti.jpeg"
    },
    {
        id: 2,
        nama: "Edy Kevin Feryanto Purba",
        jabatan: "Ketua",
        peran: "UI/UX Designer",
        deskripsi: "Fokus pada perancangan antarmuka yang ramah pengguna, riset pengalaman, dan pembuatan purwarupa yang estetik.",
        foto: "images/images_tim/Edy_Kevin_Feryanto_Purba.jpeg"
    },
    {
        id: 3,
        nama: "Ricky Yudianto",
        jabatan: "Anggota",
        peran: "Front-End Developer",
        deskripsi: "Bertanggung jawab menerjemahkan desain ke dalam kode HTML dan CSS interaktif yang responsif di berbagai perangkat.",
        foto: "images/images_tim/Ricky_Yudianto.jpeg"
    }
];

// Ekspos kegiatanDB
window.kegiatanData = typeof kegiatanDB !== 'undefined' ? kegiatanDB : [];
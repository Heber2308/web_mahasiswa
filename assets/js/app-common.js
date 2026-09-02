/* ===================================================
   APP COMMON UTILITIES & SCRIPTS
   =================================================== */

// ===== TAHUN OTOMATIS =====
function updateTahunFooter() {
    const el = document.getElementById('tahun');
    if (el) {
        el.textContent = new Date().getFullYear();
    }
}

// ===== SLIDESHOW BACKGROUND =====
let slideIndex = 0;
function initSlideshow() {
    const slides = document.querySelectorAll('.slideshow-bg .slide');
    if (!slides || slides.length === 0) return;

    function nextSlide() {
        const currentSlides = document.querySelectorAll('.slideshow-bg .slide');
        if (currentSlides.length > 0) {
            currentSlides[slideIndex].classList.remove('active');
            slideIndex = (slideIndex + 1) % currentSlides.length;
            currentSlides[slideIndex].classList.add('active');
        }
    }

    setInterval(nextSlide, 4000);
}

// ===== TOGGLE SIDEBAR =====
function toggleSidebar() {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
    if (overlay) {
        overlay.classList.toggle('show');
    }
}

// ===== TUTUP SIDEBAR SAAT KLIK DI LUAR (MOBILE) =====
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const toggleBtn = document.querySelector('.toggle-sidebar');

    if (window.innerWidth <= 991) {
        if (sidebar && !sidebar.contains(event.target) && toggleBtn && !toggleBtn.contains(event.target)) {
            sidebar.classList.remove('show');
            if (overlay) overlay.classList.remove('show');
        }
    }
});

// ===== SET ACTIVE MENU =====
function setActiveMenu(page) {
    const links = document.querySelectorAll('.sidebar-menu .nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        }
    });
}

// ===== SET PAGE TITLE =====
function setPageTitle(title, subtitle) {
    const titleEl = document.getElementById('pageTitle');
    const subtitleEl = document.getElementById('pageSubtitle');
    if (titleEl) titleEl.textContent = title;
    if (subtitleEl && subtitle) subtitleEl.textContent = subtitle;
}

// ================================================================
// ===== DATA GLOBAL (localStorage) =====
// ================================================================

const defaultMahasiswa = [
    { id: 1, nim: '2023001', nama: 'Andi Pratama', jurusan: 'Informatika', ipk: 3.75 },
    { id: 2, nim: '2023002', nama: 'Budi Santoso', jurusan: 'Sistem Informasi', ipk: 2.80 },
    { id: 3, nim: '2023003', nama: 'Citra Dewi', jurusan: 'Teknik Komputer', ipk: 3.90 },
    { id: 4, nim: '2023004', nama: 'Dian Sastro', jurusan: 'Data Science', ipk: 3.50 },
    { id: 5, nim: '2023005', nama: 'Eko Prasetyo', jurusan: 'Informatika', ipk: 2.95 },
    { id: 6, nim: '2023006', nama: 'Rina Marlina', jurusan: 'Sistem Informasi', ipk: 3.20 }
];

const defaultDosen = [
    { id: 1, nidn: '110001', nama: 'Dr. Rina Sari, M.Kom', jurusan: 'Informatika', spesialisasi: 'AI & Machine Learning' },
    { id: 2, nidn: '110002', nama: 'Dr. Budi Hartono, M.Sc', jurusan: 'Sistem Informasi', spesialisasi: 'Data Mining' },
    { id: 3, nidn: '110003', nama: 'Dra. Anita Wijaya, M.T', jurusan: 'Teknik Komputer', spesialisasi: 'Jaringan Komputer' },
    { id: 4, nidn: '110004', nama: 'Dr. Andi Kusuma, Ph.D', jurusan: 'Data Science', spesialisasi: 'Big Data' }
];

const defaultMatkul = [
    { id: 1, kode: 'MK001', nama: 'Pemrograman Web', jurusan: 'Informatika', semester: 3, sks: 3 },
    { id: 2, kode: 'MK002', nama: 'Basis Data', jurusan: 'Sistem Informasi', semester: 2, sks: 3 },
    { id: 3, kode: 'MK003', nama: 'Jaringan Komputer', jurusan: 'Teknik Komputer', semester: 4, sks: 4 },
    { id: 4, kode: 'MK004', nama: 'Machine Learning', jurusan: 'Data Science', semester: 5, sks: 3 },
    { id: 5, kode: 'MK005', nama: 'Pemrograman Mobile', jurusan: 'Informatika', semester: 4, sks: 3 },
    { id: 6, kode: 'MK006', nama: 'Sistem Informasi Manajemen', jurusan: 'Sistem Informasi', semester: 3, sks: 3 },
    { id: 7, kode: 'MK007', nama: 'Arsitektur Komputer', jurusan: 'Teknik Komputer', semester: 2, sks: 3 },
    { id: 8, kode: 'MK008', nama: 'Visualisasi Data', jurusan: 'Data Science', semester: 4, sks: 3 }
];

function getStoredData(key, defaultData) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultData;
}

function setStoredData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    updateAllBadges();
}

// Inisialisasi awal data di localStorage jika belum ada
if (!localStorage.getItem('dataMahasiswa')) localStorage.setItem('dataMahasiswa', JSON.stringify(defaultMahasiswa));
if (!localStorage.getItem('dataDosen')) localStorage.setItem('dataDosen', JSON.stringify(defaultDosen));
if (!localStorage.getItem('dataMatkul')) localStorage.setItem('dataMatkul', JSON.stringify(defaultMatkul));

// ================================================================
// ===== UPDATE SIDEBAR BADGE =====
// ================================================================

function updateAllBadges() {
    const badgeMhs = document.getElementById('badgeMahasiswa');
    const badgeDsn = document.getElementById('badgeDosen');
    const badgeMatkul = document.getElementById('badgeMatkul');

    if (badgeMhs) badgeMhs.textContent = getStoredData('dataMahasiswa', defaultMahasiswa).length;
    if (badgeDsn) badgeDsn.textContent = getStoredData('dataDosen', defaultDosen).length;
    if (badgeMatkul) badgeMatkul.textContent = getStoredData('dataMatkul', defaultMatkul).length;
}

// ================================================================
// ===== INISIALISASI =====
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    updateTahunFooter();
    initSlideshow();
    
    // Perbarui badge dengan data terbaru dari localStorage
    setTimeout(updateAllBadges, 300);
    setTimeout(updateAllBadges, 1000);
});

document.addEventListener('componentsLoaded', function() {
    updateAllBadges();
});
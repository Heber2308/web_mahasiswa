/* ===================================================
   DASHBOARD SCRIPT
   =================================================== */

// ===== DATA =====
let mahasiswa = getStoredData('dataMahasiswa', defaultMahasiswa);
let dosen = getStoredData('dataDosen', defaultDosen);
let matakuliah = getStoredData('dataMatkul', defaultMatkul);

// ===== UPDATE STATISTIK =====
function updateStatistik() {
    const elMhs = document.getElementById('totalMahasiswa');
    const elDsn = document.getElementById('totalDosen');
    const elMatkul = document.getElementById('totalMatkul');
    const elJurusan = document.getElementById('totalJurusan');

    if (elMhs) elMhs.textContent = mahasiswa.length;
    if (elDsn) elDsn.textContent = dosen.length;
    if (elMatkul) elMatkul.textContent = matakuliah.length;

    // Badge Sidebar
    const badgeMhs = document.getElementById('badgeMahasiswa');
    const badgeDsn = document.getElementById('badgeDosen');
    const badgeMatkul = document.getElementById('badgeMatkul');
    if (badgeMhs) badgeMhs.textContent = mahasiswa.length;
    if (badgeDsn) badgeDsn.textContent = dosen.length;
    if (badgeMatkul) badgeMatkul.textContent = matakuliah.length;

    // Total Jurusan
    let allJurusan = [];
    mahasiswa.forEach(m => { if (!allJurusan.includes(m.jurusan)) allJurusan.push(m.jurusan); });
    dosen.forEach(d => { if (!allJurusan.includes(d.jurusan)) allJurusan.push(d.jurusan); });
    matakuliah.forEach(mk => { if (!allJurusan.includes(mk.jurusan)) allJurusan.push(mk.jurusan); });
    if (elJurusan) elJurusan.textContent = allJurusan.length;
}

// ===== RENDER TABEL =====
function renderTabel() {
    // Mahasiswa Terbaru
    let tabelMhs = document.getElementById('tabelMahasiswaTerbaru');
    if (tabelMhs) {
        tabelMhs.innerHTML = '';
        mahasiswa.slice(-3).reverse().forEach(m => {
            tabelMhs.innerHTML += `<tr><td>${m.nama}</td><td>${m.jurusan}</td></tr>`;
        });
    }

    // Dosen Terbaru
    let tabelDsn = document.getElementById('tabelDosenTerbaru');
    if (tabelDsn) {
        tabelDsn.innerHTML = '';
        dosen.slice(-3).reverse().forEach(d => {
            tabelDsn.innerHTML += `<tr><td>${d.nama}</td><td>${d.jurusan}</td></tr>`;
        });
    }

    // Mata Kuliah Terbaru
    let tabelMatkul = document.getElementById('tabelMatkulTerbaru');
    if (tabelMatkul) {
        tabelMatkul.innerHTML = '';
        matakuliah.slice(-3).reverse().forEach(mk => {
            tabelMatkul.innerHTML += `<tr><td>${mk.kode}</td><td>${mk.nama}</td></tr>`;
        });
    }
}

// ===== RENDER AKTIVITAS =====
function renderAktivitas() {
    let list = document.getElementById('aktivitasList');
    if (!list) return;

    let aktivitas = [
        { icon: '👨‍🎓', text: `${mahasiswa[mahasiswa.length-1]?.nama || 'Mahasiswa'} mendaftar`, time: '2 menit lalu' },
        { icon: '📝', text: `Data ${dosen[dosen.length-1]?.nama || 'Dosen'} diupdate`, time: '15 menit lalu' },
        { icon: '📚', text: `Mata Kuliah "${matakuliah[matakuliah.length-1]?.nama || 'Mata Kuliah'}" ditambahkan`, time: '1 jam lalu' },
        { icon: '🎓', text: 'Mahasiswa lulus: 3 orang', time: '2 jam lalu' },
        { icon: '👨‍🏫', text: `Dosen baru: "${dosen[0]?.nama || 'Dr. Baru'}"`, time: '3 jam lalu' }
    ];

    list.innerHTML = '';
    aktivitas.forEach(a => {
        list.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${a.icon} ${a.text}</span>
                <small>${a.time}</small>
            </li>
        `;
    });
}

// ===== INISIALISASI HALAMAN =====
function initDashboard() {
    setPageTitle('📊 Dashboard', 'Selamat datang di Sistem Data Mahasiswa');
    setActiveMenu('dashboard.html');
    updateStatistik();
    renderTabel();
    renderAktivitas();
}

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

document.addEventListener('componentsLoaded', function() {
    initDashboard();
});

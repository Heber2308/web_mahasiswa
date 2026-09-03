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
function getDataDashboard() {
    const pencarian = document.getElementById('pencarianDashboard')?.value.trim().toLowerCase() || '';
    const pengurutan = document.getElementById('pengurutanDashboard')?.value || 'default';
    const semuaData = [
        ...mahasiswa.map(data => ({ ...data, tipe: 'Mahasiswa', identitas: data.nim })),
        ...dosen.map(data => ({ ...data, tipe: 'Dosen', identitas: data.nidn })),
        ...matakuliah.map(data => ({ ...data, tipe: 'Mata Kuliah', identitas: data.kode }))
    ];

    const hasil = semuaData.filter(data => Object.values(data).some(nilai =>
        String(nilai).toLowerCase().includes(pencarian)
    ));

    if (pengurutan !== 'default') {
        const [kolom, arah] = pengurutan.split('-');
        hasil.sort((a, b) => {
            const nilaiA = String(a[kolom] || '').toLowerCase();
            const nilaiB = String(b[kolom] || '').toLowerCase();
            const perbandingan = nilaiA.localeCompare(nilaiB, 'id', { numeric: true });
            return arah === 'desc' ? -perbandingan : perbandingan;
        });
    }

    return {
        mahasiswa: hasil.filter(data => data.tipe === 'Mahasiswa'),
        dosen: hasil.filter(data => data.tipe === 'Dosen'),
        matakuliah: hasil.filter(data => data.tipe === 'Mata Kuliah'),
        total: hasil.length
    };
}

function renderTabel() {
    const dataTampil = getDataDashboard();
    const status = document.getElementById('statusPencarianDashboard');
    if (status) {
        status.textContent = dataTampil.total === mahasiswa.length + dosen.length + matakuliah.length
            ? `Menampilkan ${dataTampil.total} data`
            : `Menampilkan ${dataTampil.total} data hasil pencarian`;
    }

    // Mahasiswa Terbaru
    let tabelMhs = document.getElementById('tabelMahasiswaTerbaru');
    if (tabelMhs) {
        tabelMhs.innerHTML = '';
        dataTampil.mahasiswa.forEach(m => {
            tabelMhs.innerHTML += `<tr><td>${m.nama}<small class="d-block text-muted">${m.identitas}</small></td><td>${m.jurusan}</td></tr>`;
        });
        if (dataTampil.mahasiswa.length === 0) tabelMhs.innerHTML = '<tr><td colspan="2" class="text-center">Tidak ada data</td></tr>';
    }

    // Dosen Terbaru
    let tabelDsn = document.getElementById('tabelDosenTerbaru');
    if (tabelDsn) {
        tabelDsn.innerHTML = '';
        dataTampil.dosen.forEach(d => {
            tabelDsn.innerHTML += `<tr><td>${d.nama}<small class="d-block text-muted">${d.identitas}</small></td><td>${d.jurusan}</td></tr>`;
        });
        if (dataTampil.dosen.length === 0) tabelDsn.innerHTML = '<tr><td colspan="2" class="text-center">Tidak ada data</td></tr>';
    }

    // Mata Kuliah Terbaru
    let tabelMatkul = document.getElementById('tabelMatkulTerbaru');
    if (tabelMatkul) {
        tabelMatkul.innerHTML = '';
        dataTampil.matakuliah.forEach(mk => {
            tabelMatkul.innerHTML += `<tr><td>${mk.kode}</td><td>${mk.nama}<small class="d-block text-muted">${mk.jurusan}</small></td></tr>`;
        });
        if (dataTampil.matakuliah.length === 0) tabelMatkul.innerHTML = '<tr><td colspan="2" class="text-center">Tidak ada data</td></tr>';
    }
}

function initKontrolDashboard() {
    ['pencarianDashboard', 'pengurutanDashboard'].forEach(id => {
        const kontrol = document.getElementById(id);
        if (!kontrol || kontrol.dataset.terpasang === 'true') return;
        kontrol.addEventListener('input', renderTabel);
        kontrol.addEventListener('change', renderTabel);
        kontrol.dataset.terpasang = 'true';
    });
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
    initKontrolDashboard();
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

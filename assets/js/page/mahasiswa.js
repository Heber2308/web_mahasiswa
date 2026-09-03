/* ===================================================
   MAHASISWA CRUD SCRIPT
   =================================================== */

// ===== DATA MAHASISWA =====
let mahasiswa = getStoredData('dataMahasiswa', defaultMahasiswa);
let idCounter = mahasiswa.length > 0 ? Math.max(...mahasiswa.map(m => m.id)) + 1 : 1;

// ===== UPDATE BADGE SIDEBAR =====
function updateBadge() {
    setStoredData('dataMahasiswa', mahasiswa);
}

// ===== RENDER TABEL =====
function getDataTampil() {
    const pencarian = document.getElementById('pencarianMahasiswa')?.value.trim().toLowerCase() || '';
    const jurusan = document.getElementById('filterJurusan')?.value || '';
    const pengurutan = document.getElementById('pengurutanMahasiswa')?.value || 'default';

    const hasil = mahasiswa.filter(m => {
        const cocokPencarian = !pencarian || `${m.nim} ${m.nama}`.toLowerCase().includes(pencarian);
        const cocokJurusan = !jurusan || m.jurusan === jurusan;
        return cocokPencarian && cocokJurusan;
    });

    if (pengurutan !== 'default') {
        const [kolom, arah] = pengurutan.split('-');
        hasil.sort((a, b) => {
            const nilaiA = kolom === 'ipk' ? Number(a[kolom]) : String(a[kolom]).toLowerCase();
            const nilaiB = kolom === 'ipk' ? Number(b[kolom]) : String(b[kolom]).toLowerCase();
            const perbandingan = nilaiA > nilaiB ? 1 : nilaiA < nilaiB ? -1 : 0;
            return arah === 'desc' ? -perbandingan : perbandingan;
        });
    }

    return hasil;
}

function renderTabel() {
    let tabel = document.getElementById('tabelMahasiswa');
    if (!tabel) return;

    tabel.innerHTML = '';
    const dataTampil = getDataTampil();
    const status = document.getElementById('statusFilterMahasiswa');

    if (status) {
        status.textContent = dataTampil.length === mahasiswa.length
            ? `Menampilkan ${mahasiswa.length} mahasiswa`
            : `Menampilkan ${dataTampil.length} dari ${mahasiswa.length} mahasiswa`;
    }

    if (dataTampil.length === 0) {
        const pesanKosong = mahasiswa.length === 0
            ? 'Belum ada data mahasiswa'
            : 'Data mahasiswa tidak ditemukan';
        tabel.innerHTML = `<tr><td colspan="6" class="text-center">${pesanKosong}</td></tr>`;
        updateBadge();
        return;
    }

    dataTampil.forEach((m, index) => {
        tabel.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${m.nim}</td>
                <td>${m.nama}</td>
                <td>${m.jurusan}</td>
                <td>${m.ipk}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="bukaModalEdit(${m.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="hapusMahasiswa(${m.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    updateBadge();
}

function initKontrolTabel() {
    ['pencarianMahasiswa', 'filterJurusan', 'pengurutanMahasiswa'].forEach(id => {
        const kontrol = document.getElementById(id);
        if (!kontrol || kontrol.dataset.terpasang === 'true') return;
        kontrol.addEventListener('input', renderTabel);
        kontrol.addEventListener('change', renderTabel);
        kontrol.dataset.terpasang = 'true';
    });
}

// ===== TAMBAH MAHASISWA =====
function bukaModalTambah() {
    document.getElementById('formTambah').reset();
    document.getElementById('pesanTambah').innerHTML = '';
    $('#modalTambah').modal('show');
}

function tambahMahasiswa() {
    let nim = document.getElementById('nimTambah').value;
    let nama = document.getElementById('namaTambah').value;
    let jurusan = document.getElementById('jurusanTambah').value;
    let ipk = document.getElementById('ipkTambah').value;
    let pesan = document.getElementById('pesanTambah');

    if (nim === '' || nama === '' || jurusan === '' || ipk === '') {
        pesan.innerHTML = '<div class="alert alert-danger">Semua field harus diisi!</div>';
        return false;
    }

    if (mahasiswa.some(m => m.nim === nim)) {
        pesan.innerHTML = '<div class="alert alert-danger">NIM sudah terdaftar!</div>';
        return false;
    }

    mahasiswa.push({ id: idCounter++, nim, nama, jurusan, ipk: parseFloat(ipk) });
    pesan.innerHTML = '<div class="alert alert-success">✅ Data berhasil ditambahkan!</div>';
    renderTabel();

    setTimeout(() => $('#modalTambah').modal('hide'), 1000);
    return false;
}

// ===== EDIT MAHASISWA =====
function bukaModalEdit(id) {
    let m = mahasiswa.find(m => m.id === id);
    if (!m) return;

    document.getElementById('editId').value = m.id;
    document.getElementById('editNim').value = m.nim;
    document.getElementById('editNama').value = m.nama;
    document.getElementById('editJurusan').value = m.jurusan;
    document.getElementById('editIpk').value = m.ipk;
    document.getElementById('pesanEdit').innerHTML = '';
    $('#modalEdit').modal('show');
}

function editMahasiswa() {
    let id = parseInt(document.getElementById('editId').value);
    let nim = document.getElementById('editNim').value;
    let nama = document.getElementById('editNama').value;
    let jurusan = document.getElementById('editJurusan').value;
    let ipk = document.getElementById('editIpk').value;
    let pesan = document.getElementById('pesanEdit');

    if (nim === '' || nama === '' || jurusan === '' || ipk === '') {
        pesan.innerHTML = '<div class="alert alert-danger">Semua field harus diisi!</div>';
        return false;
    }

    let index = mahasiswa.findIndex(m => m.id === id);
    if (index === -1) {
        pesan.innerHTML = '<div class="alert alert-danger">Data tidak ditemukan!</div>';
        return false;
    }

    if (mahasiswa.some(m => m.nim === nim && m.id !== id)) {
        pesan.innerHTML = '<div class="alert alert-danger">NIM sudah terdaftar!</div>';
        return false;
    }

    mahasiswa[index] = { id, nim, nama, jurusan, ipk: parseFloat(ipk) };
    pesan.innerHTML = '<div class="alert alert-success">✅ Data berhasil diupdate!</div>';
    renderTabel();

    setTimeout(() => $('#modalEdit').modal('hide'), 1000);
    return false;
}

// ===== HAPUS MAHASISWA =====
function hapusMahasiswa(id) {
    let m = mahasiswa.find(m => m.id === id);
    if (!m) return;

    if (confirm(`Apakah Anda yakin ingin menghapus data ${m.nama}?`)) {
        mahasiswa = mahasiswa.filter(m => m.id !== id);
        renderTabel();
        alert('✅ Data berhasil dihapus!');
    }
}

// ===== INISIALISASI HALAMAN =====
function initMahasiswa() {
    setPageTitle('👨‍🎓 Data Mahasiswa', 'Kelola data mahasiswa');
    setActiveMenu('mahasiswa.html');
    initKontrolTabel();
    renderTabel();
}

document.addEventListener('DOMContentLoaded', function() {
    initMahasiswa();
});

document.addEventListener('componentsLoaded', function() {
    initMahasiswa();
});

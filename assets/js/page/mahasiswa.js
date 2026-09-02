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
function renderTabel() {
    let tabel = document.getElementById('tabelMahasiswa');
    if (!tabel) return;

    tabel.innerHTML = '';

    if (mahasiswa.length === 0) {
        tabel.innerHTML = `<tr><td colspan="6" class="text-center">Belum ada data mahasiswa</td></tr>`;
        updateBadge();
        return;
    }

    mahasiswa.forEach((m, index) => {
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
    renderTabel();
}

document.addEventListener('DOMContentLoaded', function() {
    initMahasiswa();
});

document.addEventListener('componentsLoaded', function() {
    initMahasiswa();
});

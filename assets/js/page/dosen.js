/* ===================================================
   DOSEN CRUD SCRIPT
   =================================================== */

// ===== DATA DOSEN =====
let dosen = getStoredData('dataDosen', defaultDosen);
let idCounter = dosen.length > 0 ? Math.max(...dosen.map(d => d.id)) + 1 : 1;

// ===== UPDATE BADGE SIDEBAR =====
function updateBadge() {
    setStoredData('dataDosen', dosen);
}

// ===== RENDER TABEL =====
function renderTabel() {
    let tabel = document.getElementById('tabelDosen');
    if (!tabel) return;

    tabel.innerHTML = '';

    if (dosen.length === 0) {
        tabel.innerHTML = `<tr><td colspan="6" class="text-center">Belum ada data dosen</td></tr>`;
        updateBadge();
        return;
    }

    dosen.forEach((d, index) => {
        tabel.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${d.nidn}</td>
                <td>${d.nama}</td>
                <td>${d.jurusan}</td>
                <td>${d.spesialisasi}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="bukaModalEdit(${d.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="hapusDosen(${d.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    updateBadge();
}

// ===== TAMBAH DOSEN =====
function bukaModalTambah() {
    document.getElementById('formTambah').reset();
    document.getElementById('pesanTambah').innerHTML = '';
    $('#modalTambah').modal('show');
}

function tambahDosen() {
    let nidn = document.getElementById('nidnTambah').value;
    let nama = document.getElementById('namaTambah').value;
    let jurusan = document.getElementById('jurusanTambah').value;
    let spesialisasi = document.getElementById('spesialisasiTambah').value;
    let pesan = document.getElementById('pesanTambah');

    if (nidn === '' || nama === '' || jurusan === '' || spesialisasi === '') {
        pesan.innerHTML = '<div class="alert alert-danger">Semua field harus diisi!</div>';
        return false;
    }

    if (dosen.some(d => d.nidn === nidn)) {
        pesan.innerHTML = '<div class="alert alert-danger">NIDN sudah terdaftar!</div>';
        return false;
    }

    dosen.push({ id: idCounter++, nidn, nama, jurusan, spesialisasi });
    pesan.innerHTML = '<div class="alert alert-success">✅ Data berhasil ditambahkan!</div>';
    renderTabel();

    setTimeout(() => $('#modalTambah').modal('hide'), 1000);
    return false;
}

// ===== EDIT DOSEN =====
function bukaModalEdit(id) {
    let d = dosen.find(d => d.id === id);
    if (!d) return;

    document.getElementById('editId').value = d.id;
    document.getElementById('editNidn').value = d.nidn;
    document.getElementById('editNama').value = d.nama;
    document.getElementById('editJurusan').value = d.jurusan;
    document.getElementById('editSpesialisasi').value = d.spesialisasi;
    document.getElementById('pesanEdit').innerHTML = '';
    $('#modalEdit').modal('show');
}

function editDosen() {
    let id = parseInt(document.getElementById('editId').value);
    let nidn = document.getElementById('editNidn').value;
    let nama = document.getElementById('editNama').value;
    let jurusan = document.getElementById('editJurusan').value;
    let spesialisasi = document.getElementById('editSpesialisasi').value;
    let pesan = document.getElementById('pesanEdit');

    if (nidn === '' || nama === '' || jurusan === '' || spesialisasi === '') {
        pesan.innerHTML = '<div class="alert alert-danger">Semua field harus diisi!</div>';
        return false;
    }

    let index = dosen.findIndex(d => d.id === id);
    if (index === -1) {
        pesan.innerHTML = '<div class="alert alert-danger">Data tidak ditemukan!</div>';
        return false;
    }

    if (dosen.some(d => d.nidn === nidn && d.id !== id)) {
        pesan.innerHTML = '<div class="alert alert-danger">NIDN sudah terdaftar!</div>';
        return false;
    }

    dosen[index] = { id, nidn, nama, jurusan, spesialisasi };
    pesan.innerHTML = '<div class="alert alert-success">✅ Data berhasil diupdate!</div>';
    renderTabel();

    setTimeout(() => $('#modalEdit').modal('hide'), 1000);
    return false;
}

// ===== HAPUS DOSEN =====
function hapusDosen(id) {
    let d = dosen.find(d => d.id === id);
    if (!d) return;

    if (confirm(`Apakah Anda yakin ingin menghapus data ${d.nama}?`)) {
        dosen = dosen.filter(d => d.id !== id);
        renderTabel();
        alert('✅ Data berhasil dihapus!');
    }
}

// ===== INISIALISASI HALAMAN =====
function initDosen() {
    setPageTitle('👨‍🏫 Data Dosen', 'Kelola data dosen');
    setActiveMenu('dosen.html');
    renderTabel();
}

document.addEventListener('DOMContentLoaded', function() {
    initDosen();
});

document.addEventListener('componentsLoaded', function() {
    initDosen();
});

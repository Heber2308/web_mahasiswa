/* ===================================================
   MATA KULIAH CRUD SCRIPT
   =================================================== */

// ===== DATA MATA KULIAH =====
let matakuliah = getStoredData('dataMatkul', defaultMatkul);
let idCounter = matakuliah.length > 0 ? Math.max(...matakuliah.map(mk => mk.id)) + 1 : 1;

// ===== UPDATE BADGE SIDEBAR =====
function updateBadge() {
    setStoredData('dataMatkul', matakuliah);
}

// ===== RENDER TABEL =====
function renderTabel() {
    let tabel = document.getElementById('tabelMatakuliah');
    if (!tabel) return;

    tabel.innerHTML = '';

    if (matakuliah.length === 0) {
        tabel.innerHTML = `<tr><td colspan="7" class="text-center">Belum ada data mata kuliah</td></tr>`;
        updateBadge();
        return;
    }

    matakuliah.forEach((mk, index) => {
        tabel.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${mk.kode}</td>
                <td>${mk.nama}</td>
                <td>${mk.jurusan}</td>
                <td>Semester ${mk.semester}</td>
                <td>${mk.sks}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="bukaModalEdit(${mk.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="hapusMatakuliah(${mk.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    updateBadge();
}

// ===== TAMBAH MATA KULIAH =====
function bukaModalTambah() {
    document.getElementById('formTambah').reset();
    document.getElementById('pesanTambah').innerHTML = '';
    $('#modalTambah').modal('show');
}

function tambahMatakuliah() {
    let kode = document.getElementById('kodeTambah').value;
    let nama = document.getElementById('namaTambah').value;
    let jurusan = document.getElementById('jurusanTambah').value;
    let semester = document.getElementById('semesterTambah').value;
    let sks = document.getElementById('sksTambah').value;
    let pesan = document.getElementById('pesanTambah');

    if (kode === '' || nama === '' || jurusan === '' || semester === '' || sks === '') {
        pesan.innerHTML = '<div class="alert alert-danger">Semua field harus diisi!</div>';
        return false;
    }

    if (matakuliah.some(mk => mk.kode === kode)) {
        pesan.innerHTML = '<div class="alert alert-danger">Kode sudah terdaftar!</div>';
        return false;
    }

    matakuliah.push({ id: idCounter++, kode, nama, jurusan, semester: parseInt(semester), sks: parseInt(sks) });
    pesan.innerHTML = '<div class="alert alert-success">✅ Data berhasil ditambahkan!</div>';
    renderTabel();

    setTimeout(() => $('#modalTambah').modal('hide'), 1000);
    return false;
}

// ===== EDIT MATA KULIAH =====
function bukaModalEdit(id) {
    let mk = matakuliah.find(mk => mk.id === id);
    if (!mk) return;

    document.getElementById('editId').value = mk.id;
    document.getElementById('editKode').value = mk.kode;
    document.getElementById('editNama').value = mk.nama;
    document.getElementById('editJurusan').value = mk.jurusan;
    document.getElementById('editSemester').value = mk.semester;
    document.getElementById('editSks').value = mk.sks;
    document.getElementById('pesanEdit').innerHTML = '';
    $('#modalEdit').modal('show');
}

function editMatakuliah() {
    let id = parseInt(document.getElementById('editId').value);
    let kode = document.getElementById('editKode').value;
    let nama = document.getElementById('editNama').value;
    let jurusan = document.getElementById('editJurusan').value;
    let semester = document.getElementById('editSemester').value;
    let sks = document.getElementById('editSks').value;
    let pesan = document.getElementById('pesanEdit');

    if (kode === '' || nama === '' || jurusan === '' || semester === '' || sks === '') {
        pesan.innerHTML = '<div class="alert alert-danger">Semua field harus diisi!</div>';
        return false;
    }

    let index = matakuliah.findIndex(mk => mk.id === id);
    if (index === -1) {
        pesan.innerHTML = '<div class="alert alert-danger">Data tidak ditemukan!</div>';
        return false;
    }

    if (matakuliah.some(mk => mk.kode === kode && mk.id !== id)) {
        pesan.innerHTML = '<div class="alert alert-danger">Kode sudah terdaftar!</div>';
        return false;
    }

    matakuliah[index] = { id, kode, nama, jurusan, semester: parseInt(semester), sks: parseInt(sks) };
    pesan.innerHTML = '<div class="alert alert-success">✅ Data berhasil diupdate!</div>';
    renderTabel();

    setTimeout(() => $('#modalEdit').modal('hide'), 1000);
    return false;
}

// ===== HAPUS MATA KULIAH =====
function hapusMatakuliah(id) {
    let mk = matakuliah.find(mk => mk.id === id);
    if (!mk) return;

    if (confirm(`Apakah Anda yakin ingin menghapus data ${mk.nama}?`)) {
        matakuliah = matakuliah.filter(mk => mk.id !== id);
        renderTabel();
        alert('✅ Data berhasil dihapus!');
    }
}

// ===== INISIALISASI HALAMAN =====
function initMatakuliah() {
    setPageTitle('📚 Data Mata Kuliah', 'Kelola data mata kuliah');
    setActiveMenu('matakuliah.html');
    renderTabel();
}

document.addEventListener('DOMContentLoaded', function() {
    initMatakuliah();
});

document.addEventListener('componentsLoaded', function() {
    initMatakuliah();
});

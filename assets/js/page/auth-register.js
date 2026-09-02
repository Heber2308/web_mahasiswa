/* ===================================================
   AUTH REGISTER SCRIPT
   =================================================== */

// ===== SLIDESHOW BACKGROUND =====
let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow-bg .slide');
const totalSlides = slides.length;

function nextSlide() {
    if (slides.length > 0) {
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + 1) % totalSlides;
        slides[slideIndex].classList.add('active');
    }
}

if (totalSlides > 0) {
    setInterval(nextSlide, 4000);
}

// ===== FUNGSI TOGGLE PASSWORD =====
function togglePassword(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (!passwordInput || !icon) return;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ===== VALIDASI REGISTRASI =====
function validasiRegistrasi() {
    let firstName = document.getElementById('frist_name').value;
    let lastName = document.getElementById('last_name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    let agree = document.getElementById('agree');
    let pesan = document.getElementById('pesanRegistrasi');

    pesan.innerHTML = '';

    if (firstName === '' || firstName.trim() === '') {
        pesan.innerHTML = '<div class="alert alert-danger">First Name tidak boleh kosong!</div>';
        return false;
    }

    if (lastName === '' || lastName.trim() === '') {
        pesan.innerHTML = '<div class="alert alert-danger">Last Name tidak boleh kosong!</div>';
        return false;
    }

    if (email === '' || email.trim() === '') {
        pesan.innerHTML = '<div class="alert alert-danger">Email tidak boleh kosong!</div>';
        return false;
    }

    if (!email.includes('@') || !email.includes('.')) {
        pesan.innerHTML = '<div class="alert alert-danger">Format email tidak valid!</div>';
        return false;
    }

    if (password === '' || password.length < 6) {
        pesan.innerHTML = '<div class="alert alert-danger">Password minimal 6 karakter!</div>';
        return false;
    }

    if (password !== password2) {
        pesan.innerHTML = '<div class="alert alert-danger">Password dan konfirmasi password tidak sama!</div>';
        return false;
    }

    if (!agree.checked) {
        pesan.innerHTML = '<div class="alert alert-danger">Anda harus menyetujui terms and conditions!</div>';
        return false;
    }

    pesan.innerHTML = '<div class="alert alert-success">✅ Registrasi berhasil! Silakan login.</div>';

    setTimeout(function() {
        window.location.href = 'auth-login.html';
    }, 1500);

    return false;
}
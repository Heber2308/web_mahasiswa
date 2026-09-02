/* ===================================================
   AUTH LOGIN SCRIPT
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

// ===== TOGGLE PASSWORD =====
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const icon = document.getElementById('toggleIcon');

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

// ===== VALIDASI LOGIN =====
function validasiLogin() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let pesan = document.getElementById('pesanLogin');

    pesan.innerHTML = '';

    if (email === '' || email.trim() === '') {
        pesan.innerHTML = '<div class="alert alert-danger">Email tidak boleh kosong!</div>';
        return false;
    }

    if (password === '' || password.trim() === '') {
        pesan.innerHTML = '<div class="alert alert-danger">Password tidak boleh kosong!</div>';
        return false;
    }

    if (!email.includes('@') || !email.includes('.')) {
        pesan.innerHTML = '<div class="alert alert-danger">Format email tidak valid!</div>';
        return false;
    }

    pesan.innerHTML = '<div class="alert alert-success">✅ Login berhasil! Mengarahkan ke dashboard...</div>';

    setTimeout(function() {
        window.location.href = 'dashboard.html';
    }, 1000);

    return false;
}

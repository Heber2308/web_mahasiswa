// ===== FUNGSI LOAD KOMPONEN =====
function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) return Promise.resolve();

    return fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            el.innerHTML = data;
        })
        .catch(error => console.log('Error loading component:', error));
}

// ===== LOAD SEMUA KOMPONEN SAAT HALAMAN DIMUAT =====
document.addEventListener('DOMContentLoaded', function() {
    Promise.all([
        loadComponent('slideshow-container', 'components/slideshow.html'),
        loadComponent('sidebar-container', 'components/sidebar.html'),
        loadComponent('header-container', 'components/header.html'),
        loadComponent('footer-container', 'components/footer.html')
    ]).then(() => {
        // Panggil helper setelah komponen selesai dimuat
        if (typeof updateTahunFooter === 'function') updateTahunFooter();
        if (typeof initSlideshow === 'function') initSlideshow();
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    });
});
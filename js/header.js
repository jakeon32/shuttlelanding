/* ==========================================
   Header — 스티키 헤더 + 모바일 메뉴
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    if (!header) return;

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled');
            if (window.scrollY === 0) {
                header.classList.remove('scrolled');
            }
        }
    });

    // Mobile hamburger menu toggle
    const menuToggle = header.querySelector('.menu-toggle');
    const mobileNav = document.getElementById('mobileNav');
    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.querySelector('i').className =
            isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Close menu on link click
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
});

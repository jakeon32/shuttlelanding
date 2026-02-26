/* ==========================================
   Header — 스크롤 시 스티키 헤더
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    if (!header) return;

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
});

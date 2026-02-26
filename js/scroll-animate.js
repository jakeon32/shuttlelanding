/* ==========================================
   Scroll Animate — IntersectionObserver 스크롤 애니메이션
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-up, .section-animate');

    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled');
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        if (el.classList.contains('section-animate')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        observer.observe(el);
    });

    // Trigger initial scroll to run animations if already scrolled
    window.dispatchEvent(new Event('scroll'));
});

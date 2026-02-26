/* ==========================================
   Route Tabs — 노선 탭 필터 + 아코디언 토글
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Route Tabs
    const routeTabs = document.querySelectorAll('.route-tab');
    const routeGroups = document.querySelectorAll('.route-group');

    routeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            routeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (targetId === 'all') {
                routeGroups.forEach(group => group.style.display = 'block');
            } else {
                routeGroups.forEach(group => {
                    group.style.display =
                        group.getAttribute('data-region') === targetId ? 'block' : 'none';
                });
            }
        });
    });

    // FAQ / Usage Guide Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            accordionItems.forEach(acc => {
                acc.classList.remove('active');
                acc.querySelector('.accordion-content').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 40 + 'px';
            }
        });
    });
});

// Keyboard support for route detail toggles
document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('row-main')) {
        e.preventDefault();
        toggleRouteDetail(e.target);
    }
});

// Scroll to cancel-refund accordion and open it
window.openAccordionAndScroll = function (e) {
    e.preventDefault();
    const target = document.getElementById('cancel-refund');
    if (!target) return;

    const header = target.querySelector('.accordion-header');
    const content = target.querySelector('.accordion-content');

    // Close all, then open target
    document.querySelectorAll('.accordion-item').forEach(acc => {
        acc.classList.remove('active');
        acc.querySelector('.accordion-content').style.maxHeight = null;
    });
    target.classList.add('active');
    content.style.maxHeight = content.scrollHeight + 40 + 'px';

    // Scroll with offset for fixed header
    const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
};

// Global Function to toggle route details accordion
window.toggleRouteDetail = function (element) {
    const row = element.closest('.route-row');
    const isOpen = row.classList.contains('open');

    document.querySelectorAll('.route-row.open').forEach(openRow => {
        openRow.classList.remove('open');
    });

    if (!isOpen) {
        row.classList.add('open');
    }
};

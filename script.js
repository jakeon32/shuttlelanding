document.addEventListener('DOMContentLoaded', () => {

    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled'); // Force for now to keep solid background on light content, or check if top
            if (window.scrollY === 0) {
                header.classList.remove('scrolled');
            }
        }
    });

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.animate-up, .section-animate');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled'); // we reuse the scrolled class for opacity 1
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
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

    // Route Tabs
    const routeTabs = document.querySelectorAll('.route-tab');
    const routeGroups = document.querySelectorAll('.route-group');

    routeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            // Remove active classes
            routeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter logic
            if (targetId === 'all') {
                routeGroups.forEach(group => group.style.display = 'block');
            } else {
                routeGroups.forEach(group => {
                    if (group.getAttribute('data-region') === targetId) {
                        group.style.display = 'block';
                    } else {
                        group.style.display = 'none';
                    }
                });
            }
        });
    });

    // Booking Tabs (Visual Only for now)
    const bookingTabs = document.querySelectorAll('.tab-btn');
    bookingTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            bookingTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            accordionItems.forEach(acc => {
                acc.classList.remove('active');
                acc.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Open clicked if not previously active
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 40 + "px"; // +40 for padding
            }
        });
    });

    // Set initial max date for booking to end of season
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        // Just ensuring the values are respected by JS if needed
    }

    // Booking Modal Logic
    const bookingModal = document.getElementById('bookingModal');
    const openModalBtns = document.querySelectorAll('.btn-open-modal');
    const closeModalBtn = document.getElementById('closeModal');
    const searchTicketsBtn = document.getElementById('modalSearchTicketsBtn');

    // Open Modal
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal
    function closeModal() {
        if (bookingModal) bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeModal();
            }
        });
    }

    // Modal Flatpickr Date Selection (Inline)
    const modalDatePicker = document.getElementById('modalDatePicker');
    if (modalDatePicker) {
        flatpickr(modalDatePicker, {
            locale: "ko",
            inline: true,
            minDate: "2025-07-11",
            maxDate: "2025-08-17",
            dateFormat: "Y-m-d",
            disableMobile: true,
            onChange: function (selectedDates) {
                if (selectedDates.length > 0) {
                    searchTicketsBtn.disabled = false;
                    searchTicketsBtn.classList.add('active-pulse');
                } else {
                    searchTicketsBtn.disabled = true;
                    searchTicketsBtn.classList.remove('active-pulse');
                }
            }
        });
    }

    // Passenger Counters
    const countBtns = document.querySelectorAll('.count-btn');
    countBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target') + 'Count';
            const input = document.getElementById(targetId);
            if (!input) return;

            let val = parseInt(input.value);
            const min = parseInt(input.getAttribute('min'));
            const max = parseInt(input.getAttribute('max'));

            if (btn.classList.contains('minus')) {
                if (val > min) input.value = val - 1;
            } else if (btn.classList.contains('plus')) {
                if (val < max) input.value = val + 1;
            }
        });
    });

    // Search Tickets Action
    if (searchTicketsBtn) {
        searchTicketsBtn.addEventListener('click', () => {
            closeModal();
            // Simulate ticket search mapping
            window.location.href = "#booking";
        });
    }

    // Trigger initial scroll to run animations if already scrolled
    window.dispatchEvent(new Event('scroll'));
});

// Global Function to toggle route details accordion
window.toggleRouteDetail = function (element) {
    const row = element.closest('.route-row');
    row.classList.toggle('open');
};

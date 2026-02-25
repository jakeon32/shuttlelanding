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
        rootMargin: '50px',
        threshold: 0
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

    // Hero Flatpickr Date Picker
    const heroDatePicker = document.getElementById('heroDatePicker');
    if (heroDatePicker) {
        flatpickr(heroDatePicker, {
            locale: "ko",
            minDate: "2026-07-11",
            maxDate: "2026-08-17",
            dateFormat: "m/d (D)",
            disableMobile: true
        });
    }

    // Hero Passenger Dropdown
    const passengerTrigger = document.getElementById('passengerTrigger');
    const passengerDropdown = document.getElementById('passengerDropdown');
    const passengerSummary = document.getElementById('passengerSummary');

    function updatePassengerSummary() {
        const adults = parseInt(document.getElementById('heroAdultCount').value);
        const children = parseInt(document.getElementById('heroChildCount').value);
        let text = `대인 ${adults}명`;
        if (children > 0) text += `, 소인 ${children}명`;
        passengerSummary.textContent = text;
    }

    if (passengerTrigger) {
        passengerTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = passengerDropdown.classList.contains('open');
            passengerDropdown.classList.toggle('open');
            passengerTrigger.classList.toggle('active');
        });

        // Close dropdown on outside click
        document.addEventListener('click', (e) => {
            if (!passengerDropdown.contains(e.target) && e.target !== passengerTrigger) {
                passengerDropdown.classList.remove('open');
                passengerTrigger.classList.remove('active');
            }
        });
    }

    // Unified counter logic for both hero and modal
    document.querySelectorAll('.count-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target') + 'Count';
            const input = document.getElementById(targetId);
            if (!input) return;

            let val = parseInt(input.value);
            const min = parseInt(input.getAttribute('min'));
            const max = parseInt(input.getAttribute('max'));

            if (btn.classList.contains('minus') && val > min) input.value = val - 1;
            if (btn.classList.contains('plus') && val < max) input.value = val + 1;

            // Update hero summary if it's a hero counter
            if (targetId.startsWith('hero')) updatePassengerSummary();
        });
    });

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
            minDate: "2026-07-11",
            maxDate: "2026-08-17",
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

// Keyboard support for route detail toggles
document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('row-main')) {
        e.preventDefault();
        toggleRouteDetail(e.target);
    }
});

// Global Function to toggle route details accordion
window.toggleRouteDetail = function (element) {
    const row = element.closest('.route-row');
    const isOpen = row.classList.contains('open');

    // Close all open rows
    document.querySelectorAll('.route-row.open').forEach(openRow => {
        openRow.classList.remove('open');
    });

    // Open clicked row if it wasn't already open
    if (!isOpen) {
        row.classList.add('open');
    }
};

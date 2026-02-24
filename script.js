document.addEventListener('DOMContentLoaded', () => {
    
    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled'); // Force for now to keep solid background on light content, or check if top
            if(window.scrollY === 0) {
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
        if(el.classList.contains('section-animate')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        observer.observe(el);
    });

    // Route Tabs
    const routeTabs = document.querySelectorAll('.route-tab');
    const routeContents = document.querySelectorAll('.route-content');

    routeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            routeTabs.forEach(t => t.classList.remove('active'));
            routeContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
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
    if(dateInput) {
        // Just ensuring the values are respected by JS if needed
    }

    // Trigger initial scroll to run animations if already scrolled
    window.dispatchEvent(new Event('scroll'));
});

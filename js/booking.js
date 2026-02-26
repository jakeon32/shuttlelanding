/* ==========================================
   Booking — 예약 탭, Flatpickr, 인원 드롭다운, 모달
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Booking Tabs (Visual Only)
    const bookingTabs = document.querySelectorAll('.tab-btn');
    bookingTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            bookingTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Hero Flatpickr Date Picker
    const heroDatePicker = document.getElementById('heroDatePicker');
    if (heroDatePicker) {
        flatpickr(heroDatePicker, {
            locale: 'ko',
            minDate: '2026-07-11',
            maxDate: '2026-08-17',
            dateFormat: 'm/d (D)',
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
            passengerDropdown.classList.toggle('open');
            passengerTrigger.classList.toggle('active');
        });

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

            if (targetId.startsWith('hero')) updatePassengerSummary();
        });
    });

    // Booking Modal Logic
    const bookingModal = document.getElementById('bookingModal');
    const openModalBtns = document.querySelectorAll('.btn-open-modal');
    const closeModalBtn = document.getElementById('closeModal');
    const searchTicketsBtn = document.getElementById('modalSearchTicketsBtn');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        if (bookingModal) bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) closeModal();
        });
    }

    // Modal Flatpickr Date Selection (Inline)
    const modalDatePicker = document.getElementById('modalDatePicker');
    if (modalDatePicker) {
        flatpickr(modalDatePicker, {
            locale: 'ko',
            inline: true,
            minDate: '2026-07-11',
            maxDate: '2026-08-17',
            dateFormat: 'Y-m-d',
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
            window.location.href = '#booking';
        });
    }
});

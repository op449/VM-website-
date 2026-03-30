// Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// ==========================================
// SCROLL REVEAL (INTERSECTION OBSERVER)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up').forEach((el) => {
    observer.observe(el);
});

// ==========================================
// MOUSE TRACKING GLOW EFFECTS
// ==========================================
// 1. Ambient Background Glow
const ambientGlow = document.querySelector('.ambient-glow');

// 2. Package Cards Spotlight Glow
const workCards = document.querySelectorAll('.work-card');

document.addEventListener('mousemove', (e) => {
    // Move global ambient glow if it exists
    if (ambientGlow) {
        ambientGlow.style.left = e.clientX + 'px';
        ambientGlow.style.top = e.clientY + 'px';
    }

    // Update CSS variables for each package card to track relative mouse position
    workCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        lenis.scrollTo(target, {
            offset: -80, // offset
            duration: 1.2
        });
    });
});

// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Simple accordion class toggle for services (Desktop hover logic / Mobile click)
const serviceRows = document.querySelectorAll('.service-row');
serviceRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        serviceRows.forEach(r => r.classList.remove('active'));
        row.classList.add('active');

        // In a real scenario, you'd change the adjacent image based on the row hovered.
        // For now, it just toggles the active styling class.
    });
});

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

hamburger?.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu?.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== GSAP ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Batch animate .gs-fade elements
gsap.utils.toArray('.gs-fade').forEach((el, i) => {
    gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8,
        delay: (i % 4) * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
});

gsap.utils.toArray('.gs-fade-left').forEach(el => {
    gsap.to(el, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
    });
});

gsap.utils.toArray('.gs-fade-right').forEach(el => {
    gsap.to(el, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
    });
});

gsap.utils.toArray('.gs-scale').forEach(el => {
    gsap.to(el, {
        opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: el, start: 'top 88%' }
    });
});

// Hero entrance
gsap.from('.hero-content', {
    opacity: 0, y: 60, duration: 1.2, delay: 0.3, ease: 'power3.out'
});

// Stats counter animation
gsap.utils.toArray('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count || el.textContent);
    const suffix = el.dataset.suffix || '';
    ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
            gsap.fromTo(el, { innerText: 0 }, {
                innerText: target, duration: 2, ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate() { el.textContent = Math.round(el.innerText) + suffix; }
            });
        },
        once: true
    });
});

// Treatment cards stagger
ScrollTrigger.batch('.treatment-card', {
    start: 'top 88%',
    onEnter: batch => gsap.fromTo(batch,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
    )
});

// Parallax hero decorations
gsap.to('.hero-decor', {
    y: -100, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
});

// ===== CONTACT FORM → WHATSAPP =====
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const fd = new FormData(this);
    const name = fd.get('name') || '';
    const phone = fd.get('phone') || '';
    const treatment = fd.get('treatment') || '';
    const message = fd.get('message') || '';

    const text = `Hi! I'd like to book an appointment.\n\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Treatment:* ${treatment}\n` +
        `*Message:* ${message}`;

    const waURL = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
    window.open(waURL, '_blank');
});

// ===== HERO PARTICLES =====
const particleBox = document.querySelector('.hero-particles');
if (particleBox) {
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('span');
        p.className = 'hero-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = (Math.random() * 6) + 's';
        p.style.animationDuration = (6 + Math.random() * 5) + 's';
        p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
        particleBox.appendChild(p);
    }
}

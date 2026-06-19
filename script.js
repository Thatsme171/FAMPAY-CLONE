document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Optional: stop observing once shown
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-up, .feature-card, .step');
    
    animatedElements.forEach((el, index) => {
        // Add a slight stagger to list items
        if(el.classList.contains('feature-card') || el.classList.contains('step')) {
            el.style.transitionDelay = `${index * 0.1}s`;
            el.classList.add('animate-up');
        }
        observer.observe(el);
    });

    // Simple mobile menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    menuIcon.addEventListener('click', () => {
        if(navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.alignItems = 'center';
            navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        }
    });

    // Interactive card effect based on mouse movement
    const card = document.querySelector('.card-mockup');
    const heroVisual = document.querySelector('.hero-visual');

    if (window.matchMedia("(min-width: 900px)").matches) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 15;
            const rotateY = ((centerX - x) / centerX) * -15;

            // Apply rotation and pause the float animation
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            card.style.animationPlayState = 'paused';
        });

        heroVisual.addEventListener('mouseleave', () => {
            // Reset to default
            card.style.transform = `rotateX(15deg) rotateY(-15deg)`;
            card.style.animationPlayState = 'running';
        });
    }
});

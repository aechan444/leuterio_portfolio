document.addEventListener('DOMContentLoaded', () => {
    // GSAP Initialization
    gsap.registerPlugin(ScrollTrigger);

// --- THEME ENGINE ---
const themeBtn = document.getElementById('theme-btn');
const sunIcon = document.querySelector('.sun');
const moonIcon = document.querySelector('.moon');

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'light');
        } else {
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
}

    // 1. Ventures Horizontal Scroll Engine (High Fidelity Sequence)
    const venturesSection = document.querySelector('#ventures');
    const venturesTrack = document.querySelector('#ventures-track');
    const progressBar = document.querySelector('#v-progress');
    
    if (venturesSection && venturesTrack) {
        // We create a master timeline for the sequence
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: venturesSection,
                start: "top top",
                end: "+=600%", // Dynamically extended for 7 cards
                scrub: 0.5, // Reduced lag for more direct control
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (progressBar) {
                        progressBar.style.width = (self.progress * 100) + '%';
                    }
                }
            }
        });

        // HOLD PHASE: Subtle, natural pause
        tl.to({}, { duration: 0.4 }); 

        // SLIDE PHASE: Direct, smooth movement
        tl.to(venturesTrack, {
            x: () => -(venturesTrack.scrollWidth - window.innerWidth),
            ease: "none", // Linear is better for faster scrolls
            duration: 2
        });
    }

    // 2. Reveal Engine (Standard Animation)
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 95%",
            },
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // 3. Mission Visuals Engine
    const missionSection = document.querySelector('#about-mission');
    
    if (missionSection) {
        // Floating Badge Animation
        const floatingBadge = document.querySelector('.floating-mission-badge');
        if (floatingBadge) {
            gsap.to(floatingBadge, {
                scrollTrigger: {
                    trigger: missionSection,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
                y: -150,
                rotate: 5,
                ease: "none"
            });
        }
    }

    // 4. Coaching Methodology Interactions
    const coachingSection = document.querySelector('.coaching-section');
    const coachingItems = document.querySelectorAll('.coaching-item');
    
    // List Interaction
    if (coachingItems.length > 0) {
        coachingItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                coachingItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    // Visual Parallax
    if (coachingSection) {
        const gfxElements = coachingSection.querySelectorAll('.gfx-glow-text, .gfx-floating-card, .gfx-floating-icon');
        
        gfxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 1;
            gsap.to(el, {
                scrollTrigger: {
                    trigger: coachingSection,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: (i, target) => -100 * speed,
                ease: "none"
            });
        });
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});

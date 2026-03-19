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

    // Handle Resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});

// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-in-out'
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if(navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    }));

    // Sticky Navbar & Active Link Highlighting
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Progress Indicator
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight * 100}%`;
        scrollProgress.style.width = scroll;
    });

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Observer to trigger counter animation when section is in view
    const observerOptions = {
        threshold: 0.5
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const overviewSection = document.getElementById('overview');
    if(overviewSection) {
        observer.observe(overviewSection);
    }

    // Typing Effect for Hero Subtitle
    const typingElement = document.querySelector('.type-effect');
    if (typingElement) {
        const text = "Cybersecurity Engineer | AI Security Researcher";
        typingElement.innerText = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Add blinking cursor effect at the end
                typingElement.innerHTML += '<span class="cursor" style="animation: blink 1s infinite;">_</span>';
            }
        }
        
        // Add cursor blinking animation dynamically
        const style = document.createElement('style');
        style.innerHTML = `@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }`;
        document.head.appendChild(style);

        setTimeout(typeWriter, 1000); // start after 1s
    }
});
/* =========================================================
   CYBER LIGHTNING EFFECT
========================================================= */

const lightning = document.getElementById("lightning");
const screenFlash = document.getElementById("screenFlash");

function triggerLightning() {

    const randomLeft = Math.random() * window.innerWidth;

    lightning.style.left = `${randomLeft}px`;

    lightning.classList.remove("flash");
    screenFlash.classList.remove("active");

    void lightning.offsetWidth;

    lightning.classList.add("flash");
    screenFlash.classList.add("active");
}

/* Random lightning timing */

setInterval(() => {

    const chance = Math.random();

    if (chance > 0.6) {
        triggerLightning();
    }

}, 3000);
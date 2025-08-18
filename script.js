// Dark Pixel Minimal Portfolio JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initPixelatedText();
    initSmoothScrolling();
    initTerminalContact();
    initIntersectionObserver();
});

// Pixelated Text Animation
function initPixelatedText() {
    const pixelatedElements = document.querySelectorAll('.pixelated-text');
    
    pixelatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('active');
        }, index * 200);
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    // Contact button scroll
    const contactBtn = document.getElementById('contactBtn');
    const exploreBtn = document.getElementById('exploreBtn');
    
    contactBtn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    exploreBtn.addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Terminal Contact Functionality
function initTerminalContact() {
    const terminalInput = document.getElementById('terminalInput');
    const sendButton = document.getElementById('sendMessage');
    
    function sendMessage() {
        const message = terminalInput.value.trim();
        if (message) {
            const subject = encodeURIComponent('Portfolio Contact');
            const body = encodeURIComponent(`Hello Kiran,\n\n${message}\n\nBest regards`);
            const mailtoLink = `mailto:jalakam.kiran@gmail.com?subject=${subject}&body=${body}`;
            
            window.open(mailtoLink);
            terminalInput.value = '';
            
            // Add visual feedback
            sendButton.style.background = '#00ff00';
            sendButton.textContent = 'Sent!';
            setTimeout(() => {
                sendButton.style.background = '';
                sendButton.textContent = 'Execute';
            }, 2000);
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Terminal cursor effect
    let cursorVisible = true;
    setInterval(() => {
        if (document.activeElement === terminalInput) {
            terminalInput.style.borderColor = cursorVisible ? 'var(--accent-primary)' : 'transparent';
            cursorVisible = !cursorVisible;
        }
    }, 500);
}

// Scroll-based Animations
function initScrollAnimations() {
    // Parallax effect for floating pixels
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-pixels');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Header animation on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const contactBtn = document.querySelector('.contact-cta');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            contactBtn.style.transform = 'translateY(100px)';
        } else {
            // Scrolling up
            contactBtn.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
}

// Intersection Observer for Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special animations for different elements
                if (entry.target.classList.contains('skill-chip')) {
                    setTimeout(() => {
                        entry.target.style.animation = 'pixelLoad 0.6s ease-out forwards';
                    }, Math.random() * 300);
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-left');
                    }, 200);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('scale-in');
                    }, 100);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .skill-chip,
        .timeline-item,
        .project-card,
        .achievement-card,
        .interest-card,
        .education-card
    `);
    
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// Skill chip tooltips
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('skill-chip')) {
        e.target.style.transform = 'translateY(-5px) scale(1.05)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('skill-chip')) {
        e.target.style.transform = '';
    }
});

// Matrix digital rain effect (optional enhancement)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.05';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffcc';
        ctx.font = `${fontSize}px JetBrains Mono`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

// Initialize matrix effect (uncomment if desired)
// createMatrixRain();

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page load time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
            }, 0);
        });
    }
}

monitorPerformance();

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg triggered
        document.body.style.animation = 'pixelGlitch 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎮 Developer mode activated! You found the easter egg!');
        }, 2000);
        konamiCode = [];
    }
});

// Add pixel glitch animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes pixelGlitch {
        0%, 100% { transform: translate(0); filter: hue-rotate(0deg); }
        20% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
        40% { transform: translate(-2px, -2px); filter: hue-rotate(180deg); }
        60% { transform: translate(2px, 2px); filter: hue-rotate(270deg); }
        80% { transform: translate(2px, -2px); filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
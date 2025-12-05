/* ========================================
   NEURAL NEXUS PORTFOLIO - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // PRELOADER
    // ========================================
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initAnimations();
        }, 2500);
    });

    // ========================================
    // CUSTOM CURSOR
    // ========================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth cursor outline follow
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effect
    const hoverElements = document.querySelectorAll('a, button, .skill-planet, .project-card, .glass-card');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });

    // Cursor click effect
    document.addEventListener('mousedown', () => {
        cursorDot.classList.add('click');
    });
    document.addEventListener('mouseup', () => {
        cursorDot.classList.remove('click');
    });

    // ========================================
    // NEURAL NETWORK CANVAS
    // ========================================
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = this.getRandomColor();
        }

        getRandomColor() {
            const colors = ['#ffffff', '#cccccc', '#999999'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }

            // Boundary check
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function initParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();

        animationId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // ========================================
    // NAVIGATION
    // ========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // ========================================
    // TYPED EFFECT
    // ========================================
    const roles = [
        'Cloud ML Engineer',
        'AI Solutions Architect',
        'Data Science Consultant',
        'LLM Platform Engineer',
        'Technical Consultant'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typedElement = document.getElementById('typed-role');

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeRole, typingSpeed);
    }

    typeRole();

    // ========================================
    // STAT COUNTER ANIMATION
    // ========================================
    function initAnimations() {
        const stats = document.querySelectorAll('.stat-number');

        const observerOptions = {
            threshold: 0.5
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count'));
                    animateCounter(target, count);
                    statsObserver.unobserve(target);
                }
            });
        }, observerOptions);

        stats.forEach(stat => statsObserver.observe(stat));
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    // ========================================
    // REVEAL ON SCROLL
    // ========================================
    const revealElements = document.querySelectorAll('.section-header, .glass-card, .timeline-item, .skill-planet');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // MAGNETIC BUTTONS
    // ========================================
    const magneticElements = document.querySelectorAll('.btn, .project-link, .contact-card');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });

    // ========================================
    // TILT EFFECT ON CARDS
    // ========================================
    const tiltCards = document.querySelectorAll('.glass-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========================================
    // TIMELINE PROGRESS
    // ========================================
    const timeline = document.querySelector('.timeline');
    const timelineProgress = document.querySelector('.timeline-progress');

    if (timeline && timelineProgress) {
        window.addEventListener('scroll', () => {
            const timelineRect = timeline.getBoundingClientRect();
            const timelineTop = timelineRect.top;
            const timelineHeight = timelineRect.height;
            const windowHeight = window.innerHeight;

            if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
                const progress = Math.min(
                    Math.max((windowHeight - timelineTop) / (windowHeight + timelineHeight), 0),
                    1
                );
                timelineProgress.style.height = `${progress * 100}%`;
            }
        });
    }

    // ========================================
    // SKILL PLANET ORBITAL ANIMATION
    // ========================================
    const skillPlanets = document.querySelectorAll('.skill-planet');

    skillPlanets.forEach((planet, index) => {
        const angle = (index / skillPlanets.length) * Math.PI * 2;
        const radius = 150 + Math.random() * 50;

        // Add subtle floating animation
        planet.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        planet.style.animationDelay = `${index * 0.2}s`;
    });

    // ========================================
    // PARALLAX EFFECT
    // ========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Parallax on hero section
        const hero = document.getElementById('hero');
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }

        // Parallax on sections
        document.querySelectorAll('.section').forEach((section, index) => {
            const speed = 0.1 * (index + 1);
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight) {
                section.style.transform = `translateY(${(window.innerHeight - sectionTop) * speed * -0.1}px)`;
            }
        });
    });

    // ========================================
    // ADD FLOATING ANIMATION KEYFRAMES
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // GLITCH EFFECT ON HOVER
    // ========================================
    const glitchElements = document.querySelectorAll('.hero-title .title-word');

    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.classList.add('glitch');
            setTimeout(() => el.classList.remove('glitch'), 500);
        });
    });

    // Add glitch styles
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        .glitch {
            animation: glitch 0.5s linear;
        }
        
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-3px, 3px); }
            40% { transform: translate(-3px, -3px); }
            60% { transform: translate(3px, 3px); }
            80% { transform: translate(3px, -3px); }
            100% { transform: translate(0); }
        }
    `;
    document.head.appendChild(glitchStyle);

    // ========================================
    // SECTION VISIBILITY TRACKING
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update active nav link
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => sectionObserver.observe(section));

    // ========================================
    // CONSOLE EASTER EGG
    // ========================================
    console.log('%c Neural Nexus Portfolio ',
        'background: linear-gradient(135deg, #00d4ff, #7b2ff7); color: white; font-size: 24px; padding: 10px 20px; border-radius: 5px; font-weight: bold;');
    console.log('%c Built with passion and neural networks 🧠',
        'color: #00d4ff; font-size: 14px;');
    console.log('%c Looking to hire? Contact: jostencheeran@gmail.com',
        'color: #7b2ff7; font-size: 12px;');
});
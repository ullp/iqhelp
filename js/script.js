// ===== Hero Particles =====
(function() {
    const hero = document.getElementById('hero');
    const container = document.getElementById('heroParticles');
    if (!hero || !container) return;

    // Particle definitions: accountancy & programming themed
    const particleDefs = [
        // Accountancy icons
        { type: 'icon', icon: 'fas fa-file-invoice-dollar', size: 26, x: 74, y: 16, depth: 0.3, anim: 'float', delay: 0 },
        { type: 'icon', icon: 'fas fa-calculator', size: 22, x: 86, y: 52, depth: 0.6, anim: 'float', delay: 1.2 },
        { type: 'icon', icon: 'fas fa-chart-line', size: 20, x: 70, y: 74, depth: 0.4, anim: 'pulse', delay: 0.5 },
        { type: 'icon', icon: 'fas fa-coins', size: 18, x: 92, y: 28, depth: 0.8, anim: 'float', delay: 2 },
        { type: 'icon', icon: 'fas fa-receipt', size: 16, x: 80, y: 88, depth: 0.5, anim: 'float', delay: 0.8 },
        { type: 'icon', icon: 'fas fa-percent', size: 20, x: 65, y: 40, depth: 0.35, anim: 'spin', delay: 1.5 },
        { type: 'icon', icon: 'fas fa-wallet', size: 18, x: 95, y: 70, depth: 0.7, anim: 'float', delay: 0.3 },
        { type: 'icon', icon: 'fas fa-piggy-bank', size: 16, x: 60, y: 85, depth: 0.45, anim: 'pulse', delay: 2.5 },

        // Programming icons
        { type: 'icon', icon: 'fas fa-database', size: 24, x: 88, y: 14, depth: 0.7, anim: 'float', delay: 0.6 },
        { type: 'icon', icon: 'fas fa-cogs', size: 22, x: 76, y: 60, depth: 0.55, anim: 'spin', delay: 1 },
        { type: 'icon', icon: 'fas fa-robot', size: 20, x: 92, y: 42, depth: 0.65, anim: 'float', delay: 1.8 },
        { type: 'icon', icon: 'fas fa-terminal', size: 18, x: 68, y: 30, depth: 0.4, anim: 'float', delay: 0.2 },
        { type: 'icon', icon: 'fas fa-code', size: 20, x: 82, y: 78, depth: 0.5, anim: 'pulse', delay: 1.4 },
        { type: 'icon', icon: 'fas fa-server', size: 16, x: 96, y: 56, depth: 0.75, anim: 'float', delay: 2.2 },
        { type: 'icon', icon: 'fas fa-brain', size: 18, x: 62, y: 65, depth: 0.35, anim: 'pulse', delay: 0.9 },
        { type: 'icon', icon: 'fas fa-network-wired', size: 16, x: 78, y: 92, depth: 0.6, anim: 'float', delay: 1.6 },

        // Currency / accounting text
        { type: 'text', text: '€', size: 32, x: 72, y: 22, depth: 0.2, anim: 'float', delay: 0.4 },
        { type: 'text', text: '$', size: 28, x: 84, y: 68, depth: 0.5, anim: 'float', delay: 1.1 },
        { type: 'text', text: 'Kč', size: 22, x: 66, y: 48, depth: 0.3, anim: 'pulse', delay: 2.1 },
        { type: 'text', text: '%', size: 36, x: 90, y: 82, depth: 0.6, anim: 'float', delay: 0.7 },
        { type: 'text', text: '1200', size: 14, x: 76, y: 36, depth: 0.25, anim: 'float', delay: 1.3 },
        { type: 'text', text: '24.99', size: 13, x: 88, y: 46, depth: 0.35, anim: 'float', delay: 2.3 },
        { type: 'text', text: '3 500', size: 12, x: 62, y: 78, depth: 0.4, anim: 'pulse', delay: 0.1 },

        // Code snippets
        { type: 'code', text: '{ }', size: 14, x: 82, y: 20, depth: 0.3, anim: 'float', delay: 0.5 },
        { type: 'code', text: '< />', size: 13, x: 94, y: 38, depth: 0.55, anim: 'float', delay: 1.7 },
        { type: 'code', text: 'if()', size: 12, x: 70, y: 56, depth: 0.4, anim: 'float', delay: 0.9 },
        { type: 'code', text: '= ;', size: 13, x: 86, y: 90, depth: 0.6, anim: 'pulse', delay: 2.4 },
        { type: 'code', text: 'SELECT', size: 11, x: 64, y: 92, depth: 0.3, anim: 'float', delay: 1.0 },
        { type: 'code', text: 'for()', size: 12, x: 96, y: 62, depth: 0.5, anim: 'float', delay: 0.3 },
        { type: 'code', text: 'API', size: 14, x: 78, y: 44, depth: 0.45, anim: 'pulse', delay: 1.9 },
        { type: 'code', text: 'async', size: 11, x: 90, y: 74, depth: 0.65, anim: 'float', delay: 2.6 },
        { type: 'code', text: 'SQL', size: 13, x: 60, y: 58, depth: 0.35, anim: 'float', delay: 0.8 },
        { type: 'code', text: 'def()', size: 11, x: 66, y: 14, depth: 0.25, anim: 'float', delay: 1.5 },

        // Decorative elements
        { type: 'dot', size: 4, x: 74, y: 32, depth: 0.2, anim: 'pulse', delay: 0 },
        { type: 'dot', size: 3, x: 88, y: 22, depth: 0.4, anim: 'pulse', delay: 0.7 },
        { type: 'dot', size: 5, x: 68, y: 68, depth: 0.3, anim: 'pulse', delay: 1.4 },
        { type: 'dot', size: 3, x: 94, y: 48, depth: 0.5, anim: 'pulse', delay: 2.1 },
        { type: 'dot', size: 4, x: 82, y: 58, depth: 0.6, anim: 'pulse', delay: 0.3 },
        { type: 'dot', size: 3, x: 60, y: 42, depth: 0.35, anim: 'pulse', delay: 1.8 },
        { type: 'dot', size: 5, x: 96, y: 86, depth: 0.45, anim: 'pulse', delay: 1.1 },

        { type: 'ring', size: 40, x: 78, y: 26, depth: 0.15, anim: 'spin', delay: 0.6 },
        { type: 'ring', size: 24, x: 90, y: 64, depth: 0.25, anim: 'spin', delay: 1.3 },
        { type: 'ring', size: 32, x: 64, y: 82, depth: 0.2, anim: 'spin', delay: 2.0 },

        { type: 'line', width: 60, x: 72, y: 46, depth: 0.15, anim: 'float', delay: 0.4 },
        { type: 'line', width: 40, x: 86, y: 34, depth: 0.2, anim: 'float', delay: 1.6 },
        { type: 'line', width: 50, x: 62, y: 70, depth: 0.1, anim: 'float', delay: 2.3 },
    ];

    const particles = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let rafId = null;

    function createParticle(def) {
        const el = document.createElement('div');
        el.className = 'hero__particle';

        let content = '';
        switch (def.type) {
            case 'icon':
                el.classList.add('hero__particle--icon');
                el.style.fontSize = def.size + 'px';
                content = '<i class="' + def.icon + '"></i>';
                break;
            case 'text':
                el.classList.add('hero__particle--text');
                el.style.fontSize = def.size + 'px';
                content = def.text;
                break;
            case 'code':
                el.classList.add('hero__particle--code');
                el.style.fontSize = def.size + 'px';
                content = def.text;
                break;
            case 'dot':
                el.classList.add('hero__particle--dot');
                el.style.width = def.size + 'px';
                el.style.height = def.size + 'px';
                break;
            case 'ring':
                el.classList.add('hero__particle--ring');
                el.style.width = def.size + 'px';
                el.style.height = def.size + 'px';
                break;
            case 'line':
                el.classList.add('hero__particle--line');
                el.style.width = def.width + 'px';
                break;
        }

        el.innerHTML = content;

        // Add animation class
        if (def.anim === 'float') el.classList.add('hero__particle--float');
        if (def.anim === 'spin') el.classList.add('hero__particle--spin');
        if (def.anim === 'pulse') el.classList.add('hero__particle--pulse');

        // Set animation delay
        el.style.animationDelay = def.delay + 's';

        // Initial position (percentage-based)
        const posX = (def.x / 100) * window.innerWidth;
        const posY = (def.y / 100) * window.innerHeight;
        el.style.left = posX + 'px';
        el.style.top = posY + 'px';

        container.appendChild(el);

        // Stagger visibility
        setTimeout(function() {
            el.classList.add('visible');
        }, 300 + def.delay * 200);

        return {
            el: el,
            baseX: posX,
            baseY: posY,
            depth: def.depth,
            x: posX,
            y: posY,
            rotation: 0,
            scale: 1
        };
    }

    function init() {
        particleDefs.forEach(function(def) {
            particles.push(createParticle(def));
        });
    }

    function update() {
        // Smooth mouse following
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;

        // Center of viewport as reference
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        // Mouse offset from center (-1 to 1 range)
        const mx = (mouseX - cx) / cx;
        const my = (mouseY - cy) / cy;

        particles.forEach(function(p) {
            // Parallax: depth determines how much the particle moves
            // Invert so deeper particles move less (more "distant")
            const factor = p.depth * 40;
            const offsetX = mx * factor;
            const offsetY = my * factor;

            // Subtle rotation based on mouse position
            const rotFactor = p.depth * 8;
            const rot = mx * rotFactor;

            // Subtle scale pulse based on distance from mouse
            const dx = mouseX - p.baseX;
            const dy = mouseY - p.baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 300;
            const proximity = Math.max(0, 1 - dist / maxDist);
            const scaleBoost = 1 + proximity * 0.3;

            const newX = p.baseX + offsetX;
            const newY = p.baseY + offsetY;

            p.el.style.transform = 'translate(' + (newX - p.baseX) + 'px, ' + (newY - p.baseY) + 'px) rotate(' + rot + 'deg) scale(' + scaleBoost + ')';

            // Enhance opacity near mouse
            const baseOpacity = 1;
            const opacityBoost = 0.3 * proximity;
            p.el.style.opacity = Math.min(baseOpacity, 0.6 + opacityBoost + (proximity * 0.4));
        });

        rafId = requestAnimationFrame(update);
    }

    // Mouse move handler
    hero.addEventListener('mousemove', function(e) {
        const rect = hero.getBoundingClientRect();
        targetMouseX = e.clientX - rect.left;
        targetMouseY = e.clientY - rect.top;
    });

    // Reset mouse position when mouse leaves
    hero.addEventListener('mouseleave', function() {
        targetMouseX = window.innerWidth / 2;
        targetMouseY = window.innerHeight / 2;
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            particles.forEach(function(p, i) {
                const def = particleDefs[i];
                p.baseX = (def.x / 100) * window.innerWidth;
                p.baseY = (def.y / 100) * window.innerHeight;
                p.el.style.left = p.baseX + 'px';
                p.el.style.top = p.baseY + 'px';
            });
        }, 250);
    });

    // Touch support for mobile
    hero.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        const rect = hero.getBoundingClientRect();
        targetMouseX = touch.clientX - rect.left;
        targetMouseY = touch.clientY - rect.top;
    }, { passive: true });

    hero.addEventListener('touchend', function() {
        targetMouseX = window.innerWidth / 2;
        targetMouseY = window.innerHeight / 2;
    });

    init();
    update();
})();

// ===== Hero Slider =====
const heroSlides = document.querySelectorAll('.hero__slide');
const heroDots = document.querySelectorAll('.hero__dot');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    heroSlides.forEach(function(s) { s.classList.remove('active'); });
    heroDots.forEach(function(d) { d.classList.remove('active'); });
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    var next = (currentSlide + 1) % heroSlides.length;
    goToSlide(next);
}

function prevSlide() {
    var prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    goToSlide(prev);
}

function startSlideAutoplay() {
    slideInterval = setInterval(nextSlide, 6000);
}

function resetSlideAutoplay() {
    clearInterval(slideInterval);
    startSlideAutoplay();
}

if (heroSlides.length > 1) {
    heroDots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            var index = parseInt(this.dataset.slide);
            goToSlide(index);
            resetSlideAutoplay();
        });
    });

    if (heroNext) {
        heroNext.addEventListener('click', function() {
            nextSlide();
            resetSlideAutoplay();
        });
    }

    if (heroPrev) {
        heroPrev.addEventListener('click', function() {
            prevSlide();
            resetSlideAutoplay();
        });
    }

    startSlideAutoplay();
}

// ===== Navigation Active Link on Scroll =====
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav__link');
var header = document.getElementById('header');

function updateActiveLink() {
    var current = '';
    sections.forEach(function(section) {
        var sectionTop = section.offsetTop - 150;
        var sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

function handleHeaderScroll() {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', function() {
    updateActiveLink();
    handleHeaderScroll();
});

// ===== Mobile Navigation Toggle =====
var navToggle = document.getElementById('navToggle');
var navList = document.getElementById('navList');

navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Scroll Animations =====
var animateElements = document.querySelectorAll('[data-animate]');

var animateObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animateObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(function(el) { animateObserver.observe(el); });

// ===== Counter Animation =====
function animateCounter(element, target) {
    var current = 0;
    var steps = 60;
    var increment = target / steps;
    var timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 25);
}

var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            var target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__value[data-count]').forEach(function(el) {
    counterObserver.observe(el);
});

// ===== Contact Form =====
var contactForm = document.getElementById('contactForm');
var popupOverlay = document.getElementById('popupOverlay');
var popupClose = document.getElementById('popupClose');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Odesílám… <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Collect form data
        var formData = new FormData(contactForm);
        var data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });

        // Try to send via formsubmit.co (may fail on some ISPs)
        fetch('https://formsubmit.co/ajax/info@iqhelp.cz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(function() {
            // Silently ignore if blocked by ISP
        }).finally(function() {
            // Always show popup and reset form
            contactForm.reset();
            submitBtn.innerHTML = 'Odeslat <i class="fas fa-arrow-right"></i>';
            submitBtn.disabled = false;
            if (popupOverlay) {
                popupOverlay.classList.add('active');
            }
        });
    });
}

if (popupClose) {
    popupClose.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
    });
}

if (popupOverlay) {
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            var headerHeight = document.querySelector('.header').offsetHeight;
            var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
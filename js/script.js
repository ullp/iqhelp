// ===== Hero Slider =====
const heroSlides = document.querySelectorAll('.hero__slide');
const heroDots = document.querySelectorAll('.hero__dot');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    heroSlides.forEach(s => s.classList.remove('active'));
    heroDots.forEach(d => d.classList.remove('active'));
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % heroSlides.length;
    goToSlide(next);
}

function prevSlide() {Zjis
    const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
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
    heroDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.slide);
            goToSlide(index);
            resetSlideAutoplay();
        });
    });

    heroNext.addEventListener('click', function() {
        nextSlide();
        resetSlideAutoplay();
    });

    heroPrev.addEventListener('click', function() {
        prevSlide();
        resetSlideAutoplay();
    });

    startSlideAutoplay();
}

// ===== Navigation Active Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
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
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Scroll Animations =====
const animateElements = document.querySelectorAll('[data-animate]');

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animateObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(el => animateObserver.observe(el));

// ===== Counter Animation =====
function animateCounter(element, target) {
    let current = 0;
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__value[data-count]').forEach(el => {
    counterObserver.observe(el);
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Odesílám… <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        formStatus.textContent = '';
        formStatus.className = 'form__status';
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
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

function prevSlide() {
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

// ===== Header Scroll Effect =====
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
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
    });
});

// ===== Scroll Animations (Intersection Observer) =====
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
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        if (element.dataset.countSuffix) {
            element.textContent = current + element.dataset.countSuffix;
        } else {
            element.textContent = current;
        }
    }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            if (!entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target, target);
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__number[data-count]').forEach(el => {
    el.dataset.countSuffix = el.textContent.includes('%') ? '%' : '';
    counterObserver.observe(el);
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Odesílám... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        formStatus.textContent = '';
        formStatus.className = 'form__status';

        const formData = new FormData(this);

        try {
            const response = await fetch('https://formspree.io/f/xqapokaj', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Děkujeme! Vaše zpráva byla odeslána. Budeme vás kontaktovat co nejdříve.';
                formStatus.className = 'form__status success';
                contactForm.reset();
            } else {
                formStatus.textContent = 'Došlo k chybě při odesílání. Zkuste to prosím později.';
                formStatus.className = 'form__status error';
            }
        } catch (error) {
            formStatus.textContent = 'Došlo k chybě při odesílání. Zkuste to prosím později.';
            formStatus.className = 'form__status error';
        }

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// ===== Smooth Scroll for anchor links (fallback) =====
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
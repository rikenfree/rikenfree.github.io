// ============= Header Scroll Effect =============
const header = document.getElementById('header');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky header
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// ============= Mobile Navigation =============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close nav when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ============= Active Navigation Highlighting =============
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNavOnScroll() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);
document.addEventListener('DOMContentLoaded', highlightNavOnScroll);

// ============= Smooth Scrolling =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============= Typing Animation =============
const typingElement = document.getElementById('typingText');
const titles = [
    'Unity Game Developer',
    'AR/VR Expert',
    'Multiplayer Specialist',
    'Mobile Game Developer',
    'UI/UX Designer',
    'AI Game Integration'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 400; // Pause before next word
    }

    setTimeout(typeEffect, typingSpeed);
}

if (typingElement) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(typeEffect, 500);
    });
}

// ============= Lazy Video Loading =============
document.addEventListener('DOMContentLoaded', () => {
    const lazyVideos = document.querySelectorAll('video[data-lazy="true"]');

    if (lazyVideos.length > 0) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    // Load and play
                    if (!video.dataset.loaded) {
                        video.preload = 'metadata';
                        video.load();
                        video.dataset.loaded = 'true';
                    }
                    video.play().catch(() => { });
                } else {
                    // Pause when out of view to save resources
                    if (video.dataset.loaded) {
                        video.pause();
                    }
                }
            });
        }, {
            rootMargin: '200px 0px',
            threshold: 0.1
        });

        lazyVideos.forEach(video => {
            videoObserver.observe(video);
        });
    }
});

// ============= Animated Counter =============
function animateCounters() {
    const counters = document.querySelectorAll('.stats-section .stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const prefix = counter.getAttribute('data-prefix') || '';
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            // Format large numbers with commas
            const formatted = current.toLocaleString();
            counter.textContent = prefix + formatted + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = prefix + target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// Trigger counter animation when stats section enters viewport
const statsSection = document.querySelector('.stats-section');
let countersAnimated = false;

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
}

// ============= Scroll Reveal =============
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Stagger child animations
            const children = entry.target.querySelectorAll('.skill-item, .service-item, .stat-card');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.05}s`;
                child.classList.add('revealed');
            });
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ============= Testimonial Carousel =============
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentTestimonial = 0;
let autoSlideInterval;

function showTestimonial(index) {
    testimonials.forEach((item, i) => {
        item.classList.remove('active');
        dots[i].classList.remove('active');
    });

    currentTestimonial = ((index % testimonials.length) + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

function nextTestimonial() {
    showTestimonial(currentTestimonial + 1);
}

function prevTestimonial() {
    showTestimonial(currentTestimonial - 1);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevTestimonial();
        resetAutoSlide();
    });
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showTestimonial(index);
        resetAutoSlide();
    });
});

// Start auto-slide
startAutoSlide();

// ============= Project Filtering (for projects.html) =============
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.projects-grid .project-item, .projects-grid .project-item-index');

    if (filterBtns.length > 0 && projectItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = '';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});

// ============= FAQ Accordion =============
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(other => other.classList.remove('active'));

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                } else {
                    question.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
});

// ============= Expertise Bar Animation =============
document.addEventListener('DOMContentLoaded', () => {
    const expertiseFills = document.querySelectorAll('.expertise-fill');
    let expertiseAnimated = false;

    if (expertiseFills.length > 0) {
        const expertiseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !expertiseAnimated) {
                    expertiseAnimated = true;
                    expertiseFills.forEach((fill, index) => {
                        const width = fill.getAttribute('data-width');
                        fill.style.setProperty('--target-width', width + '%');
                        setTimeout(() => {
                            fill.style.width = width + '%';
                        }, index * 100); // stagger animation
                    });
                }
            });
        }, { threshold: 0.2 });

        const expertiseSection = document.querySelector('.expertise-section');
        if (expertiseSection) {
            expertiseObserver.observe(expertiseSection);
        }
    }
});

// ============= Featured Project Video Autoplay =============
document.addEventListener('DOMContentLoaded', () => {
    const featuredVideos = document.querySelectorAll('.projects .project-item video');

    if (featuredVideos.length > 0) {
        const featuredObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    if (!video.dataset.loaded) {
                        video.preload = 'auto';
                        video.load();
                        video.dataset.loaded = 'true';
                    }
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.2
        });

        featuredVideos.forEach(video => {
            featuredObserver.observe(video);
        });
    }
});

// Hero Carousel Functionality
// Hero slides come from pictures/Gallery/manifest.json - the same source the
// Team Gallery carousel uses - shuffled into a random order on every page
// load. Drop a photo into pictures/Gallery and it can show up here too, no
// code changes needed.
const heroCarouselTrack = document.querySelector('.hero-carousel');
const heroIndicatorsWrapper = document.querySelector('.carousel-indicators');
const prevBtn = document.querySelector('.carousel-nav.prev');
const nextBtn = document.querySelector('.carousel-nav.next');
const heroSection = document.querySelector('.hero');

let slides = [];
let indicators = [];
let currentSlide = 0;
let slideInterval;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to show specific slide
function showSlide(n) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Handle wrapping
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }

    // Add active class to current slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-advance slides every 5 seconds
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Stop auto-advance
function stopSlideshow() {
    clearInterval(slideInterval);
}

// Build the carousel markup from the (shuffled) manifest, then wire up the
// same nav/indicator/autoplay behavior the carousel always had.
async function initHeroCarousel() {
    if (!heroCarouselTrack || !heroIndicatorsWrapper) return;

    let files = [];
    try {
        const response = await fetch('pictures/Gallery/manifest.json', { cache: 'no-store' });
        files = await response.json();
    } catch (err) {
        console.error('Could not load hero carousel manifest:', err);
        return;
    }

    if (!Array.isArray(files) || files.length === 0) return;

    const shuffled = shuffle(files.slice());

    heroCarouselTrack.innerHTML = shuffled.map((file, index) => {
        const src = `pictures/Gallery/${encodeURIComponent(file)}`;
        return `<div class="carousel-slide${index === 0 ? ' active' : ''}" style="background-image: url('${src}')"></div>`;
    }).join('');

    heroIndicatorsWrapper.innerHTML = shuffled.map((_, index) =>
        `<span class="indicator${index === 0 ? ' active' : ''}" data-slide="${index}"></span>`
    ).join('');

    slides = Array.from(document.querySelectorAll('.carousel-slide'));
    indicators = Array.from(document.querySelectorAll('.indicator'));
    currentSlide = 0;

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideshow();
            startSlideshow(); // Restart timer after manual navigation
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideshow();
            startSlideshow(); // Restart timer after manual navigation
        });
    }

    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopSlideshow();
            startSlideshow(); // Restart timer after manual navigation
        });
    });

    // Pause slideshow on hover
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlideshow);
        heroSection.addEventListener('mouseleave', startSlideshow);
    }

    // Start the slideshow
    startSlideshow();
}

initHeroCarousel();

// Smooth scrolling for navigation links
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

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.coach-position, .value-card, .player-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Handle contact form submission (Netlify Forms)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form values for validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation (browser handles required fields, but we can add custom logic here)
        if (name && email && message) {
            // Form is valid, Netlify will handle the submission
            // You can add a loading indicator here if desired
            console.log('Form submitted to Netlify');
        }
        
        // Let the form submit naturally to Netlify
        // Netlify will redirect to a success page or show a success message
        // To customize the success page, create a page and add:
        // action="/success" to the form tag
    });
}

// Gallery Carousel Functionality
// Slide images come from pictures/Gallery/manifest.json, which is regenerated
// automatically from the contents of pictures/Gallery every time the site is
// deployed (see generate-gallery-manifest.js + firebase.json "predeploy").
// Just drop a photo in that folder - no code changes needed.
const galleryTrack = document.querySelector('.gallery-carousel');
const galleryIndicatorsWrapper = document.querySelector('.gallery-indicators');
const galleryPrevBtn = document.querySelector('.gallery-nav.prev');
const galleryNextBtn = document.querySelector('.gallery-nav.next');
const gallerySection = document.querySelector('.gallery-carousel-wrapper');

let gallerySlides = [];
let galleryIndicators = [];
let currentGallerySlide = 0;
let galleryInterval;

// Function to show specific gallery slide
function showGallerySlide(n) {
    // Remove active class from all slides and indicators
    gallerySlides.forEach(slide => slide.classList.remove('active'));
    galleryIndicators.forEach(indicator => indicator.classList.remove('active'));

    // Handle wrapping
    if (n >= gallerySlides.length) {
        currentGallerySlide = 0;
    } else if (n < 0) {
        currentGallerySlide = gallerySlides.length - 1;
    } else {
        currentGallerySlide = n;
    }

    // Add active class to current slide and indicator
    gallerySlides[currentGallerySlide].classList.add('active');
    galleryIndicators[currentGallerySlide].classList.add('active');
}

// Next gallery slide
function nextGallerySlide() {
    showGallerySlide(currentGallerySlide + 1);
}

// Previous gallery slide
function prevGallerySlide() {
    showGallerySlide(currentGallerySlide - 1);
}

// Auto-advance gallery slides every 4 seconds
function startGallerySlideshow() {
    galleryInterval = setInterval(nextGallerySlide, 4000);
}

// Stop gallery auto-advance
function stopGallerySlideshow() {
    clearInterval(galleryInterval);
}

// Build the carousel markup from the manifest, then wire up the same
// nav/indicator/autoplay behavior the carousel always had.
async function initGalleryCarousel() {
    if (!galleryTrack || !galleryIndicatorsWrapper) return;

    let files = [];
    try {
        const response = await fetch('pictures/Gallery/manifest.json', { cache: 'no-store' });
        files = await response.json();
    } catch (err) {
        console.error('Could not load gallery manifest:', err);
        return;
    }

    if (!Array.isArray(files) || files.length === 0) return;

    galleryTrack.innerHTML = files.map((file, index) => {
        const src = `pictures/Gallery/${encodeURIComponent(file)}`;
        return `<div class="gallery-carousel-slide${index === 0 ? ' active' : ''}" style="background-image: url('${src}')"></div>`;
    }).join('');

    galleryIndicatorsWrapper.innerHTML = files.map((_, index) =>
        `<span class="gallery-indicator${index === 0 ? ' active' : ''}" data-slide="${index}"></span>`
    ).join('');

    gallerySlides = Array.from(document.querySelectorAll('.gallery-carousel-slide'));
    galleryIndicators = Array.from(document.querySelectorAll('.gallery-indicator'));
    currentGallerySlide = 0;

    // Gallery event listeners
    if (galleryPrevBtn && galleryNextBtn) {
        galleryPrevBtn.addEventListener('click', () => {
            prevGallerySlide();
            stopGallerySlideshow();
            startGallerySlideshow(); // Restart timer after manual navigation
        });

        galleryNextBtn.addEventListener('click', () => {
            nextGallerySlide();
            stopGallerySlideshow();
            startGallerySlideshow(); // Restart timer after manual navigation
        });
    }

    // Gallery indicator click events
    galleryIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showGallerySlide(index);
            stopGallerySlideshow();
            startGallerySlideshow(); // Restart timer after manual navigation
        });
    });

    // Pause gallery slideshow on hover
    if (gallerySection) {
        gallerySection.addEventListener('mouseenter', stopGallerySlideshow);
        gallerySection.addEventListener('mouseleave', startGallerySlideshow);
    }

    // Start the gallery slideshow
    if (gallerySlides.length > 0) {
        startGallerySlideshow();
    }
}

initGalleryCarousel();

// Sponsor Tiers
// Sponsor logos come from pictures/Sponsors/<Tier>/, and the tier list/order
// comes from pictures/Sponsors/manifest.json, which is regenerated automatically
// from that folder structure every time the site is deployed (see
// generate-sponsors-manifest.js + firebase.json "predeploy"). To add a sponsor,
// drop their logo into the matching tier folder - no code changes needed.
async function initSponsorTiers() {
    const tiersContainer = document.querySelector('.sponsor-tiers');
    if (!tiersContainer) return;

    let tiers = [];
    try {
        const response = await fetch('pictures/Sponsors/manifest.json', { cache: 'no-store' });
        tiers = await response.json();
    } catch (err) {
        console.error('Could not load sponsors manifest:', err);
        return;
    }

    if (!Array.isArray(tiers) || tiers.length === 0) return;

    tiersContainer.innerHTML = tiers.map(({ tier, files }) => {
        const tierSlug = tier.toLowerCase().replace(/\s+/g, '-');
        const cards = files.map(file => {
            const src = `pictures/Sponsors/${encodeURIComponent(tier)}/${encodeURIComponent(file)}`;
            const name = file.replace(/\.[^.]+$/, '').replace(/([a-z])([A-Z])/g, '$1 $2');
            return `
                <div class="sponsor-card">
                    <div class="sponsor-logo">
                        <img src="${src}" alt="${name}" loading="lazy">
                    </div>
                </div>`;
        }).join('');

        return `
            <div class="sponsor-tier sponsor-tier-${tierSlug}">
                <h3 class="sponsor-tier-title">${tier} Sponsors</h3>
                <div class="sponsors-grid">${cards}</div>
            </div>`;
    }).join('');
}

initSponsorTiers();



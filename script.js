// Hero Carousel Functionality
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-nav.prev');
const nextBtn = document.querySelector('.carousel-nav.next');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
let slideInterval;

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
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);
}

// Start the slideshow
startSlideshow();

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

// Player Modal Functionality
const playerModal = document.getElementById('playerModal');
const modalClose = document.querySelector('.modal-close');
const playerCards = document.querySelectorAll('.player-card');

// Open modal when clicking on a player
playerCards.forEach(player => {
    player.addEventListener('click', function() {
        // Get player data from data attributes
        const playerName = this.getAttribute('data-player-name');
        const playerAge = this.getAttribute('data-player-age');
        const playerNumber = this.getAttribute('data-player-number');
        const playerTeam = this.getAttribute('data-player-team');
        const playerPosition = this.getAttribute('data-player-position');
        const playerBats = this.getAttribute('data-player-bats');
        const playerThrows = this.getAttribute('data-player-throws');
        const playerPhoto = this.getAttribute('data-player-photo');

        // Update modal content
        document.getElementById('modalPlayerName').textContent = playerName;
        document.getElementById('modalPlayerAge').textContent = playerAge;
        document.getElementById('modalPlayerNumber').textContent = playerNumber;
        document.getElementById('modalPlayerTeam').textContent = playerTeam;
        document.getElementById('modalPlayerPosition').textContent = playerPosition;
        document.getElementById('modalPlayerBats').textContent = playerBats;
        document.getElementById('modalPlayerThrows').textContent = playerThrows;
        document.getElementById('modalPlayerImage').src = playerPhoto;
        document.getElementById('modalPlayerImage').alt = playerName;

        // Show modal
        playerModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

// Close modal when clicking X
modalClose.addEventListener('click', function() {
    playerModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === playerModal) {
        playerModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && playerModal.style.display === 'block') {
        playerModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

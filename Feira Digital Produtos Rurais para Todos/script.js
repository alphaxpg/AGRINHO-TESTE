// Mobile menu toggle
document.getElementById('mobileMenuButton').addEventListener('click', function() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
});

// Back to top button
document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        document.getElementById('backToTop').classList.add('show');
    } else {
        document.getElementById('backToTop').classList.remove('show');
    }
});

// Success modal
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        successModal.classList.remove('hidden');
    });
}

closeModal.addEventListener('click', function() {
    successModal.classList.add('hidden');
});

// Accessibility buttons
// Initialize font size to default on load if not already set by user
let currentFontSize = parseFloat(getComputedStyle(document.body).fontSize);

document.getElementById('fontSizeBtn').addEventListener('click', function() {
    if (currentFontSize === 16) { // Check if it's the default font size (16px)
        document.body.style.fontSize = '18px';
        currentFontSize = 18;
    } else {
        document.body.style.fontSize = '16px'; // Revert to default
        currentFontSize = 16;
    }
});

document.getElementById('contrastBtn').addEventListener('click', function() {
    document.body.classList.toggle('high-contrast');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        document.getElementById('navbar').classList.add('shadow-lg', 'bg-white');
    } else {
        document.getElementById('navbar').classList.remove('shadow-lg', 'bg-white');
    }
});
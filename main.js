// Mobile Navigation Toggle
const menuBtn = document.getElementById('MenuBtn');
const body = document.querySelector('body');

menuBtn.addEventListener('click', function() {
    body.classList.toggle('mobile-nav-active');
    this.classList.toggle('fa-xmark');
});

// Active Navigation Link
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

function activeLink() {
    let position = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (position >= sectionTop && position < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activeLink);
window.addEventListener('load', activeLink);

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active');
                menuBtn.classList.remove('fa-xmark');
            }
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Typing Animation Effect
let typed = new Typed('#auto-Input', {
    strings: [
        'Full-Stack Developer', 
        'UI/UX Designer', 
        'Web Developer', 
        'Mobile App Developer'
    ],
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 2000,
    loop: true,
    smartBackspace: true
});

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const result = document.getElementById('result');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = form.querySelector('input[name="name"]').value.trim();
            const email = form.querySelector('input[name="email"]').value.trim();
            const phone = form.querySelector('input[name="phone"]').value.trim();
            const message = form.querySelector('textarea[name="message"]').value.trim();
            
            // Check for empty fields
            if (name === '' || email === '' || phone === '' || message === '') {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Phone validation - allow different formats
            const phoneRegex = /^[\d\s+()-]{10,15}$/;
            if (!phoneRegex.test(phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }
            
            // Show loading state
            if (result) result.innerHTML = '<span class="loading">Sending message...</span>';
            
            // Form data preparation
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            
            // Send form data using fetch API
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    showNotification('Your message has been sent successfully!', 'success');
                    form.reset();
                } else {
                    showNotification(json.message || 'Something went wrong. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error(error);
                showNotification('Something went wrong. Please try again later.', 'error');
            });
        });
    }
    
    // Notification helper function
    function showNotification(message, type = 'info') {
        if (!result) return;
        
        result.innerHTML = `<div class="notification ${type}">${message}</div>`;
        
        // Auto hide notification after 5 seconds
        setTimeout(() => {
            result.innerHTML = '';
        }, 5000);
    }
});

// Animation on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('appear');
        }
    });
    
    // Handle back to top button visibility
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
};

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    document.querySelectorAll('.Skills-box, .service-box, .port-item, .fact-box').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Run on initial load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
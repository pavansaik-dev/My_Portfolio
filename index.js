AOS.init({
    duration: 1000,
    once: true
});


// Flash Animation
function createFlash() {
    const flash = document.createElement('div');
    flash.className = 'flash';
    document.body.appendChild(flash);
    flash.animate([
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 200,
        easing: 'ease-in-out'
    }).onfinish = () => flash.remove();
}

// Ripple Effect
function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${x - 10}px`;
    ripple.style.top = `${y - 10}px`;
    document.body.appendChild(ripple);
    ripple.animate([
        { transform: 'scale(0)', opacity: 0.5 },
        { transform: 'scale(10)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).onfinish = () => ripple.remove();
}

// Particle Burst
function createParticleBurst(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        document.body.appendChild(particle);
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
}

// Glowing Trail
function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = `${x - 5}px`;
    trail.style.top = `${y - 5}px`;
    document.body.appendChild(trail);
    trail.animate([
        { opacity: 0.7, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(2)' }
    ], {
        duration: 400,
        easing: 'ease-out'
    }).onfinish = () => trail.remove();
}

// Event Listener
document.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    createFlash();
    createRipple(x, y);
    createParticleBurst(x, y);
    createTrail(x, y);
});



const toggler = document.querySelector('.navbar-toggler');
const menu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.nav-item');
const navlink = document.querySelectorAll('.nav-link');

toggler.addEventListener('click', () => {
    menu.classList.toggle('active');
    navlink.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            menu.classList.remove('active'); // Close the menu after clicking a link on mobile
            navlink.classList.remove('active');
        }
        // The default behavior of the anchor tag will handle scrolling to the section
    });
});


const sections = document.querySelectorAll('section');
const Links = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    Links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});



const countingSection = document.getElementById('countingSection');
const counterElements = document.querySelectorAll('.counter');
const animationSpeed = 500; // Milliseconds between updates
let animationStarted = false;

function animateCounter(counterElement, target) {
    let currentNumber = 0;
    const interval = setInterval(() => {
    counterElement.textContent = currentNumber;
    if (currentNumber >= target) {
        clearInterval(interval);
    } else {
        currentNumber++;
    }
    }, animationSpeed);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting && !animationStarted) {
        animationStarted = true;
        counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
        });
        // Optionally, disconnect the observer after starting the animations
        observer.unobserve(countingSection);
    }
    });
});

observer.observe(countingSection);


const contactForm = document.querySelector('.contact-form');
        
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email1').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (name === '' || email === '' || subject === '' || message === '') {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email');
        return;
    }
    
    // Normally here you would send the data to a server
    // For demonstration purposes, we'll just show a success message
    alert('Message sent successfully!');
    contactForm.reset();
});
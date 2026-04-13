const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

if (links.length > 0) {
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        });
    });
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.project-card, .skill-category, .stat');
if (animatedElements.length > 0) {
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
if (smoothScrollLinks.length > 0) {
    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

const downloadCVBtn = document.getElementById('downloadCVBtn');
const downloadCV = document.getElementById('downloadCV');

function handleCVDownload(e) {
    e.preventDefault();
    window.open('images/CV-KAKPO-Rosaire.pdf', '_blank');
}

if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', handleCVDownload);
}

if (downloadCV) {
    downloadCV.addEventListener('click', handleCVDownload);
}

const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const message = document.getElementById('userMessage').value;
        
        if (name && message) {
            const whatsappMessage = `Bonjour, je suis ${name}. ${message}`;
            const whatsappURL = `https://wa.me/22901168812019?text=${encodeURIComponent(whatsappMessage)}`;
            
            window.open(whatsappURL, '_blank');
            
            whatsappForm.reset();
        }
    });
}

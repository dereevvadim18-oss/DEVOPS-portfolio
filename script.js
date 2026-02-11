// ============ Hamburger Menu ============
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
    });
});

// ============ Smooth Scroll Enhancement ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ============ Navbar Background on Scroll ============
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar?.style.setProperty('--bg-opacity', '1');
    } else {
        navbar?.style.setProperty('--bg-opacity', '0.95');
    }
});

// ============ Intersection Observer for animations ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card, .skill-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============ Typing Animation in Hero ============
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing animation
// const titleElement = document.querySelector('.hero .title');
// if (titleElement) {
//     typeText(titleElement, 'Junior DevOps Engineer', 50);
// }

// ============ Counter Animation ============
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (target - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// Animate stats when in view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const number = parseInt(entry.target.textContent);
            if (!isNaN(number)) {
                animateCounter(entry.target, number);
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
    statsObserver.observe(el);
});

// ============ Theme Toggle (Optional) ============
function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// ============ Performance Monitoring ============
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`📊 Время загрузки страницы: ${pageLoadTime}ms`);
    });
}

// ============ Console Welcome ============
console.log('%c 🚀 Добро пожаловать на DevOps Portfolio!', 'font-size: 20px; color: #0ea5e9; font-weight: bold;');
console.log('%c Телефон: +7 (999) 999-99-99', 'color: #06b6d4;');
console.log('%c Email: your@email.com', 'color: #06b6d4;');
console.log('%c GitHub: github.com/yourprofile', 'color: #06b6d4;');

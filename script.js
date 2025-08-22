const animateOnScroll = () => {
    const skills = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width || '0%';
                void entry.target.offsetWidth;
                entry.target.style.width = entry.target.parentElement.getAttribute('data-width') || '0%';
            }
        });
    }, {
        threshold: 0.5 
    });

    skills.forEach(skill => {
        skill.parentElement.setAttribute('data-width', skill.style.width);
        // Reset width for animation
        skill.style.width = '0%';
        // Start observing
        observer.observe(skill);
    });
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// Add parallax effect to the header
const updateParallax = () => {
    const header = document.querySelector('header');
    if (header) {
        const scrolled = window.pageYOffset;
        header.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
};

// Add a subtle floating animation to the profile image
const addFloatingEffect = () => {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        let floating = false;
        let floatDirection = 1;
        let floatPosition = 0;
        
        setInterval(() => {
            if (!floating) {
                floating = true;
                const animation = setInterval(() => {
                    floatPosition += 0.05 * floatDirection;
                    profileImage.style.transform = `translateY(${Math.sin(floatPosition) * 5}px)`;
                    
                    if (Math.abs(Math.sin(floatPosition)) > 0.9) {
                        floatDirection *= -1;
                    }
                    
                    if (Math.abs(floatPosition) > Math.PI * 2) {
                        clearInterval(animation);
                        setTimeout(() => {
                            profileImage.style.transform = 'translateY(0)';
                            floating = false;
                        }, 2000);
                    }
                }, 30);
            }
        }, 8000); // Start floating every 8 seconds
    }
};

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    addFloatingEffect();
    
    // Add scroll event for parallax
    window.addEventListener('scroll', updateParallax);
    
    // Initialize with current scroll position
    updateParallax();
    
    // Add loaded class to body for fade-in effect
    document.body.classList.add('loaded');
});

// Add a simple console greeting
console.log('%c👋 Hello there! Thanks for checking out my portfolio.', 
    'color: #4CAF50; font-size: 16px; font-weight: bold;');
console.log('%c🔍 Feel free to explore the code and get in touch if you have any questions!', 
    'color: #2196F3; font-size: 14px;');

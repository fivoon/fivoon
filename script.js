/**
 * Fivoon MVP Development Website JavaScript
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle with improved functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        // Force initial state
        mobileMenu.classList.add('hidden');
        
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the menu visibility
            mobileMenu.classList.toggle('hidden');
            // Toggle active class for hamburger animation
            mobileMenuButton.classList.toggle('active');
        });
        
        // Close menu when clicking menu items
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && e.target !== mobileMenuButton && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('active');
            }
        });
        
        // Close menu on window resize if viewport becomes desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('active');
            }
        });
    } else {
        // Removed console.error
    }
    
    // Throttle function to limit how often a function runs
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust offset based on screen size for better mobile experience
                const offset = window.innerWidth < 768 ? 80 : 100;
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if it's open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.classList.remove('active');
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    if (header) {
        const handleScroll = throttle(function() {
            // Determine scroll direction
            const scrollY = window.scrollY;
            const scrollingDown = scrollY > lastScrollY;
            
            // Hide header when scrolling down, show when scrolling up
            // But don't hide it on mobile when scrollY is small to avoid jarring experience
            if (scrollingDown && scrollY > (window.innerWidth < 768 ? 200 : 100)) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            // Always show header at the top of the page
            if (scrollY <= 10) {
                header.classList.remove('hidden');
            }
            
            // Adjust header styling based on scroll position
            if (scrollY > 50) {
                header.classList.add('py-2');
                header.classList.remove('py-4');
            } else {
                header.classList.add('py-4');
                header.classList.remove('py-2');
            }
            
            // Update last scroll position
            lastScrollY = scrollY;
        }, 100); // Run at most every 100ms
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Project cards modal functionality
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (projectCards.length > 0 && projectModal) {
        // Setup close modal functionality
        closeModalBtn.addEventListener('click', () => {
            projectModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
        
        // Close modal when clicking outside
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
        
        // Add click handlers to each project card
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                // Get project data from data attributes
                const title = card.querySelector('.project-title').textContent;
                const image = card.querySelector('img').src;
                const industry = card.getAttribute('data-industry');
                const timeline = card.getAttribute('data-timeline');
                const results = card.getAttribute('data-results');
                const overview = card.getAttribute('data-overview');
                const challenge = card.getAttribute('data-challenge');
                const solution = card.getAttribute('data-solution');
                const technologies = card.getAttribute('data-technologies').split(', ');
                
                // Populate modal with data
                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-image').src = image;
                document.getElementById('modal-image').alt = title;
                document.getElementById('modal-industry').textContent = industry;
                document.getElementById('modal-timeline').textContent = timeline;
                document.getElementById('modal-results').textContent = results;
                document.getElementById('modal-overview').textContent = overview;
                document.getElementById('modal-challenge').textContent = challenge;
                document.getElementById('modal-solution').textContent = solution;
                
                // Add technologies
                const techContainer = document.getElementById('modal-tech');
                techContainer.innerHTML = '';
                technologies.forEach(tech => {
                    const techBadge = document.createElement('span');
                    techBadge.className = 'bg-gray-100 text-gray-800 px-3 py-1 rounded-md';
                    techBadge.textContent = tech.trim();
                    techContainer.appendChild(techBadge);
                });
                
                // Show modal
                projectModal.classList.remove('hidden');
                document.body.classList.add('overflow-hidden');
            });
        });
    }
}); 
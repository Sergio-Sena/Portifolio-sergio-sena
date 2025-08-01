// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('-translate-x-full');
        document.body.classList.toggle('overflow-hidden');
        
        // Animate hamburger button
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (mobileMenu.classList.contains('-translate-x-full')) {
                // Reset to hamburger
                span.style.transform = '';
                span.style.opacity = '';
            } else {
                // Transform to X
                if (index === 0) {
                    span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                } else if (index === 1) {
                    span.style.opacity = '0';
                } else {
                    span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
            }
        });
    }

    // Close mobile menu
    function closeMobileMenuHandler() {
        mobileMenu.classList.add('-translate-x-full');
        document.body.classList.remove('overflow-hidden');
        
        // Reset hamburger button
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }

    // Event listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    closeMobileMenu.addEventListener('click', closeMobileMenuHandler);

    // Close menu when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenuHandler);
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenuHandler();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('-translate-x-full')) {
            closeMobileMenuHandler();
        }
    });
});
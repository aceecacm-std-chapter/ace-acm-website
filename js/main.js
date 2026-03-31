// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if(navLinks) navLinks.classList.remove('active'); // close mobile menu on click
            if(mobileToggle) {
               const icon = mobileToggle.querySelector('i');
               if(icon) {
                 icon.classList.remove('fa-times');
                 icon.classList.add('fa-bars');
               }
            }
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // Form submission simulation
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const status = document.getElementById('form-status');
            
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                if (response.ok) {
                    status.innerHTML = '<span style="color: #00d2ff;">Message sent successfully! We will get back to you soon.</span>';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = '<span style="color: #ff4d4d;">' + data["errors"].map(error => error["message"]).join(", ") + '</span>';
                        } else {
                            status.innerHTML = '<span style="color: #ff4d4d;">Oops! There was a problem submitting your form.</span>';
                        }
                    });
                }
            }).catch(error => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                status.innerHTML = '<span style="color: #ff4d4d;">Oops! There was a problem submitting your form.</span>';
            }).finally(() => {
                setTimeout(() => {
                    status.innerHTML = '';
                }, 5000);
            });
        });
    }

    // Lightbox functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    // Select all images we want to be clickable
    const images = document.querySelectorAll('.avatar-container img, .gallery-item img, .event-img img');

    images.forEach(img => {
        img.style.cursor = 'pointer'; // Make it clear it's clickable
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            setTimeout(() => modal.classList.add('show'), 10);
            modalImg.src = this.src;
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        });
    }

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.style.display = 'none', 300);
            }
        });
    }
});

// Create animated stars background
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const numStars = 100;
            
            for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }

        // Create floating particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.8)`;
            particle.style.borderRadius = '50%';
           particle.style.left = Math.random() * 100 + '%';
           particle.style.top = '100%';
           particle.style.pointerEvents = 'none';
           particle.style.zIndex = '5';
           particle.style.opacity = '0';
           particle.style.transition = 'all 3s linear';
           
           document.body.appendChild(particle);
           
           // Animate particle
           setTimeout(() => {
               particle.style.top = '-10px';
               particle.style.opacity = '1';
               particle.style.transform = `translateX(${Math.random() * 200 - 100}px)`;
           }, 100);
           
           // Remove particle after animation
           setTimeout(() => {
               if (particle.parentNode) {
                   particle.parentNode.removeChild(particle);
               }
           }, 3000);
       }

       console.log("Original design & code by Harshad Mahajan - 2025");

       // Smooth scrolling for navigation links
       function smoothScroll(target) {
           const element = document.querySelector(target);
           if (element) {
               element.scrollIntoView({
                   behavior: 'smooth',
                   block: 'start'
               });
           }
       }

       // Parallax effect for floating elements
       function parallaxEffect() {
           const floatingElements = document.querySelectorAll('.floating-element');
           const scrollY = window.pageYOffset;
           
           floatingElements.forEach((element, index) => {
               const speed = 0.1 + (index * 0.05);
               element.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02}deg)`;
           });
       }

       // Add typing effect to hero description
       function typeWriter(element, text, speed = 50) {
           let i = 0;
           element.innerHTML = '';
           
           function type() {
               if (i < text.length) {
                   element.innerHTML += text.charAt(i);
                   i++;
                   setTimeout(type, speed);
               }
           }
           
           type();
       }

       // Intersection Observer for fade-in animations
       function observeElements() {
           const observer = new IntersectionObserver((entries) => {
               entries.forEach(entry => {
                   if (entry.isIntersecting) {
                       entry.target.style.opacity = '1';
                       entry.target.style.transform = 'translateY(0)';
                   }
               });
           }, {
               threshold: 0.1,
               rootMargin: '0px 0px -50px 0px'
           });

           // Observe all contact cards and social cards
           document.querySelectorAll('.contact-card, .social-card').forEach(card => {
               card.style.opacity = '0';
               card.style.transform = 'translateY(30px)';
               card.style.transition = 'all 0.6s ease';
               observer.observe(card);
           });
       }

       // Add ripple effect to clickable elements
       function addRippleEffect(element) {
           element.addEventListener('click', function(e) {
               const ripple = document.createElement('span');
               const rect = element.getBoundingClientRect();
               const size = Math.max(rect.width, rect.height);
               const x = e.clientX - rect.left - size / 2;
               const y = e.clientY - rect.top - size / 2;
               
               ripple.style.width = ripple.style.height = size + 'px';
               ripple.style.left = x + 'px';
               ripple.style.top = y + 'px';
               ripple.style.position = 'absolute';
               ripple.style.borderRadius = '50%';
               ripple.style.background = 'rgba(255, 255, 255, 0.3)';
               ripple.style.transform = 'scale(0)';
               ripple.style.animation = 'ripple 0.6s linear';
               ripple.style.pointerEvents = 'none';
               
               element.style.position = 'relative';
               element.style.overflow = 'hidden';
               element.appendChild(ripple);
               
               setTimeout(() => {
                   ripple.remove();
               }, 600);
           });
       }

       // Add CSS for ripple animation
       const rippleCSS = `
           @keyframes ripple {
               to {
                   transform: scale(4);
                   opacity: 0;
               }
           }
       `;
       
       const style = document.createElement('style');
       style.textContent = rippleCSS;
       document.head.appendChild(style);

       // Initialize everything when DOM is loaded
       document.addEventListener('DOMContentLoaded', function() {
           createStars();
           observeElements();
           
           // Add ripple effects to interactive elements
           document.querySelectorAll('.contact-card, .social-card, .contact-link, .social-link-footer').forEach(addRippleEffect);
           
           // Create particles periodically
           setInterval(createParticle, 2000);
           
           // Add typing effect to hero description
           const heroDescription = document.querySelector('.hero-description');
           const originalText = heroDescription.textContent;
           setTimeout(() => {
               typeWriter(heroDescription, originalText, 30);
           }, 1000);
           
           // Parallax effect on scroll
           window.addEventListener('scroll', parallaxEffect);
           
           // Add hover sound effects (optional)
           document.querySelectorAll('.contact-card, .social-card').forEach(card => {
               card.addEventListener('mouseenter', () => {
                   // You can add sound effects here if needed
                   card.style.filter = 'brightness(1.1)';
               });
               
               card.addEventListener('mouseleave', () => {
                   card.style.filter = 'brightness(1)';
               });
           });
           
           // Dynamic gradient animation for contact cards
           const contactCards = document.querySelectorAll('.contact-card');
           contactCards.forEach((card, index) => {
               card.addEventListener('mousemove', (e) => {
                   const rect = card.getBoundingClientRect();
                   const x = ((e.clientX - rect.left) / rect.width) * 100;
                   const y = ((e.clientY - rect.top) / rect.height) * 100;
                   
                   card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 107, 107, 0.2) 0%, rgba(78, 205, 196, 0.2) 50%, rgba(20, 20, 40, 0.8) 100%)`;
               });
               
               card.addEventListener('mouseleave', () => {
                   card.style.background = 'rgba(20, 20, 40, 0.8)';
               });
           });
       });

       // Add email copy functionality
       function copyEmail() {
           const email = 'mahajanharsh932@gmail.com';
           navigator.clipboard.writeText(email).then(() => {
               // Show success message
               const notification = document.createElement('div');
               notification.textContent = 'Email copied to clipboard!';
               notification.style.position = 'fixed';
               notification.style.top = '20px';
               notification.style.right = '20px';
               notification.style.background = 'rgba(78, 205, 196, 0.9)';
               notification.style.color = 'white';
               notification.style.padding = '10px 20px';
               notification.style.borderRadius = '25px';
               notification.style.zIndex = '9999';
               notification.style.animation = 'slideIn 0.3s ease';
               
               document.body.appendChild(notification);
               
               setTimeout(() => {
                   notification.remove();
               }, 3000);
           });
       }

       // Add slideIn animation for notifications
       const notificationCSS = `
           @keyframes slideIn {
               from {
                   transform: translateX(100%);
                   opacity: 0;
               }
               to {
                   transform: translateX(0);
                   opacity: 1;
               }
           }
       `;
       
       const notificationStyle = document.createElement('style');
       notificationStyle.textContent = notificationCSS;
       document.head.appendChild(notificationStyle);
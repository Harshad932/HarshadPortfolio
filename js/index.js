function navigateToPage(page) {
            const warpOverlay = document.getElementById('warpOverlay');
            warpOverlay.classList.add('active');
            
            setTimeout(() => {
                window.location.href = page;
                warpOverlay.classList.remove('active');
            }, 800);
        }

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
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '2';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            
            document.body.appendChild(particle);
            
            const animation = particle.animate([
                { transform: 'translateY(0px) scale(1)', opacity: 1 },
                { transform: `translateY(-${window.innerHeight + 200}px) scale(0)`, opacity: 0 }
            ], {
                duration: 4000 + Math.random() * 3000,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => particle.remove();
        }

        // Header scroll effect
        function handleScroll() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.transform = 'translateY(0)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.9)';
            }
        }

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

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            createStars();
            
            // Create particles periodically
            setInterval(createParticle, 500);
            
            // Add scroll listener
            window.addEventListener('scroll', handleScroll);
            
            // Enhanced portal hover effects
            document.querySelectorAll('.portal').forEach((portal, index) => {
                portal.addEventListener('mouseenter', () => {
                    portal.style.transform = 'scale(1.15) rotateY(15deg)';
                    
                    // Create hover particles
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            const hoverParticle = document.createElement('div');
                            hoverParticle.style.position = 'absolute';
                            hoverParticle.style.width = '6px';
                            hoverParticle.style.height = '6px';
                            hoverParticle.style.backgroundColor = 'rgba(78, 205, 196, 0.8)';
                            hoverParticle.style.borderRadius = '50%';
                            hoverParticle.style.pointerEvents = 'none';
                            hoverParticle.style.left = '50%';
                            hoverParticle.style.top = '50%';
                            
                            portal.appendChild(hoverParticle);
                            
                            const angle = (Math.PI * 2 * i) / 5;
                            const distance = 100;
                            
                            hoverParticle.animate([
                                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                                { 
                                    transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, 
                                    opacity: 0 
                                }
                            ], {
                                duration: 800,
                                easing: 'ease-out'
                            }).onfinish = () => hoverParticle.remove();
                        }, i * 50);
                    }
                });
                
                portal.addEventListener('mouseleave', () => {
                    portal.style.transform = 'scale(1) rotateY(0deg)';
                });
            });

            // Add navigation link click handlers
            document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = link.getAttribute('href');
        if (target.startsWith('#')) {
            e.preventDefault();
            smoothScroll(target);
        }
        // Don't prevent default for normal page navigation
    });
});

            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe info cards for scroll animations
            document.querySelectorAll('.info-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                observer.observe(card);
            });
        });

        // Add some random portal glitches for extra effect
        setInterval(() => {
            const portals = document.querySelectorAll('.portal');
            const randomPortal = portals[Math.floor(Math.random() * portals.length)];
            
            randomPortal.style.filter = 'hue-rotate(45deg) brightness(1.2)';
            setTimeout(() => {
                randomPortal.style.filter = 'none';
            }, 200);
        }, 5000);

        document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("keydown", e => {
    if (
      (e.ctrlKey && (e.key === "u" || e.key === "U" || e.key === "s")) ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      e.key === "F12"
    ) {
      e.preventDefault();
    }
  });

        // Create floating particles around projects
        function createProjectParticles() {
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    for (let i = 0; i < 8; i++) {
                        setTimeout(() => {
                            const particle = document.createElement('div');
                            particle.style.position = 'absolute';
                            particle.style.width = '4px';
                            particle.style.height = '4px';
                            particle.style.backgroundColor = 'rgba(78, 205, 196, 0.8)';
                            particle.style.borderRadius = '50%';
                            particle.style.pointerEvents = 'none';
                            particle.style.zIndex = '1000';
                            
                            const rect = card.getBoundingClientRect();
                            particle.style.left = rect.left + rect.width / 2 + 'px';
                            particle.style.top = rect.top + rect.height / 2 + 'px';
                            
                            document.body.appendChild(particle);
                            
                            const angle = (Math.PI * 2 * i) / 8;
                            const distance = 80;
                            
                            particle.animate([
                                { 
                                    transform: 'translate(-50%, -50%) scale(1)', 
                                    opacity: 1 
                                },
                                { 
                                    transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, 
                                    opacity: 0 
                                }
                            ], {
                                duration: 1000,
                                easing: 'ease-out'
                            }).onfinish = () => particle.remove();
                        }, i * 50);
                    }
                });
            });
        }

        // Create animated stars background
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const numStars = 150;
            
            for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.animationDuration = (2 + Math.random() * 2) + 's';
                starsContainer.appendChild(star);
            }
        }

        // Intersection Observer for scroll animations
        function initializeScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);

            // Observe elements for animations
            document.querySelectorAll('.project-card, .highlight-card, .stat-item').forEach(el => {
                observer.observe(el);
            });
        }

        // Header scroll effect
        function handleScroll() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.9)';
                header.style.backdropFilter = 'blur(10px)';
            }
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            createStars();
            createProjectParticles();
            initializeScrollAnimations();
            
            // Add scroll listener
            window.addEventListener('scroll', handleScroll);
            
            // Create background particles periodically
            setInterval(() => {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.width = Math.random() * 3 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.backgroundColor = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.6)`;
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '2';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = window.innerHeight + 'px';
                
                document.body.appendChild(particle);
                
                particle.animate([
                    { transform: 'translateY(0px) scale(1)', opacity: 1 },
                    { transform: `translateY(-${window.innerHeight + 200}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 6000 + Math.random() * 4000,
                    easing: 'ease-out'
                }).onfinish = () => particle.remove();
            }, 800);

            // Random glitch effects for extra flair
            setInterval(() => {
                const cards = document.querySelectorAll('.project-card');
                const randomCard = cards[Math.floor(Math.random() * cards.length)];
                
                if (randomCard) {
                    randomCard.style.filter = 'hue-rotate(45deg) brightness(1.1)';
                    setTimeout(() => {
                        randomCard.style.filter = 'none';
                    }, 150);
                }
            }, 8000);

            // Add CSS for additional animations
            const additionalStyles = `
                .features-showcase {
                    margin: 6rem 0;
                    text-align: center;
                }

                .features-title {
                    font-size: 3rem;
                    color: #4ecdc4;
                    margin-bottom: 3rem;
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .highlight-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .highlight-card {
                    background: rgba(20, 20, 40, 0.6);
                    border-radius: 20px;
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    text-align: center;
                }

                .highlight-card:hover {
                    transform: translateY(-10px);
                    border-color: rgba(78, 205, 196, 0.5);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                }

                .highlight-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    display: block;
                }

                .highlight-card h3 {
                    color: #4ecdc4;
                    margin-bottom: 1rem;
                    font-size: 1.3rem;
                }

                .highlight-card p {
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.6;
                }

                
            `;

            const styleSheet = document.createElement('style');
            styleSheet.textContent = additionalStyles;
            document.head.appendChild(styleSheet);
        });

        document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.project-video-player');
    
    videos.forEach(video => {
        // Ensure video plays when loaded
        video.addEventListener('loadeddata', function() {
            this.setAttribute('data-loaded', 'true');
            this.play().catch(e => {
                console.log('Video autoplay failed:', e);
            });
        });
        
        // Handle video errors
        video.addEventListener('error', function() {
            console.log('Video failed to load');
            // The fallback div will be shown automatically
        });
        
        // Pause video when card is out of view (optional performance optimization)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log('Play failed:', e));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(video.closest('.project-card'));
    });
});
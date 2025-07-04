// Create animated stars background
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
                star.style.animationDuration = (Math.random() * 2 + 2) + 's';
                starsContainer.appendChild(star);
            }
        }

        // Scroll to top function
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Timeline animation on scroll
        function animateTimeline() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            timelineItems.forEach(item => {
                observer.observe(item);
            });
        }

        // Parallax effect for background elements
        function initParallax() {
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                parallaxElements.forEach((element, index) => {
                    const speed = 0.2 + (index * 0.1);
                    element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
                });
            });
        }

        // Header scroll effect
        function initHeaderScroll() {
            const header = document.querySelector('.header');
            let lastScrollTop = 0;

            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            });
        }

        // Smooth scrolling for anchor links
        function initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Add typing effect to hero subtitle
        function typewriterEffect() {
            const subtitle = document.querySelector('.hero-subtitle');
            const text = subtitle.textContent;
            subtitle.textContent = '';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 50);
        }

        // Add hover effect to skill cards
        function initSkillCardEffects() {
            const skillCards = document.querySelectorAll('.skill-card');
            
            skillCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        // Initialize floating action button visibility
        function initFAB() {
            const fab = document.querySelector('.fab');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    fab.style.opacity = '1';
                    fab.style.transform = 'scale(1)';
                } else {
                    fab.style.opacity = '0';
                    fab.style.transform = 'scale(0.8)';
                }
            });
        }
        
        // Add scroll progress indicator
        function initScrollProgress() {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Remove loading class to trigger fade-in animation
            document.body.classList.remove('loading');
            
            // Initialize all features
            createStars();
            animateTimeline();
            initParallax();
            initHeaderScroll();
            initSmoothScrolling();
            initSkillCardEffects();
            initFAB();
            initRippleEffect();
            initScrollProgress();
            
            // Add typing effect with delay
            setTimeout(typewriterEffect, 1000);
        });

        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                scrollToTop();
            }
        });

        // Performance optimization: Throttle scroll events
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
            }
        }

        // Add resize handler for responsive adjustments
        window.addEventListener('resize', throttle(function() {
            // Recalculate parallax positions
            const parallaxElements = document.querySelectorAll('.parallax-element');
            parallaxElements.forEach(element => {
                element.style.transform = 'translate3d(0, 0, 0)';
            });
        }, 250));

        let slideIndices = {};

        function initializeSlideshows() {
            const slideshows = document.querySelectorAll('[data-slideshow]');
            slideshows.forEach(slideshow => {
                const id = slideshow.getAttribute('data-slideshow');
                slideIndices[id] = 1;
            });
        }

        function changeSlide(slideshowId, direction) {
            const slideshow = document.querySelector(`[data-slideshow="${slideshowId}"]`);
            const slides = slideshow.querySelectorAll('.honour-slide, .experience-slide');
            const dots = slideshow.querySelectorAll('.slide-dot');
            
            // Hide current slide
            slides[slideIndices[slideshowId] - 1].classList.remove('active');
            if (dots.length > 0) {
                dots[slideIndices[slideshowId] - 1].classList.remove('active');
            }
            
            // Update index
            slideIndices[slideshowId] += direction;
            
            if (slideIndices[slideshowId] > slides.length) {
                slideIndices[slideshowId] = 1;
            }
            if (slideIndices[slideshowId] < 1) {
                slideIndices[slideshowId] = slides.length;
            }
            
            // Show new slide
            slides[slideIndices[slideshowId] - 1].classList.add('active');
            if (dots.length > 0) {
                dots[slideIndices[slideshowId] - 1].classList.add('active');
            }
        }

        function currentSlide(slideshowId, slideIndex) {
            const slideshow = document.querySelector(`[data-slideshow="${slideshowId}"]`);
            const slides = slideshow.querySelectorAll('.honour-slide, .experience-slide');
            const dots = slideshow.querySelectorAll('.slide-dot');
            
            // Hide current slide
            slides[slideIndices[slideshowId] - 1].classList.remove('active');
            if (dots.length > 0) {
                dots[slideIndices[slideshowId] - 1].classList.remove('active');
            }
            
            // Update index
            slideIndices[slideshowId] = slideIndex;
            
            // Show new slide
            slides[slideIndices[slideshowId] - 1].classList.add('active');
            if (dots.length > 0) {
                dots[slideIndices[slideshowId] - 1].classList.add('active');
            }
        }

        // Auto-advance slides
        function autoAdvanceSlides() {
            const slideshows = document.querySelectorAll('[data-slideshow]');
            slideshows.forEach(slideshow => {
                const id = slideshow.getAttribute('data-slideshow');
                changeSlide(id, 1);
            });
        }

        // Experience items animation on scroll
        function animateExperience() {
            const experienceItems = document.querySelectorAll('.experience-item');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            experienceItems.forEach(item => {
                observer.observe(item);
            });
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', function() {
            initializeSlideshows();
            animateExperience();
            
            // Auto-advance slides every 5 seconds
            setInterval(autoAdvanceSlides, 5000);
        });

        // Add touch/swipe support for mobile
        function addSwipeSupport() {
            const slideshows = document.querySelectorAll('[data-slideshow]');
            
            slideshows.forEach(slideshow => {
                let startX = 0;
                let endX = 0;
                const id = slideshow.getAttribute('data-slideshow');
                
                slideshow.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
                
                slideshow.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    handleSwipe(id);
                });
                
                function handleSwipe(slideshowId) {
                    const threshold = 50;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > threshold) {
                        if (diff > 0) {
                            // Swipe left - next slide
                            changeSlide(slideshowId, 1);
                        } else {
                            // Swipe right - previous slide
                            changeSlide(slideshowId, -1);
                        }
                    }
                }
            });
        }

        // Initialize swipe support
        document.addEventListener('DOMContentLoaded', addSwipeSupport);
// Enhanced Skills Page JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Create animated stars background
            createStars();
            
            // Initialize skill progress bars
            initializeSkillBars();
            
            // Initialize mastery radar chart
            initializeRadarChart();
            
            // Initialize animated counters
            initializeCounters();
            
            // Initialize tech stack animations
            initializeTechStack();
            
            // Floating particles
            setInterval(createFloatingParticle, 300);
        });

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

        function initializeSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = entry.target.getAttribute('data-width');
                        entry.target.style.width = width;
                    }
                });
            }, { threshold: 0.3 });

            skillBars.forEach(bar => observer.observe(bar));
        }

        function initializeRadarChart() {
    const canvas = document.getElementById('skillRadar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Make radius responsive based on canvas size
    const size = Math.min(canvas.width, canvas.height);
    const centerX = canvas.width / 2;   
    const centerY = canvas.height / 2;
    const radius = (size / 2) - 60; // Reduced padding for mobile
    
    const skills = [
        { name: 'Frontend', value: 0.89 },
        { name: 'Backend', value: 0.95 },
        { name: 'Database', value: 0.90 },
        { name: 'DevOps', value: 0.78 },
        { name: 'Design', value: 0.83 },
        { name: 'Mobile', value: 0.75 }
    ];

    function drawRadar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw radar grid
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * i})`;
            ctx.stroke();
        }

        // Draw radar lines from center
        skills.forEach((skill, index) => {
            const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.stroke();
        });

        // Fill the skill area
        ctx.beginPath();
        skills.forEach((skill, index) => {
            const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius * skill.value;
            const y = centerY + Math.sin(angle) * radius * skill.value;
            
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = 'rgba(78, 205, 196, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw skill points and labels
        skills.forEach((skill, index) => {
            const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius * skill.value;
            const y = centerY + Math.sin(angle) * radius * skill.value;
            
            // Draw skill point
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI); // Smaller point for mobile
            ctx.fillStyle = '#4ecdc4';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw skill labels with responsive positioning
            const labelDistance = radius + (size > 300 ? 30 : 20); // Closer labels on mobile
            const labelX = centerX + Math.cos(angle) * labelDistance;
            const labelY = centerY + Math.sin(angle) * labelDistance;
            
            ctx.fillStyle = '#4ecdc4';
            ctx.font = `bold ${size > 300 ? 14 : 11}px Arial`; // Smaller font on mobile
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(skill.name, labelX, labelY);
        });
    }

    drawRadar();
}

        function initializeCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        }

        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        }

        function initializeTechStack() {
            const techItems = document.querySelectorAll('.tech-item');
            
            techItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                
                item.addEventListener('mouseenter', () => {
                    const level = item.getAttribute('data-level');
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tech-tooltip';
                    tooltip.textContent = `Proficiency: ${level}%`;
                    tooltip.style.position = 'absolute';
                    tooltip.style.background = 'rgba(0, 0, 0, 0.9)';
                    tooltip.style.color = 'white';
                    tooltip.style.padding = '0.5rem';
                    tooltip.style.borderRadius = '5px';
                    tooltip.style.fontSize = '0.8rem';
                    tooltip.style.pointerEvents = 'none';
                    tooltip.style.zIndex = '1000';
                    
                    document.body.appendChild(tooltip);
                    
                    const rect = item.getBoundingClientRect();
                    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                    
                    item.tooltipElement = tooltip;
                });
                
                item.addEventListener('mouseleave', () => {
                    if (item.tooltipElement) {
                        item.tooltipElement.remove();
                        item.tooltipElement = null;
                    }
                });
            });
        }

        function createFloatingParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = Math.random() * 6 + 3 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `linear-gradient(45deg, 
                rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.8),
                rgba(78, 205, 196, 0.6))`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '2';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            
            document.body.appendChild(particle);
            
            const animation = particle.animate([
                { 
                    transform: 'translateY(0px) rotate(0deg) scale(1)', 
                    opacity: 1,
                    filter: 'blur(0px)'
                },
                { 
                    transform: `translateY(-${window.innerHeight + 200}px) rotate(${Math.random() * 360}deg) scale(0)`, 
                    opacity: 0,
                    filter: 'blur(5px)'
                }
            ], {
                duration: 3000 + Math.random() * 4000,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => particle.remove();
        }

        // Enhanced portal effects
        document.querySelectorAll('.skill-portal').forEach(portal => {
            portal.addEventListener('mouseenter', () => {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(78, 205, 196, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.marginLeft = '-10px';
                ripple.style.marginTop = '-10px';
                portal.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
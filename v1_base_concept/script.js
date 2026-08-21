const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    stars = [];
    const numStars = Math.floor((width * height) / 3000); // Responsive star count

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5,
            vx: Math.floor(Math.random() * 50) - 25,
            vy: Math.floor(Math.random() * 50) - 25,
            alpha: Math.random(),
            twinkleSpeed: 0.02 + Math.random() * 0.03
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Twinkle effect
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
            star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.fill();
        
        // Add subtle glow to larger stars
        if (star.radius > 1) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        } else {
            ctx.shadowBlur = 0;
        }

        // Very slow movement (optional)
        star.y -= 0.1;
        if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
        }
    });

    requestAnimationFrame(animate);
}

// Handle resize
window.addEventListener('resize', () => {
    init();
});

// Start animation
init();
animate();

// Add smooth interaction for sidebar links
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active state
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        e.target.closest('.nav-item').classList.add('active');
        
        // Add a subtle click animation to the card
        const card = document.querySelector('.poem-card');
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = 'fadeIn 0.5s ease-out';
    });
});

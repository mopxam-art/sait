// Ensure poems data is available from data.js
const poemListEl = document.getElementById('poem-list');
const titleEl = document.getElementById('poem-title');
const subtitleEl = document.getElementById('poem-subtitle');
const bodyEl = document.getElementById('poem-body');
const dateEl = document.getElementById('poem-date');
const cardEl = document.querySelector('.poem-card');
const iconEl = document.getElementById('current-season-icon');
const textEl = document.getElementById('current-season-text');

const seasonMeta = {
    'spring': { icon: '🌸', text: 'Вясна' },
    'summer': { icon: '✨', text: 'Лета' },
    'autumn': { icon: '🍂', text: 'Восень' },
    'winter': { icon: '❄️', text: 'Зіма' }
};

let currentSeason = 'summer';

// Initialize Navigation
function initNav() {
    poems.forEach((poem, index) => {
        const li = document.createElement('li');
        li.className = `nav-item ${index === 0 ? 'active' : ''}`;
        
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = poem.title;
        a.onclick = (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            li.classList.add('active');
            loadPoem(poem);
        };
        
        li.appendChild(a);
        poemListEl.appendChild(li);
    });
    
    // Load first poem
    if (poems.length > 0) {
        loadPoem(poems[0], true);
    }
}

// Load Poem and Switch Season
function loadPoem(poem, initial = false) {
    if (!initial) {
        cardEl.classList.add('fade-out');
    }
    
    setTimeout(() => {
        // Update DOM
        titleEl.textContent = poem.title;
        subtitleEl.textContent = poem.subtitle || '';
        subtitleEl.style.display = poem.subtitle ? 'block' : 'none';
        
        // Format stanzas
        const stanzas = poem.text.split('\n\n').map(s => `<div class="stanza">${s}</div>`).join('');
        bodyEl.innerHTML = stanzas;
        
        dateEl.textContent = poem.date || '';
        
        // Switch season theme
        document.body.className = `season-${poem.season}`;
        currentSeason = poem.season;
        iconEl.textContent = seasonMeta[poem.season].icon;
        textEl.textContent = seasonMeta[poem.season].text;
        
        // Reset animation
        cardEl.classList.remove('fade-out');
        cardEl.classList.add('fade-in');
        setTimeout(() => cardEl.classList.remove('fade-in'), 800);
        
        // Update particles color from CSS variable after it applies
        setTimeout(initParticles, 50);
        
    }, initial ? 0 : 300);
}


// --- Particles Animation System ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
let animationFrameId;

function getParticleColor() {
    const computedStyle = getComputedStyle(document.body);
    const color = computedStyle.getPropertyValue('--particle-color').trim();
    return color || '255, 255, 255';
}

function initParticles() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    particles = [];
    const numParticles = Math.floor((width * height) / 4000);
    const colorStr = getParticleColor();
    
    for (let i = 0; i < numParticles; i++) {
        particles.push(createParticle(colorStr));
    }
    
    animateParticles();
}

function createParticle(colorStr) {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: currentSeason === 'summer' ? (Math.random() - 0.5) * 0.2 : Math.random() * 1.5 + 0.5, // Fall down for non-summer
        alpha: Math.random(),
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.05,
        colorStr: colorStr
    };
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
        ctx.beginPath();
        
        if (currentSeason === 'summer') {
            // Stars / Fireflies
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            p.alpha += p.twinkleSpeed;
            if (p.alpha > 1 || p.alpha < 0.2) p.twinkleSpeed = -p.twinkleSpeed;
            
            p.x += p.vx;
            p.y += p.vy;
            
            ctx.fillStyle = `rgba(${p.colorStr}, ${Math.abs(p.alpha)})`;
            if (p.radius > 1.5) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(${p.colorStr}, 0.8)`;
            } else {
                ctx.shadowBlur = 0;
            }
        } else {
            // Falling snow/petals/leaves
            p.y += p.vy;
            p.x += Math.sin(p.wobble) * 1;
            p.wobble += p.wobbleSpeed;
            
            ctx.arc(p.x, p.y, p.radius * (currentSeason === 'autumn' ? 1.5 : 1), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.colorStr}, ${p.alpha})`;
            ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        
        // Wrap around
        if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
    });
    
    animationFrameId = requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initParticles);

// Start
initNav();

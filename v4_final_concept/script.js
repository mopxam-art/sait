// Poem data is loaded from data.js

const poemListEl = document.getElementById('poem-list');
const titleEl = document.getElementById('poem-title');
const subtitleEl = document.getElementById('poem-subtitle');
const epigraphEl = document.getElementById('poem-epigraph');
const bodyEl = document.getElementById('poem-body');
const dateEl = document.getElementById('poem-date');
const footnotesEl = document.getElementById('poem-footnotes');
const wrapperEl = document.getElementById('poem-wrapper');
const themeToggleBtn = document.getElementById('theme-toggle');

// Mobile Menu Elements
const sidebarEl = document.getElementById('sidebar');
const menuToggleBtn = document.getElementById('menu-toggle');
const mobileOverlayEl = document.getElementById('mobile-overlay');

let isDay = false; // Default is night

// Mobile Menu Logic
function toggleMobileMenu() {
    sidebarEl.classList.toggle('open');
    mobileOverlayEl.classList.toggle('active');
}

function closeMobileMenu() {
    sidebarEl.classList.remove('open');
    mobileOverlayEl.classList.remove('active');
}

menuToggleBtn.addEventListener('click', toggleMobileMenu);
mobileOverlayEl.addEventListener('click', closeMobileMenu);

// Theme Toggle Logic
themeToggleBtn.addEventListener('click', () => {
    isDay = !isDay;
    if (isDay) {
        document.body.classList.remove('theme-night');
        document.body.classList.add('theme-day');
    } else {
        document.body.classList.remove('theme-day');
        document.body.classList.add('theme-night');
    }
    setTimeout(initParticles, 100);
});

// Initialize Navigation
function initNav() {
    let isFirst = true;
    let firstPoem = null;
    let globalPoemIndex = 1;
    
    categories.forEach((category) => {
        let container = poemListEl;
        let details = null;
        
        if (categories.length > 1) {
            details = document.createElement('details');
            details.className = 'nav-category';
            
            const summary = document.createElement('summary');
            summary.textContent = category.title;
            details.appendChild(summary);
            container = details;
        }
        
        const ul = document.createElement('ul');
        ul.className = 'nav-category-list';
        
        category.poems.forEach((poem) => {
            if (isFirst) firstPoem = poem;
            
            const li = document.createElement('li');
            li.className = `nav-item ${isFirst ? 'active' : ''}`;
            
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = `${globalPoemIndex}. ${poem.title}`;
            globalPoemIndex++;
            a.onclick = (e) => {
                e.preventDefault();
                // Remove active class from all items
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                li.classList.add('active');
                loadPoem(poem);
            };
            
            li.appendChild(a);
            ul.appendChild(li);
            
            isFirst = false;
        });
        
        container.appendChild(ul);
        if (details) {
            poemListEl.appendChild(details);
        }
    });
    
    if (firstPoem) {
        loadPoem(firstPoem, true);
    }
}

function loadPoem(poem, initial = false) {
    if (!initial) {
        wrapperEl.classList.add('fading');
    }
    
    setTimeout(() => {
        titleEl.textContent = poem.title;
        subtitleEl.textContent = poem.subtitle || '';
        subtitleEl.style.display = poem.subtitle ? 'block' : 'none';
        
        if (poem.epigraph) {
            epigraphEl.innerHTML = poem.epigraph.replace(/\n/g, '<br>');
            epigraphEl.style.display = 'block';
        } else {
            epigraphEl.innerHTML = '';
            epigraphEl.style.display = 'none';
        }
        
        const stanzas = poem.text.split('\n\n').map(s => {
            const hasTab = s.startsWith('\t') || s.includes('\n\t');
            const lines = s.replace(/\t/g, '').replace(/\n/g, '<br>');
            if (/^\d+$/.test(lines.trim())) {
                return `<p class="stanza part-number">${lines}</p>`;
            }
            return `<p class="stanza${hasTab ? ' indented' : ''}">${lines}</p>`;
        }).join('');
        bodyEl.innerHTML = stanzas;
        
        dateEl.textContent = poem.date || '';
        
        if (poem.footnotes) {
            footnotesEl.innerHTML = poem.footnotes.replace(/\n/g, '<br>');
            footnotesEl.style.display = 'block';
        } else {
            footnotesEl.innerHTML = '';
            footnotesEl.style.display = 'none';
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        closeMobileMenu(); // Close sidebar on mobile after selecting a poem
        
        if (!initial) {
            wrapperEl.classList.remove('fading');
        }
    }, initial ? 0 : 400);
}

// --- Canvas Animation ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
let animationFrameId;

function getParticleColor() {
    const computedStyle = getComputedStyle(document.body);
    const color = computedStyle.getPropertyValue('--particle-color').trim();
    return color || (isDay ? '235, 175, 175' : '255, 255, 255');
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
    if (isDay) {
        // Day theme: movement from Version 2 Summer (drifting fireflies/petals)
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.2, // Drifting around, not falling
            alpha: Math.random() * 0.8 + 0.2,
            twinkleSpeed: 0.01 + Math.random() * 0.02,
            colorStr: colorStr
        };
    } else {
        // Night theme: speed and blinking from Version 1
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5,
            vx: 0,
            vy: -0.1, // Very slow movement upwards
            alpha: Math.random(),
            twinkleSpeed: 0.02 + Math.random() * 0.03, // Faster blink from V1
            colorStr: colorStr
        };
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
        ctx.beginPath();
        
        if (isDay) {
            // Day Theme: Drifting like V2 Summer
            p.x += p.vx;
            p.y += p.vy;
            
            ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
            p.alpha += p.twinkleSpeed;
            if (p.alpha > 0.8 || p.alpha < 0.2) p.twinkleSpeed = -p.twinkleSpeed;
            
            ctx.fillStyle = `rgba(${p.colorStr}, ${Math.abs(p.alpha)})`;
            ctx.shadowBlur = 0;
            
            // Wrap around
            if (p.y > height + 10) p.y = -10;
            if (p.y < -10) p.y = height + 10;
        } else {
            // Night Theme: Slow moving up and twinkling like V1
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            
            p.alpha += p.twinkleSpeed;
            if (p.alpha > 1 || p.alpha < 0.2) p.twinkleSpeed = -p.twinkleSpeed;
            
            p.x += p.vx;
            p.y += p.vy;
            
            ctx.fillStyle = `rgba(${p.colorStr}, ${Math.abs(p.alpha)})`;
            if (p.radius > 1) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = `rgba(${p.colorStr}, 0.8)`;
            } else {
                ctx.shadowBlur = 0;
            }
            
            // Wrap around (moving up)
            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }
        }
        
        ctx.fill();
        
        // Wrap X
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
    });
    
    animationFrameId = requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initParticles);

// Start
initNav();
setTimeout(initParticles, 100);

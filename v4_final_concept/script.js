const poems = [
    {
        title: 'Memento mori,',
        subtitle: 'альбо Чаму не хоча паміраць беларус',
        text: `Нават дзіўна: чакаю вечара\nЗ аксамітным зорным агнём,\nБыццам мне не хапае нечага\nГэтым жнівеньскім ясным днём.\n\nТам, далёка, ў касмічных высях\nПаляванне пачнуць Стральцы,\nІ Мядзведзіцы ў зорны прысак\nЗноў апусцяць свае каўшы.\n\nА з бясконцай Чумацкай Дарогі\nДанясецца зноў скрып палазоў –\nНевыказныя зыкі трывогі,\nАдгалоссе загадкавых слоў.\n\nНас завуць да сябе нашы продкі,\nЗапрашаюць у Вырай свой.\nІ штоночы іх сані-лодкі\nПрыплываюць за нечай душой.\n\nЯ яшчэ не магу, пачакайце,\nБолей часу мне мерыў лёс!..\nБацька, маці, даўжэй затрымайце\nЛя сябе майго лёсу воз…\n\nЛуг ля рэчкі яшчэ не скошаны,\nІ ля дома работы ёсць…\nВось на ганку прыступкі зношаны,\nА праз тыдзень у хату госць…\n\nНе трыбун, не палітык па званні,\nСвет не ўбачыць даўгоў маіх.\nАле ёсць і ў мяне абяцанні\nДля радні і сяброў сваіх…\n\nЦі пражыў я сваё, ці нацешыўся\nТым, што ў марах і ў планах было?\nІ ці здолеў я ўсіх усцешыць,\nШто са мною ішлі праз жыццё?\n\nЯ яшчэ не паспеў, пачакайце!\nБолей часу мне мерыў лёс…\nБацька, маці, даўжэй затрымайце\nЛя сябе мой апошні воз!\n\nСёння ўсё-ткі не збочыў з Дарогі,\nНе дайшоў той абоз да мяне…\nЗорка-знічка маёй трывогі\nДагарае ў рачной вадзе…\n\nЗрэдку думаем мы аб смерці\n( На зямлі ж нам не вечна быць! ),\nНе таму, каб спакойна памерці,\nДля таго, каб прыстойна жыць.`,
        date: '2005 г.'
    },
    {
        title: 'Фарбы восені',
        subtitle: '',
        text: `Самы багаты на колеры\nМесяц кастрычнік у нас.\nФарбамі ў садзе і ў полі\nВыткаўся дзіўны пейзаж.\n\nЯблыкаў чырвань у садзе.\nПожні зялёная рунь.\nПолымя жоўтых прысадаў –\nТонкіх бярозавых струн.\n\nБарва куста пры дарозе.\nНеба высокага сінь.\nЦёмныя дрэўцы ў аблозе\nГронак агністых рабін.\n\nЯрка-пунсовыя краскі\nДома пры родным акне.\nЗноў у чароўную казку\nДзіўная восень вядзе.\n\nБаль развітальны прыроды,\nСмутак і радасць зямлі.\nЖоўтых бяроз карагоды –\nДаўняга шчасця агні.`,
        date: 'Кастрычнік'
    },
    {
        title: 'Дарогамі Дзісеншчыны',
        subtitle: '',
        text: `Высокае неба над намі,\nЎ ім сонца, аблокі, прастор.\nІмчым мы крутымі шляхамі,\nІ неба нам сёння – шацёр.\n\nБяскрайнія побач абшары.\nУ квецені буйнай зямля.\nКустоўя зялёныя хмары,\nІ сініх лясоў паласа.\n\nСады, палісаднікі, хаты\nВясёлкавым ззяюць агнём.\nНапэўна, як госці, прыняты\nБылі б мы тут кожным дваром.\n\nІ хоць нетаропка, ды вечна\nПлыве побач з намі Дзісна.\nДа мора імкнецца спрадвечна\nЛюбімай радзімы рака.`,
        date: ''
    }
];

const poemListEl = document.getElementById('poem-list');
const titleEl = document.getElementById('poem-title');
const subtitleEl = document.getElementById('poem-subtitle');
const bodyEl = document.getElementById('poem-body');
const dateEl = document.getElementById('poem-date');
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
    poems.forEach((poem, index) => {
        const li = document.createElement('li');
        li.className = `nav-item ${index === 0 ? 'active' : ''}`;
        
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = poem.title;
        a.onclick = (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-list li').forEach(nav => nav.classList.remove('active'));
            li.classList.add('active');
            loadPoem(poem);
        };
        
        li.appendChild(a);
        poemListEl.appendChild(li);
    });
    
    if (poems.length > 0) {
        loadPoem(poems[0], true);
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
        
        const stanzas = poem.text.split('\n\n').map(s => `<p class="stanza">${s}</p>`).join('');
        bodyEl.innerHTML = stanzas;
        
        dateEl.textContent = poem.date || '';
        
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

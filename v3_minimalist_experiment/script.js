const poems = [
    {
        title: 'Memento mori,',
        text: `Нават дзіўна: чакаю вечара\nЗ аксамітным зорным агнём,\nБыццам мне не хапае нечага\nГэтым жнівеньскім ясным днём.\n\nТам, далёка, ў касмічных высях\nПаляванне пачнуць Стральцы,\nІ Мядзведзіцы ў зорны прысак\nЗноў апусцяць свае каўшы.\n\nА з бясконцай Чумацкай Дарогі\nДанясецца зноў скрып палазоў –\nНевыказныя зыкі трывогі,\nАдгалоссе загадкавых слоў.\n\nНас завуць да сябе нашы продкі,\nЗапрашаюць у Вырай свой.\nІ штоночы іх сані-лодкі\nПрыплываюць за нечай душой.\n\nЯ яшчэ не магу, пачакайце,\nБолей часу мне мерыў лёс!..\nБацька, маці, даўжэй затрымайце\nЛя сябе майго лёсу воз…\n\nЛуг ля рэчкі яшчэ не скошаны,\nІ ля дома работы ёсць…\nВось на ганку прыступкі зношаны,\nА праз тыдзень у хату госць…\n\nНе трыбун, не палітык па званні,\nСвет не ўбачыць даўгоў маіх.\nАле ёсць і ў мяне абяцанні\nДля радні і сяброў сваіх…\n\nЦі пражыў я сваё, ці нацешыўся\nТым, што ў марах і ў планах было?\nІ ці здолеў я ўсіх усцешыць,\nШто са мною ішлі праз жыццё?\n\nЯ яшчэ не паспеў, пачакайце!\nБолей часу мне мерыў лёс…\nБацька, маці, даўжэй затрымайце\nЛя сябе мой апошні воз!\n\nСёння ўсё-ткі не збочыў з Дарогі,\nНе дайшоў той абоз да мяне…\nЗорка-знічка маёй трывогі\nДагарае ў рачной вадзе…\n\nЗрэдку думаем мы аб смерці\n( На зямлі ж нам не вечна быць! ),\nНе таму, каб спакойна памерці,\nДля таго, каб прыстойна жыць.`,
        date: '2005 г.'
    },
    {
        title: 'Фарбы восені',
        text: `Самы багаты на колеры\nМесяц кастрычнік у нас.\nФарбамі ў садзе і ў полі\nВыткаўся дзіўны пейзаж.\n\nЯблыкаў чырвань у садзе.\nПожні зялёная рунь.\nПолымя жоўтых прысадаў –\nТонкіх бярозавых струн.\n\nБарва куста пры дарозе.\nНеба высокага сінь.\nЦёмныя дрэўцы ў аблозе\nГронак агністых рабін.\n\nЯрка-пунсовыя краскі\nДома пры родным акне.\nЗноў у чароўную казку\nДзіўная восень вядзе.\n\nБаль развітальны прыроды,\nСмутак і радасць зямлі.\nЖоўтых бяроз карагоды –\nДаўняга шчасця агні.`,
        date: 'Кастрычнік'
    },
    {
        title: 'Травы, ўспаміны, сны…',
        text: `Доўгія цёмныя цені\nКрэсляць зялёны луг.\nСонечных блёсткаў адценні\nТвораць чароўны круг.\n\nЛетняга вечара ціша.\nСонца ля дальняй мяжы.\nВетрык лагодны калыша\nТравы, ўспаміны, сны…\n\nЎсё гарманічна і проста,\nСветлай спавіта тугой:\nДзён нашых тайныя кросны\nДораць нам зрэдку спакой.\n\nКажуць, што ўсё паўтараецца,\nНедзе ўсплыве праз гады…\nХай і тады так злучаецца:\nТравы… Ўспаміны… Сны…`,
        date: 'Верасень 2006 г.'
    }
];

const poemListEl = document.getElementById('poem-list');
const titleEl = document.getElementById('poem-title');
const bodyEl = document.getElementById('poem-body');
const dateEl = document.getElementById('poem-date');
const wrapperEl = document.getElementById('poem-wrapper');
const themeToggleBtn = document.getElementById('theme-toggle');

// Theme Toggle Logic
let isDark = false;
themeToggleBtn.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
    } else {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
    }
});

// Initialize Navigation
function initNav() {
    poems.forEach((poem, index) => {
        const li = document.createElement('li');
        if (index === 0) li.classList.add('active');
        
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
        
        // Wrap first letter for drop cap? No need, CSS ::first-letter handles it
        // However, we need to ensure the stanzas are properly wrapped
        const stanzas = poem.text.split('\n\n').map(s => `<p class="stanza">${s}</p>`).join('');
        bodyEl.innerHTML = stanzas;
        
        dateEl.textContent = poem.date || '';
        
        if (!initial) {
            wrapperEl.classList.remove('fading');
        }
    }, initial ? 0 : 400); // Wait for fade out to complete
}

initNav();

const poems = [
    {
        title: 'Фарбы восені',
        subtitle: '',
        text: `Самы багаты на колеры\nМесяц кастрычнік у нас.\nФарбамі ў садзе і ў полі\nВыткаўся дзіўны пейзаж.\n\nЯблыкаў чырвань у садзе.\nПожні зялёная рунь.\nПолымя жоўтых прысадаў –\nТонкіх бярозавых струн.\n\nБарва куста пры дарозе.\nНеба высокага сінь.\nЦёмныя дрэўцы ў аблозе\nГронак агністых рабін.\n\nЯрка-пунсовыя краскі\nДома пры родным акне.\nЗноў у чароўную казку\nДзіўная восень вядзе.\n\nБаль развітальны прыроды,\nСмутак і радасць зямлі.\nЖоўтых бяроз карагоды –\nДаўняга шчасця агні.`,
        date: 'Кастрычнік'
    },
    {
        title: 'Memento mori,',
        subtitle: 'альбо Чаму не хоча паміраць беларус',
        text: `Нават дзіўна: чакаю вечара\nЗ аксамітным зорным агнём,\nБыццам мне не хапае нечага\nГэтым жнівеньскім ясным днём.\n\nТам, далёка, ў касмічных высях\nПаляванне пачнуць Стральцы,\nІ Мядзведзіцы ў зорны прысак\nЗноў апусцяць свае каўшы.\n\nА з бясконцай Чумацкай Дарогі\nДанясецца зноў скрып палазоў –\nНевыказныя зыкі трывогі,\nАдгалоссе загадкавых слоў.\n\nНас завуць да сябе нашы продкі,\nЗапрашаюць у Вырай свой.\nІ штоночы іх сані-лодкі\nПрыплываюць за нечай душой.\n\nЯ яшчэ не магу, пачакайце,\nБолей часу мне мерыў лёс!..\nБацька, маці, даўжэй затрымайце\nЛя сябе майго лёсу воз…\n\nЛуг ля рэчкі яшчэ не скошаны,\nІ ля дома работы ёсць…\nВось на ганку прыступкі зношаны,\nА праз тыдзень у хату госць…\n\nНе трыбун, не палітык па званні,\nСвет не ўбачыць даўгоў маіх.\nАле ёсць і ў мяне абяцанні\nДля радні і сяброў сваіх…\n\nЦі пражыў я сваё, ці нацешыўся\nТым, што ў марах і ў планах было?\nІ ці здолеў я ўсіх усцешыць,\nШто са мною ішлі праз жыццё?\n\nЯ яшчэ не паспеў, пачакайце!\nБолей часу мне мерыў лёс…\nБацька, маці, даўжэй затрымайце\nЛя сябе мой апошні воз!\n\nСёння ўсё-ткі не збочыў з Дарогі,\nНе дайшоў той абоз да мяне…\nЗорка-знічка маёй трывогі\nДагарае ў рачной вадзе…\n\nЗрэдку думаем мы аб смерці\n( На зямлі ж нам не вечна быць! ),\nНе таму, каб спакойна памерці,\nДля таго, каб прыстойна жыць.`,
        date: '2005 г., в. Зорка'
    },
    {
        title: 'Вось і зноў халады…',
        subtitle: '',
        text: `Вось і зноў халады…Над палямі маўклівымі\nЖуравоў клін самотны у вырай плыве.\nПрацінае душу адчуванне шчымлівае:\nНа іх крылах сплываюць апошнія мроі мае…\n\nВыпадкова прыходзім мы ў свет гэты белы,\nАбжываем яго пачуццём трапяткім.\nА ў юнацтве пасля называем ўжо смела\nГэты свет непаўторным, адзіным, сваім.\n\nМаладыя гады абяцаюць так многа…\nУсё хочацца бачыць у полымі зор.\nХоць адорыць жыццё нас і скупа і строга,\nЗастануцца жаданымі воля, надзея, прастор.\n\nСаграваюць душу нам іскрынкі надзеі,\nШто зайграюць фанфары ў часы перамог,\nШто дасць лёс нам узлёт, вышыню і падзеі,\nІ бязмежную волю шчаслівых дарог.\n\nПралятаюць гады. Іх пражыта нямала.\nЗа смугою гадоў наш юнацкі парог.\nДзякуй лёсу за ўсё, і прасі, каб душа не праспала\nВышыню, і узлёт, і бязмежную волю дарог.\n\nАдыйшло, адцвіло, адарвалася крыгай,\nМнога мараў заглухла ў чаканні пустым…\nЧас збірацца і нам ў недалёкі ўжо вырай.\nЦягам часу мы сыйдзем туды па адным…\n\nВось і зноў халады…Над палямі маўклівымі\nЖуравоў клін самотны у вырай плыве.\nПрацінае душу адчуванне шчымлівае:\nАдплываюць у вечнасць спадзевы мае…`,
        date: ''
    }
];

const poemListEl = document.getElementById('poem-list');
const titleEl = document.getElementById('poem-title');
const subtitleEl = document.getElementById('poem-subtitle');
const bodyEl = document.getElementById('poem-body');
const dateEl = document.getElementById('poem-date');
const wrapperEl = document.getElementById('poem-wrapper');

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
        subtitleEl.textContent = poem.subtitle || '';
        subtitleEl.style.display = poem.subtitle ? 'block' : 'none';
        
        const stanzas = poem.text.split('\n\n').map(s => `<p class="stanza">${s}</p>`).join('');
        bodyEl.innerHTML = stanzas;
        
        // Add random slight rotation to handwriting to make it look authentic
        if (poem.date) {
            dateEl.textContent = poem.date;
            dateEl.style.transform = \`rotate(\${Math.random() * 4 - 2}deg)\`;
        } else {
            dateEl.textContent = '';
        }
        
        if (!initial) {
            // Smoothly bring it back in (mimicking turning page)
            wrapperEl.classList.remove('fading');
        }
    }, initial ? 0 : 500); // 500ms should match the CSS transition duration
}

document.addEventListener('DOMContentLoaded', initNav);

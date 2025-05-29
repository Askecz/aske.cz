// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameSearchInput = document.getElementById('gameSearchInput');
    const searchItemButtons = document.querySelectorAll('.search-item-btn'); // Nová tlačítka pro typy
    const searchSourceButtons = document.querySelectorAll('.search-source-btn');
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const searchButton = document.getElementById('searchBtn');

    let currentSearchTerm = 'Trophy Guide'; // Default search term (první tlačítko z nové kategorie)
    let currentLanguage = 'en'; // Default language
    let currentTheme = 'dark'; // Default theme

    const translations = {
        en: {
            pageTitle: "GAME CONTENT SEARCH", // Upraveno
            mainHeading: "GAME CONTENT SEARCH", // Upraveno
            searchInputPlaceholder: "Enter game title...", // Upraveno
            searchButtonText: "Search",
            languageSelector: "Language:",
            themeSelector: "Theme:",
            darkThemeText: "Dark",
            lightThemeText: "Light",
            // Překlady pro nové nadpisy kategorií
            categoryEndingsStory: "Endings, Story & Characters",
            categoryLoreCollectibles: "Collectibles & Lore",
            categoryUpgradesProgression: "Upgrades & Progression",
            categoryCompletionChallenges: "Completion & Challenges",
            categoryGuidesMaps: "Guides, Maps & Quests",
            selectSearchSource: "Select Search Source:"
        },
        cs: {
            pageTitle: "Vyhledávač herního obsahu",
            mainHeading: "Vyhledávač herního obsahu",
            searchInputPlaceholder: "Zadejte název hry...",
            searchButtonText: "Vyhledat",
            languageSelector: "Jazyk:",
            themeSelector: "Motiv:",
            darkThemeText: "Tmavý",
            lightThemeText: "Světlý",
            categoryEndingsStory: "Konce, Příběh & Postavy",
            categoryLoreCollectibles: "Sběratelské předměty & Příběhové pozadí",
            categoryUpgradesProgression: "Vylepšení & Progrese",
            categoryCompletionChallenges: "Dokončení & Výzvy",
            categoryGuidesMaps: "Návody, Mapy & Úkoly",
            selectSearchSource: "Vyberte zdroj hledání:"
        },
        de: {
            pageTitle: "Spielinhalte-Suche",
            mainHeading: "Spielinhalte-Suche",
            searchInputPlaceholder: "Spieltitel eingeben...",
            searchButtonText: "Suchen",
            languageSelector: "Sprache:",
            themeSelector: "Thema:",
            darkThemeText: "Dunkel",
            lightThemeText: "Hell",
            categoryEndingsStory: "Enden, Geschichte & Charaktere",
            categoryLoreCollectibles: "Sammlerstücke & Lore",
            categoryUpgradesProgression: "Upgrades & Fortschritt",
            categoryCompletionChallenges: "Abschluss & Herausforderungen",
            categoryGuidesMaps: "Anleitungen, Karten & Quests",
            selectSearchSource: "Suchquelle auswählen:"
        }
    };

    function performSearch(source) {
        const query = gameSearchInput.value.trim();
        let url = '';

        if (!query) {
            // Použijeme přeložený placeholder, pokud je query prázdné
            alert(translations[currentLanguage].searchInputPlaceholder);
            return;
        }

        // currentSearchTerm je již v angličtině díky data-search-term
        const searchTermInEnglish = currentSearchTerm;

        switch (source) {
            case 'google':
                url = `https://www.google.com/search?q=${encodeURIComponent(query + ' ' + searchTermInEnglish)}`;
                if (searchTermInEnglish === "Videos") { // Speciální případ pro videa na Google
                    url = `https://www.google.com/search?q=${encodeURIComponent(query + ' ' + searchTermInEnglish)}&tbm=vid`;
                }
                break;
            case 'youtube':
                 // Pro YouTube vždy kombinujeme název hry a typ obsahu
                url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' ' + searchTermInEnglish)}`;
                break;
            case 'psnprofiles':
                // PSNProfiles hledá primárně hry, přidání specifického termínu nemusí být efektivní
                url = `https://psnprofiles.com/search/games?q=${encodeURIComponent(query)}`;
                break;
            case 'powerpyx':
                // PowerPyx má vlastní vyhledávání, kombinace může fungovat
                url = `https://www.powerpyx.com/?s=${encodeURIComponent(query + ' ' + searchTermInEnglish.replace(/\s+/g, '+'))}`;
                break;
            case 'truetrophies':
                // TrueTrophies také primárně hry
                url = `https://www.truetrophies.com/searchresults.aspx?search=${encodeURIComponent(query)}`;
                break;
            default: // Fallback na Google
                url = `https://www.google.com/search?q=${encodeURIComponent(query + ' ' + searchTermInEnglish)}`;
                break;
        }
        window.open(url, '_blank');
    }

    function applyTranslations(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translations[lang][key];
                } else if (element.tagName === 'TITLE') {
                    document.title = translations[lang][key];
                }
                // Pro text v tlačítkách a span, ale ne pro .search-item-btn span.btn-text (ty jsou pevně anglicky)
                else if (!element.closest('.search-item-btn') && (element.tagName === 'SPAN' || element.tagName === 'BUTTON' || element.tagName === 'H1' || element.tagName === 'H3')) {
                     if (element.classList.contains('color-box')) { // Nevpisuj text do color-box
                        return;
                    }
                    // Ujisti se, že neměníme text tlačítek s ikonami, pokud mají vlastní span pro text
                    const textSpan = element.querySelector('span:not(.color-box)');
                    if (textSpan && !textSpan.classList.contains('btn-text')) { // .btn-text je anglicky
                        textSpan.textContent = translations[lang][key];
                    } else if (!element.querySelector('span')) { // Pokud nemá vnořený span, nastav textContent přímo
                        element.textContent = translations[lang][key];
                    }
                } else {
                     // Pro ostatní elementy (např. H1, H3, popisky u jazyka/tématu)
                    element.textContent = translations[lang][key];
                }
            }
        });
        // Fix pro tlačítka jazyků, aby vždy ukazovala zkratku
        document.querySelector('.lang-btn[data-lang="en"]').textContent = "ENG";
        document.querySelector('.lang-btn[data-lang="cs"]').textContent = "CS";
        document.querySelector('.lang-btn[data-lang="de"]').textContent = "DE";
    }


    function applyTheme(theme) {
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(`${theme}-theme`);
    }

    // --- Initial Setup ---
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
    });
    

    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        currentTheme = savedTheme;
    } else {
        currentTheme = 'dark'; // Default na dark
        localStorage.setItem('selectedTheme', currentTheme);
    }
    applyTheme(currentTheme);
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === currentTheme);
    });

    // Nastavení výchozího aktivního tlačítka pro typ vyhledávání a zdroj
    // Aktivujeme první .search-item-btn jako výchozí
    const firstSearchItemButton = document.querySelector('.search-item-btn');
    if (firstSearchItemButton) {
        firstSearchItemButton.classList.add('active');
        currentSearchTerm = firstSearchItemButton.dataset.searchTerm;
    }

    const defaultSourceButton = document.querySelector('.search-source-btn.google');
    if (defaultSourceButton) {
        defaultSourceButton.classList.add('active');
    }
    applyTranslations(currentLanguage); // Aplikujeme překlady po všem ostatním

    // --- Event Listeners ---
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLanguage = button.dataset.lang;
            localStorage.setItem('selectedLanguage', currentLanguage);
            applyTranslations(currentLanguage);
        });
    });

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentTheme = button.dataset.theme;
            localStorage.setItem('selectedTheme', currentTheme);
            applyTheme(currentTheme);
        });
    });

    searchItemButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchItemButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentSearchTerm = button.dataset.searchTerm;
        });
    });

    searchSourceButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchSourceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Není potřeba měnit searchTerm, ten je určený searchItemButtons
        });
    });

    searchButton.addEventListener('click', () => {
        const activeSourceButton = document.querySelector('.search-source-btn.active');
        let source = 'google'; // Default source

        if (activeSourceButton) {
            source = activeSourceButton.dataset.source;
        }
        performSearch(source);
    });

    gameSearchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Zabrání odeslání formuláře, pokud by byl input v něm
            const activeSourceButton = document.querySelector('.search-source-btn.active');
            let source = 'google';

            if (activeSourceButton) {
                source = activeSourceButton.dataset.source;
            }
            performSearch(source);
        }
    });
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameSearchInput = document.getElementById('gameSearchInput');
    const searchTypeButtons = document.querySelectorAll('.search-type-btn');
    const searchSourceButtons = document.querySelectorAll('.search-source-btn');
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const searchButton = document.getElementById('searchBtn');

    let currentSearchTerm = 'Trophy'; // Default search term
    let currentLanguage = 'en'; // Default language
    let currentTheme = 'dark'; // Default theme

    // Object for translations
    const translations = {
        en: {
            pageTitle: "PLAYSTATION TROPHY SEARCH",
            mainHeading: "PLAYSTATION TROPHY SEARCH",
            searchInputPlaceholder: "Enter game title or trophy name...",
            selectSearchType: "Select Search Type:",
            trophyBtn: "Trophy",
            guideBtn: "Trophy Guide",
            mapBtn: "Maps",
            collectiblesBtn: "Collectibles",
            videoBtn: "Videos",
            selectSearchSource: "Select Search Source:",
            searchButtonText: "Search",
            languageSelector: "Language:",
            themeSelector: "Theme:",
            darkThemeText: "Dark",
            lightThemeText: "Light"
        },
        cs: {
            pageTitle: "Vyhledávač PlayStation trofejí",
            mainHeading: "Vyhledávač PlayStation trofejí",
            searchInputPlaceholder: "Zadejte název hry nebo trofeje...",
            selectSearchType: "Vyberte typ hledání:",
            trophyBtn: "Trofej",
            guideBtn: "Celý průvodce",
            mapBtn: "Mapy",
            collectiblesBtn: "Sběratelské věci",
            videoBtn: "Videa",
            selectSearchSource: "Vyberte zdroj hledání:",
            searchButtonText: "Vyhledat",
            languageSelector: "Jazyk:",
            themeSelector: "Motiv:",
            darkThemeText: "Tmavý",
            lightThemeText: "Světlý"
        },
        de: {
            pageTitle: "PlayStation Trophäen-Suchmaschine",
            mainHeading: "PlayStation Trophäen-Suchmaschine",
            searchInputPlaceholder: "Spiel- oder Trophäenname eingeben...",
            selectSearchType: "Suchtyp auswählen:",
            trophyBtn: "Trophäe",
            guideBtn: "Kompletter Leitfaden",
            mapBtn: "Karten",
            collectiblesBtn: "Sammelobjekte",
            videoBtn: "Videos",
            selectSearchSource: "Suchquelle auswählen:",
            searchButtonText: "Suchen",
            languageSelector: "Sprache:",
            themeSelector: "Thema:",
            darkThemeText: "Dunkel",
            lightThemeText: "Hell"
        }
    };

    function performSearch(source) {
        const query = gameSearchInput.value.trim();
        let url = '';

        if (!query) {
            alert(translations[currentLanguage].searchInputPlaceholder);
            return;
        }

        switch (source) {
            case 'google':
                if (currentSearchTerm === "video") {
                    url = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=vid`;
                } else if (currentSearchTerm === "Full Map") {
                    url = `https://www.google.com/search?q=${encodeURIComponent(query + ' Full Map')}`;
                } else if (currentSearchTerm === "All collectibles") {
                    url = `https://www.google.com/search?q=${encodeURIComponent(query + ' All collectibles')}`;
                } else {
                    url = `https://www.google.com/search?q=${encodeURIComponent(query + ' ' + currentSearchTerm)}`;
                }
                break;
            case 'psnprofiles':
                url = `https://psnprofiles.com/search/games?q=${encodeURIComponent(query)}`;
                break;
            case 'powerpyx':
                url = `https://www.powerpyx.com/?s=${encodeURIComponent(query)}`;
                break;
            case 'truetrophies':
                url = `https://www.truetrophies.com/searchresults.aspx?search=${encodeURIComponent(query)}`;
                break;
            case 'youtube':
                // Upravená logika pro YouTube vyhledávání
                if (currentSearchTerm === "video") {
                    url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' Trophy')}`;
                } else if (currentSearchTerm === "Full Map") {
                    url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' Maps')}`;
                } else if (currentSearchTerm === "All collectibles") {
                    url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' All collectibles')}`;
                } else if (currentSearchTerm === "Trophy Guide") {
                    url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' Trophy Guide')}`;
                } else {
                    url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' ' + currentSearchTerm)}`;
                }
                break;
            default:
                url = `https://www.google.com/search?q=${encodeURIComponent(query + ' ' + currentSearchTerm)}`;
                break;
        }
        window.open(url, '_blank');
    }

    function applyTranslations(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[lang][key]);
                } else if (element.tagName === 'SPAN' || element.tagName === 'BUTTON') {
                    if (element.classList.contains('color-box')) {
                        return;
                    }
                    element.textContent = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
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
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    applyTranslations(currentLanguage);

    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        currentTheme = 'dark';
        localStorage.setItem('selectedTheme', currentTheme);
    }

    applyTheme(currentTheme);
    themeButtons.forEach(btn => {
        if (btn.dataset.theme === currentTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    document.getElementById('trophyBtn').classList.add('active');
    document.querySelector('.search-source-btn.google').classList.add('active');

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

    searchTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentSearchTerm = button.dataset.searchTerm;
        });
    });

    searchSourceButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchSourceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    searchButton.addEventListener('click', () => {
        const activeSourceButton = document.querySelector('.search-source-btn.active');
        let source = 'google';

        if (activeSourceButton) {
            source = activeSourceButton.dataset.source;
        }
        performSearch(source);
    });

    gameSearchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const activeSourceButton = document.querySelector('.search-source-btn.active');
            let source = 'google';

            if (activeSourceButton) {
                source = activeSourceButton.dataset.source;
            }
            performSearch(source);
        }
    });
});
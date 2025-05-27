// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameSearchInput = document.getElementById('gameSearchInput');
    const trophyNameInput = document.getElementById('trophyNameInput');
    const searchTypeButtons = document.querySelectorAll('.search-type-btn');
    const searchSourceButtons = document.querySelectorAll('.search-source-btn');
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const searchButton = document.getElementById('searchBtn');
    const layoutButtons = document.querySelectorAll('.layout-btn'); // Nové tlačítko pro rozložení

    let currentSearchTerm = 'trophy'; // Default search term
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default language, retrieve from localStorage
    let currentTheme = localStorage.getItem('selectedTheme') || 'dark'; // Default theme, retrieve from localStorage
    let currentLayout = localStorage.getItem('selectedLayout') || 'grid'; // Default layout, retrieve from localStorage

    // Object for translations
    const translations = {
        en: {
            pageTitle: "PlayStation Trophy Search",
            mainHeading: "PlayStation Trophy Search",
            searchInputPlaceholder: "Enter game title...",
            trophyInputPlaceholder: "Enter specific trophy/achievement name (optional)...",
            searchButtonText: "Search",
            selectSearchType: "Select Search Type:",
            trophyBtn: "Trophy",
            roadmapBtn: "Roadmap & Guide",
            collectiblesBtn: "Collectibles",
            notesBtn: "Notes",
            mapBtn: "Maps",
            weaponsBtn: "Weapons",
            upgradesBtn: "Upgrades",
            speedrunBtn: "Speedrun",
            allQuestsBtn: "All Quests",
            allSideQuestsBtn: "All Side Quests",
            hardestDifficultyBtn: "Hardest Difficulty",
            specificTrophyBtn: "Specific Trophy",
            videosGeneralBtn: "Videos (General)",
            selectSearchSource: "Select Search Source:",
            googleBtn: "Google",
            psnprofilesBtn: "PSNProfiles",
            powerpyxBtn: "PowerPyx",
            truetrophiesBtn: "TrueTrophies",
            youtubeBtn: "YouTube",
            languageSelector: "Language:",
            themeSelector: "Theme:",
            layoutSelector: "Layout:", // Nový text pro rozložení
            gridLayoutText: "Grid",    // Nový text pro mřížkové rozložení
            columnLayoutText: "Columns"// Nový text pro sloupcové rozložení
        },
        cs: {
            pageTitle: "Vyhledávač PlayStation trofejí",
            mainHeading: "Vyhledávač PlayStation trofejí",
            searchInputPlaceholder: "Zadejte název hry...",
            trophyInputPlaceholder: "Zadejte název konkrétní trofeje/achievementu (volitelné)...",
            searchButtonText: "Hledat",
            selectSearchType: "Vyberte typ hledání:",
            trophyBtn: "Trofej",
            roadmapBtn: "Roadmapa & Průvodce",
            collectiblesBtn: "Sběratelské předměty",
            notesBtn: "Poznámky",
            mapBtn: "Mapy",
            weaponsBtn: "Zbraně",
            upgradesBtn: "Vylepšení",
            speedrunBtn: "Speedrun",
            allQuestsBtn: "Všechny úkoly",
            allSideQuestsBtn: "Všechny vedlejší úkoly",
            hardestDifficultyBtn: "Nejtěžší obtížnost",
            specificTrophyBtn: "Konkrétní trofej",
            videosGeneralBtn: "Videa (obecné)",
            selectSearchSource: "Vyberte zdroj hledání:",
            googleBtn: "Google",
            psnprofilesBtn: "PSNProfiles",
            powerpyxBtn: "PowerPyx",
            truetrophiesBtn: "TrueTrophies",
            youtubeBtn: "YouTube",
            languageSelector: "Jazyk:",
            themeSelector: "Vzhled:",
            layoutSelector: "Rozložení:", // Nový text pro rozložení
            gridLayoutText: "Mřížka",    // Nový text pro mřížkové rozložení
            columnLayoutText: "Sloupce"  // Nový text pro sloupcové rozložení
        },
        de: {
            pageTitle: "PlayStation Trophäen-Suche",
            mainHeading: "PlayStation Trophäen-Suche",
            searchInputPlaceholder: "Spieltitel eingeben...",
            trophyInputPlaceholder: "Spezifischen Trophäen-/Errungenschaftsnamen eingeben (optional)...",
            searchButtonText: "Suchen",
            selectSearchType: "Suchtyp auswählen:",
            trophyBtn: "Trophäe",
            roadmapBtn: "Roadmap & Leitfaden",
            collectiblesBtn: "Sammelobjekte",
            notesBtn: "Notizen",
            mapBtn: "Karten",
            weaponsBtn: "Waffen",
            upgradesBtn: "Upgrades",
            speedrunBtn: "Speedrun",
            allQuestsBtn: "Alle Quests",
            allSideQuestsBtn: "Alle Nebenquests",
            hardestDifficultyBtn: "Schwierigster Schwierigkeitsgrad",
            specificTrophyBtn: "Spezifische Trophäe",
            videosGeneralBtn: "Videos (Allgemein)",
            selectSearchSource: "Suchquelle auswählen:",
            googleBtn: "Google",
            psnprofilesBtn: "PSNProfiles",
            powerpyxBtn: "PowerPyx",
            truetrophiesBtn: "TrueTrophies",
            youtubeBtn: "YouTube",
            languageSelector: "Sprache:",
            themeSelector: "Design:",
            layoutSelector: "Layout:", // Nový text pro rozložení
            gridLayoutText: "Raster",    // Nový text pro mřížkové rozložení
            columnLayoutText: "Spalten"  // Nový text pro sloupcové rozložení
        }
    };

    // Function to apply translations
    function applyTranslations() {
        const elements = document.querySelectorAll('[data-lang-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[currentLanguage][key]);
                } else if (element.tagName === 'TITLE') {
                    document.title = translations[currentLanguage][key];
                } else {
                    element.textContent = translations[currentLanguage][key];
                }
            }
        });
    }

    // Function to set the active state for buttons
    function setActiveButton(buttons, activeValue) {
        buttons.forEach(button => {
            if (button.dataset.lang === activeValue || button.dataset.theme === activeValue || button.dataset.layout === activeValue) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Apply saved language and theme on load
    applyTranslations();
    setActiveButton(langButtons, currentLanguage);
    document.body.classList.add(`${currentTheme}-theme`);
    setActiveButton(themeButtons, currentTheme);

    // Apply saved layout on load
    const searchOptionsGrid = document.querySelector('.search-options-grid');
    if (currentLayout === 'columns') {
        searchOptionsGrid.classList.add('columns-layout');
    }
    setActiveButton(layoutButtons, currentLayout);


    // Language selection
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentLanguage = button.dataset.lang;
            localStorage.setItem('selectedLanguage', currentLanguage);
            applyTranslations();
            setActiveButton(langButtons, currentLanguage);
        });
    });

    // Theme selection
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newTheme = button.dataset.theme;
            if (newTheme !== currentTheme) {
                document.body.classList.remove(`${currentTheme}-theme`);
                document.body.classList.add(`${newTheme}-theme`);
                currentTheme = newTheme;
                localStorage.setItem('selectedTheme', currentTheme);
                setActiveButton(themeButtons, currentTheme);
            }
        });
    });

    // Layout selection
    layoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newLayout = button.dataset.layout;
            if (newLayout !== currentLayout) {
                if (newLayout === 'columns') {
                    searchOptionsGrid.classList.add('columns-layout');
                } else {
                    searchOptionsGrid.classList.remove('columns-layout');
                }
                currentLayout = newLayout;
                localStorage.setItem('selectedLayout', currentLayout);
                setActiveButton(layoutButtons, currentLayout);
            }
        });
    });


    // Search type selection
    searchTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all search type buttons
            searchTypeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to the clicked button
            button.classList.add('active');
            currentSearchTerm = button.dataset.searchTerm;

            // Show/hide trophyNameInput based on search term
            if (currentSearchTerm === 'specific_trophy') {
                trophyNameInput.style.display = 'block';
            } else {
                trophyNameInput.style.display = 'none';
                trophyNameInput.value = ''; // Clear trophy name input
            }
        });
    });

    // Set default active search type button (Trophy)
    searchTypeButtons.forEach(button => {
        if (button.dataset.searchTerm === 'trophy') {
            button.classList.add('active');
        }
    });

    // Search source selection (allow multiple)
    searchSourceButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
        });
    });

    // Set default active search source button (Google)
    searchSourceButtons.forEach(button => {
        if (button.dataset.source === 'google') {
            button.classList.add('active');
        }
    });

    // Search button click handler
    searchButton.addEventListener('click', () => {
        const gameTitle = gameSearchInput.value.trim();
        const trophyName = trophyNameInput.value.trim();
        const selectedSources = Array.from(searchSourceButtons)
                                    .filter(button => button.classList.contains('active'))
                                    .map(button => button.dataset.source);

        if (!gameTitle) {
            alert(translations[currentLanguage].searchInputPlaceholder); // Use translation for alert
            return;
        }

        if (selectedSources.length === 0) {
            alert(translations[currentLanguage].selectSearchSource); // Use translation for alert
            return;
        }

        let searchQuery = `${gameTitle} ${translations[currentLanguage][currentSearchTerm + 'Btn']}`; // Use translated term
        if (currentSearchTerm === 'specific_trophy' && trophyName) {
            searchQuery = `${gameTitle} ${trophyName} ${translations[currentLanguage].trophyBtn}`; // Specific trophy search
        } else if (currentSearchTerm === 'trophy') {
             searchQuery = `${gameTitle} ${translations[currentLanguage].trophyBtn}`;
        }


        let urls = [];
        selectedSources.forEach(source => {
            let encodedQuery = encodeURIComponent(searchQuery);
            switch (source) {
                case 'google':
                    urls.push(`https://www.google.com/search?q=${encodedQuery}`);
                    break;
                case 'psnprofiles':
                    urls.push(`https://psnprofiles.com/search/games?q=${encodeURIComponent(gameTitle)}`); // PSNProfiles search game directly
                    break;
                case 'powerpyx':
                    urls.push(`https://www.powerpyx.com/?s=${encodedQuery}`); // PowerPyx search general
                    break;
                case 'truetrophies':
                    urls.push(`https://www.truetrophies.com/search/games?search=${encodeURIComponent(gameTitle)}`); // TrueTrophies search game directly
                    break;
                case 'youtube':
                    urls.push(`https://www.youtube.com/results?search_query=${encodedQuery}`);
                    break;
            }
        });

        urls.forEach(url => window.open(url, '_blank'));
    });
});

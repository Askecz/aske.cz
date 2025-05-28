// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameSearchInput = document.getElementById('gameSearchInput');
    const trophyNameInput = document.getElementById('trophyNameInput');
    const searchTypeButtons = document.querySelectorAll('.search-type-btn');
    const searchSourceButtons = document.querySelectorAll('.search-source-btn');
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const searchButton = document.getElementById('searchBtn');
    const layoutButtons = document.querySelectorAll('.layout-btn');

    let currentSearchTerm = 'trophy'; // Default search term
    let currentSearchSource = 'google'; // Default search source (only one allowed now)
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default language, retrieve from localStorage
    let currentTheme = localStorage.getItem('selectedTheme') || 'dark'; // Default theme, retrieve from localStorage
    let currentLayout = localStorage.getItem('selectedLayout') || 'grid'; // Default layout, retrieve from localStorage

    // Object for translations (DE removed)
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
            // videosGeneralBtn: "Videos (General)", // Removed
            selectSearchSource: "Select Search Source:",
            googleBtn: "Google",
            psnprofilesBtn: "PSNProfiles",
            powerpyxBtn: "PowerPyx",
            truetrophiesBtn: "TrueTrophies",
            youtubeBtn: "YouTube",
            languageSelector: "Language:",
            themeSelector: "Theme:",
            layoutSelector: "Layout:",
            gridLayoutText: "Grid",
            columnLayoutText: "Columns",
            darkThemeText: "Dark",
            lightThemeText: "Light"
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
            // videosGeneralBtn: "Videa (obecné)", // Removed
            selectSearchSource: "Vyberte zdroj hledání:",
            googleBtn: "Google",
            psnprofilesBtn: "PSNProfiles",
            powerpyxBtn: "PowerPyx",
            truetrophiesBtn: "TrueTrophies",
            youtubeBtn: "YouTube",
            languageSelector: "Jazyk:",
            themeSelector: "Vzhled:",
            layoutSelector: "Rozložení:",
            gridLayoutText: "Mřížka",
            columnLayoutText: "Sloupce",
            darkThemeText: "Tmavý",
            lightThemeText: "Světlý"
        }
    };

    // Mapping pro anglické vyhledávací termíny (pro Google a PowerPyx)
    const englishSearchTerms = {
        trophy: "trophy",
        roadmap: "roadmap & guide",
        collectibles: "collectibles",
        notes: "notes",
        maps: "maps",
        weapons: "weapons",
        upgrades: "upgrades",
        speedrun: "speedrun",
        all_quests: "all quests",
        all_side_quests: "all side quests",
        hardest_difficulty: "hardest difficulty",
        specific_trophy: "trophy", // For specific trophy, we'll use "trophy" in the search query
        // videos_general: "videos" // Removed
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
    function setActiveButton(buttons, activeValue, dataAttribute) {
        buttons.forEach(button => {
            if (button.dataset[dataAttribute] === activeValue) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Apply saved language, theme and layout on load
    applyTranslations();
    setActiveButton(langButtons, currentLanguage, 'lang');
    document.body.classList.add(`${currentTheme}-theme`);
    setActiveButton(themeButtons, currentTheme, 'theme');

    const searchOptionsContainer = document.querySelector('.search-options-container');
    if (currentLayout === 'columns') {
        searchOptionsContainer.classList.add('columns-layout');
    }
    setActiveButton(layoutButtons, currentLayout, 'layout');


    // Language selection
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentLanguage = button.dataset.lang;
            localStorage.setItem('selectedLanguage', currentLanguage);
            applyTranslations();
            setActiveButton(langButtons, currentLanguage, 'lang');
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
                setActiveButton(themeButtons, currentTheme, 'theme');
            }
        });
    });

    // Layout selection
    layoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newLayout = button.dataset.layout;
            if (newLayout !== currentLayout) {
                if (newLayout === 'columns') {
                    searchOptionsContainer.classList.add('columns-layout');
                } else {
                    searchOptionsContainer.classList.remove('columns-layout');
                }
                currentLayout = newLayout;
                localStorage.setItem('selectedLayout', currentLayout);
                setActiveButton(layoutButtons, currentLayout, 'layout');
            }
        });
    });


    // Search type selection
    searchTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentSearchTerm = button.dataset.searchTerm;

            if (currentSearchTerm === 'specific_trophy') {
                trophyNameInput.style.display = 'block';
            } else {
                trophyNameInput.style.display = 'none';
                trophyNameInput.value = '';
            }
        });
    });

    // Set default active search type button (Trophy)
    searchTypeButtons.forEach(button => {
        if (button.dataset.searchTerm === 'trophy') {
            button.classList.add('active');
        }
    });

    // Search source selection (only one allowed)
    searchSourceButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchSourceButtons.forEach(btn => btn.classList.remove('active')); // Remove active from all
            button.classList.add('active'); // Add active to the clicked one
            currentSearchSource = button.dataset.source;
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

        if (!gameTitle) {
            alert(translations[currentLanguage].searchInputPlaceholder);
            return;
        }

        let searchQuery = `${gameTitle}`;
        const englishTerm = englishSearchTerms[currentSearchTerm]; // Always use English term for search query

        if (currentSearchTerm === 'specific_trophy' && trophyName) {
            searchQuery += ` ${trophyName} ${englishTerm}`; // Game Title + Trophy Name + "trophy"
        } else if (englishTerm) {
            searchQuery += ` ${englishTerm}`; // Game Title + English search term (e.g., "trophy", "roadmap & guide")
        }


        let url = '';
        const encodedQuery = encodeURIComponent(searchQuery);
        const encodedGameTitle = encodeURIComponent(gameTitle);

        switch (currentSearchSource) {
            case 'google':
                url = `https://www.google.com/search?q=${encodedQuery}`;
                break;
            case 'psnprofiles':
                url = `https://psnprofiles.com/search/games?q=${encodedGameTitle}`;
                break;
            case 'powerpyx':
                url = `https://www.powerpyx.com/?s=${encodedQuery}`; // PowerPyx generally handles combined query well
                break;
            case 'truetrophies':
                // TrueTrophies requires a specific search URL for games
                // The search query itself is appended after 'search='
                url = `https://www.truetrophies.com/search/games?search=${encodedGameTitle}`;
                break;
            case 'youtube':
                url = `https://www.youtube.com/results?search_query=${encodedQuery}`;
                break;
        }

        if (url) {
            window.open(url, '_blank');
        }
    });
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameSearchInput = document.getElementById('gameSearchInput');
    const trophyNameInput = document.getElementById('trophyNameInput');
    const searchTypeButtons = document.querySelectorAll('.search-type-btn');
    const searchSourceButtons = document.querySelectorAll('.search-source-btn');
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const searchButton = document.getElementById('searchBtn');

    let currentSearchTerm = 'trophy'; // Default search term
    let currentLanguage = 'en'; // Default language
    let currentTheme = 'dark'; // Default theme

    // Object for translations
    const translations = {
        en: {
            pageTitle: "PlayStation Trophy Search",
            mainHeading: "PlayStation Trophy Search",
            searchInputPlaceholder: "Enter game title...",
            trophyInputPlaceholder: "Enter specific trophy/achievement name (optional)...",
            selectSearchType: "Select Search Type:",
            trophyBtn: "Trophy",
            roadmapBtn: "Roadmap & Guide",
            collectiblesBtn: "Collectibles",
            notesBtn: "Notes / Lore",
            mapBtn: "Maps",
            weaponsBtn: "Weapons",
            upgradesBtn: "Upgrades",
            speedrunBtn: "Speedrun Guide",
            allQuestsBtn: "All Main Quests",
            allSideQuestsBtn: "All Side Quests",
            hardestDifficultyBtn: "Hardest Difficulty",
            specificTrophyBtn: "Specific Trophy",
            videosGeneralBtn: "Videos (General)",
            selectSearchSource: "Select Search Source:",
            searchButtonText: "Search",
            languageSelector: "Language:",
            themeSelector: "Theme:",
            darkThemeText: "Dark",
            lightThemeText: "Light",
            alertGameName: "Please enter a game name.",
            alertTrophyName: "Please enter a trophy/achievement name for this search."
        },
        cs: {
            pageTitle: "Vyhledávač PlayStation trofejí",
            mainHeading: "Vyhledávač PlayStation trofejí",
            searchInputPlaceholder: "Zadejte název hry...",
            trophyInputPlaceholder: "Zadejte název konkrétní trofeje/achievementu (volitelné)...",
            selectSearchType: "Vyberte typ hledání:",
            trophyBtn: "Trofej",
            roadmapBtn: "Roadmap & Průvodce",
            collectiblesBtn: "Sběratelské předměty",
            notesBtn: "Poznámky / Lore",
            mapBtn: "Mapy",
            weaponsBtn: "Zbraně",
            upgradesBtn: "Vylepšení",
            speedrunBtn: "Speedrun Průvodce",
            allQuestsBtn: "Všechny hlavní úkoly",
            allSideQuestsBtn: "Všechny vedlejší úkoly",
            hardestDifficultyBtn: "Nejtěžší obtížnost",
            specificTrophyBtn: "Konkrétní Trofej",
            videosGeneralBtn: "Videa (Obecné)",
            selectSearchSource: "Vyberte zdroj hledání:",
            searchButtonText: "Vyhledat",
            languageSelector: "Jazyk:",
            themeSelector: "Motiv:",
            darkThemeText: "Tmavý",
            lightThemeText: "Světlý",
            alertGameName: "Prosím, zadej název hry.",
            alertTrophyName: "Prosím, zadej název trofeje/achievementu pro toto vyhledávání."
        },
        de: {
            pageTitle: "PlayStation Trophäen-Suchmaschine",
            mainHeading: "PlayStation Trophäen-Suchmaschine",
            searchInputPlaceholder: "Spielname eingeben...",
            trophyInputPlaceholder: "Spezifischen Trophäen-/Achievement-Namen eingeben (optional)...",
            selectSearchType: "Suchtyp auswählen:",
            trophyBtn: "Trophäe",
            roadmapBtn: "Roadmap & Leitfaden",
            collectiblesBtn: "Sammelobjekte",
            notesBtn: "Notizen / Lore",
            mapBtn: "Karten",
            weaponsBtn: "Waffen",
            upgradesBtn: "Upgrades",
            speedrunBtn: "Speedrun-Leitfaden",
            allQuestsBtn: "Alle Hauptquests",
            allSideQuestsBtn: "Alle Nebenquests",
            hardestDifficultyBtn: "Schwierigste Schwierigkeit",
            specificTrophyBtn: "Spezifische Trophäe",
            videosGeneralBtn: "Videos (Allgemein)",
            selectSearchSource: "Suchquelle auswählen:",
            searchButtonText: "Suchen",
            languageSelector: "Sprache:",
            themeSelector: "Thema:",
            darkThemeText: "Dunkel",
            lightThemeText: "Hell",
            alertGameName: "Bitte geben Sie einen Spielnamen ein.",
            alertTrophyName: "Bitte geben Sie einen Trophäen-/Achievement-Namen für diese Suche ein."
        }
    };

    function updateTrophyInputVisibility() {
        if (currentSearchTerm === 'specific_trophy') {
            trophyNameInput.style.display = 'block';
            trophyNameInput.focus();
        } else {
            trophyNameInput.style.display = 'none';
            trophyNameInput.value = '';
        }
    }

    function performSearch(source) {
        const gameName = gameSearchInput.value.trim();
        const trophyName = trophyNameInput.value.trim();
        let searchTerm = gameName;
        let specificQuery = "";
        let url = '';

        if (!gameName) {
            alert(translations[currentLanguage].alertGameName);
            gameSearchInput.focus();
            return;
        }

        switch (currentSearchTerm) {
            case 'trophy':
                specificQuery = 'trophy list';
                break;
            case 'roadmap':
                specificQuery = 'trophy guide and roadmap';
                break;
            case 'collectibles':
                specificQuery = 'all collectibles guide locations';
                break;
            case 'notes':
                specificQuery = 'all notes lore items locations';
                break;
            case 'maps':
                specificQuery = 'game map all locations';
                break;
            case 'weapons':
                specificQuery = 'all weapons locations guide';
                break;
            case 'upgrades':
                specificQuery = 'full character and weapon upgrades guide';
                break;
            case 'speedrun':
                specificQuery = 'speedrun guide tips';
                break;
            case 'all_quests':
                specificQuery = 'all main story quests walkthrough guide';
                break;
            case 'all_side_quests':
                specificQuery = 'all side quests guide locations';
                break;
            case 'hardest_difficulty':
                specificQuery = 'hardest difficulty guide walkthrough';
                break;
            case 'specific_trophy':
                if (!trophyName) {
                    alert(translations[currentLanguage].alertTrophyName);
                    trophyNameInput.focus();
                    return;
                }
                specificQuery = `"${trophyName}" trophy achievement guide`;
                break;
            case 'videos_general':
                specificQuery = 'gameplay videos';
                break;
            default:
                specificQuery = ''; // Fallback for unknown terms
                break;
        }

        searchTerm = `${gameName} ${specificQuery}`.trim();

        if (source === 'youtube') {
            // Adjust specificQuery for YouTube to be more video-centric
            if (currentSearchTerm === 'trophy') {
                specificQuery = 'trophy list video';
            } else if (currentSearchTerm === 'roadmap') {
                specificQuery = 'video trophy roadmap guide';
            } else if (currentSearchTerm === 'collectibles') {
                specificQuery = 'all collectibles video guide';
            } else if (currentSearchTerm === 'maps') {
                specificQuery = 'map guide video walkthrough';
            } else if (currentSearchTerm === 'weapons') {
                specificQuery = 'weapons showcase locations video';
            } else if (currentSearchTerm === 'upgrades') {
                specificQuery = 'full upgrade video guide';
            } else if (currentSearchTerm === 'speedrun') {
                specificQuery = 'speedrun video';
            } else if (currentSearchTerm === 'all_quests') {
                specificQuery = 'main quests video walkthrough';
            } else if (currentSearchTerm === 'all_side_quests') {
                specificQuery = 'all side quests video guide';
            } else if (currentSearchTerm === 'hardest_difficulty') {
                specificQuery = 'hardest difficulty playthrough video';
            } else if (currentSearchTerm === 'specific_trophy') {
                if (!trophyName) {
                    alert(translations[currentLanguage].alertTrophyName);
                    trophyNameInput.focus();
                    return;
                }
                specificQuery = `"${trophyName}" trophy achievement video guide`;
            } else if (currentSearchTerm === 'videos_general') {
                specificQuery = 'gameplay trailer review'; // Broaden for general videos
            }
            searchTerm = `${gameName} ${specificQuery}`.trim();
        }


        switch (source) {
            case 'google':
                url = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
                break;
            case 'psnprofiles':
                url = `https://psnprofiles.com/search/games?q=${encodeURIComponent(gameName)}`;
                // PSNProfiles doesn't support specific query types beyond game search in URL
                break;
            case 'powerpyx':
                url = `https://www.powerpyx.com/?s=${encodeURIComponent(searchTerm)}`;
                break;
            case 'truetrophies':
                url = `https://www.truetrophies.com/searchresults.aspx?search=${encodeURIComponent(gameName)}`;
                // TrueTrophies also primarily searches for the game.
                break;
            case 'youtube':
                url = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
                break;
            default:
                url = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
                break;
        }

        if (url) {
            window.open(url, '_blank');
        }
    }

    function applyTranslations(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[lang][key]);
                } else if (element.tagName === 'SPAN' || element.tagName === 'BUTTON') {
                    if (element.classList.contains('color-box')) {
                        return; // Don't translate color boxes
                    }
                    element.textContent = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        // Ensure language button text remains short codes
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
        currentTheme = 'dark'; // Default to dark if no theme is saved
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

    // Set initial active states for search type and source buttons
    document.querySelector('.search-type-btn[data-search-term="trophy"]').classList.add('active');
    document.querySelector('.search-source-btn.google').classList.add('active');
    updateTrophyInputVisibility(); // Call initially to set correct visibility

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
            updateTrophyInputVisibility();
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

    trophyNameInput.addEventListener('keypress', (event) => {
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

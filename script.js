// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameSearchInput = document.getElementById('gameSearchInput');
    const searchTypeButtons = document.querySelectorAll('.search-type-btn');
    const searchSourceButtons = document.querySelectorAll('.search-source-btn');
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const searchButton = document.getElementById('searchBtn');

    let currentSearchTerm = 'Trophy Guide'; // Výchozí vyhledávací termín
    let currentLanguage = 'en'; // Výchozí jazyk
    let currentTheme = 'dark'; // Výchozí motiv

    // Object for translations
    const translations = {
        en: {
            pageTitle: "PLAYSTATION TROPHY SEARCH",
            mainHeading: "PLAYSTATION TROPHY SEARCH",
            searchInputPlaceholder: "Enter game title or trophy name...",
            selectSearchSource: "Select Search Source:", // Změněno z selectSearchType na selectSearchSource
            searchButtonText: "Search",
            mainTypesHeading: "Main Search Types:",
            guideBtn: "Trophy Guide",
            roadmapBtn: "Roadmap",
            mapBtn: "Maps",
            collectiblesBtn: "Collectibles",
            advancedTypesHeading: "Advanced Search Types:",
            puzzlesBtn: "All Puzzles",
            challengesBtn: "All Challenges",
            speedrunBtn: "Speedrun",
            bossesBtn: "All Bosses",
            minigamesBtn: "All Minigames",
            hardestDifficultyBtn: "Hardest Difficulty Run",
            mainQuestBtn: "All Main Quests",
            sideQuestBtn: "All Side Quests",
            secretsBtn: "All Secrets",
            endingsHeading: "Endings:",
            allEndingsBtn: "All Endings",
            goodEndingBtn: "Good Ending",
            badEndingBtn: "Bad Ending",
            secretEndingBtn: "Secret Ending",
            charGearHeading: "Character / Gear:",
            charactersBtn: "All Characters",
            weaponUpgradeBtn: "Weapon Upgrades",
            characterUpgradeBtn: "Character Upgrades",
            abilityUpgradeBtn: "Ability Upgrades",
            healthUpgradeBtn: "Health Upgrades",
            energyUpgradeBtn: "Energy Upgrades",
            costumesBtn: "All Costumes",
            skinsBtn: "All Skins",
            collectiblesHeading: "Collectibles:",
            diariesBtn: "All Diaries",
            musicsBtn: "All Musics",
            audioLogsBtn: "All Audio Logs",
            recordingsBtn: "All Recordings",
            statuesBtn: "All Statues",
            picturesBtn: "All Pictures",
            documentsBtn: "All Documents",
            photosBtn: "All Photos",
            treasuresBtn: "All Treasures",
            intelBtn: "All Intel",
            echosBtn: "All Echos",
            relicsBtn: "All Relics",
            fishBtn: "All Fish",
            animalsBtn: "All Animals",
            keysBtn: "All Keys",
            blueprintsBtn: "All Blueprints",
            emailsBtn: "All Emails",
            languageSelector: "Language:",
            themeSelector: "Theme:",
            darkThemeText: "Dark",
            lightThemeText: "Light"
        },
        cs: {
            pageTitle: "Vyhledávač PlayStation trofejí",
            mainHeading: "Vyhledávač PlayStation trofejí",
            searchInputPlaceholder: "Zadejte název hry nebo trofeje...",
            selectSearchSource: "Vyberte zdroj hledání:", // Změněno z selectSearchType na selectSearchSource
            searchButtonText: "Vyhledat",
            mainTypesHeading: "Hlavní typy hledání:",
            guideBtn: "Průvodce trofejemi",
            roadmapBtn: "Cestovní mapa",
            mapBtn: "Mapy",
            collectiblesBtn: "Sběratelské předměty",
            advancedTypesHeading: "Pokročilé typy hledání:",
            puzzlesBtn: "Všechny skládanky",
            challengesBtn: "Všechny výzvy",
            speedrunBtn: "Speedrun",
            bossesBtn: "Všichni bossové",
            minigamesBtn: "Všechny minihry",
            hardestDifficultyBtn: "Běh na nejtěžší obtížnost",
            mainQuestBtn: "Všechny hlavní úkoly",
            sideQuestBtn: "Všechny vedlejší úkoly",
            secretsBtn: "Všechna tajemství",
            endingsHeading: "Konce:",
            allEndingsBtn: "Všechny konce",
            goodEndingBtn: "Dobrý konec",
            badEndingBtn: "Špatný konec",
            secretEndingBtn: "Tajný konec",
            charGearHeading: "Postava / Výbava:",
            charactersBtn: "Všechny postavy",
            weaponUpgradeBtn: "Vylepšení zbraní",
            characterUpgradeBtn: "Vylepšení postavy",
            abilityUpgradeBtn: "Vylepšení schopností",
            healthUpgradeBtn: "Vylepšení zdraví",
            energyUpgradeBtn: "Vylepšení energie",
            costumesBtn: "Všechny kostýmy",
            skinsBtn: "Skiny",
            collectiblesHeading: "Sběratelské předměty:",
            diariesBtn: "Deníky",
            musicsBtn: "Hudba",
            audioLogsBtn: "Zvukové záznamy",
            recordingsBtn: "Nahrávky",
            statuesBtn: "Sošky",
            picturesBtn: "Obrazy",
            documentsBtn: "Dokumenty",
            photosBtn: "Fotky",
            treasuresBtn: "Poklady",
            intelBtn: "Intel",
            echosBtn: "Echa",
            relicsBtn: "Relikvie",
            fishBtn: "Všechny ryby",
            animalsBtn: "Všechna zvířata",
            keysBtn: "Všechny klíče",
            blueprintsBtn: "Všechny blueprinty",
            emailsBtn: "Emaily",
            languageSelector: "Jazyk:",
            themeSelector: "Motiv:",
            darkThemeText: "Tmavý",
            lightThemeText: "Světlý"
        }
    };

    function performSearch(source) {
        const query = gameSearchInput.value.trim();
        let url = '';

        if (!query) {
            alert(translations[currentLanguage].searchInputPlaceholder);
            return;
        }

        let fullSearchTerm = currentSearchTerm;

        // Speciální úpravy pro YouTube URL
        if (source === 'youtube') {
            switch (currentSearchTerm) {
                case "Trophy Guide":
                case "Roadmap":
                case "Full Map":
                case "All collectibles":
                case "All puzzles":
                case "All challenges":
                case "Speedrun":
                case "All bosses":
                case "All minigames":
                case "Hardest difficulty run":
                case "All main quest":
                case "All side quest":
                case "All secrets":
                case "All endings":
                case "Good ending":
                case "Bad ending":
                case "Secret ending":
                case "All characters":
                case "All weapon upgrade":
                case "All character upgrades":
                case "All ability upgrades":
                case "All health upgrades":
                case "All energy upgrades":
                case "All costumes": // Tyto termíny se přidají k dotazu beze změny
                case "All skins":
                case "All diaries":
                case "All musics":
                case "All audio logs":
                case "All recordings":
                case "All statues": // Tyto termíny se přidají k dotazu beze změny
                case "All pictures":
                case "All documents":
                case "All photos":
                case "All treasures":
                case "All intel":
                case "All echos":
                case "All relics":
                case "All fish":
                case "All animals":
                case "All keys":
                case "All blueprints":
                case "All emails":
                    break;
                default:
                    // Pro ostatní případy přidáme "Trophy" k YouTube vyhledávání, pokud není explicitně specifikováno
                    fullSearchTerm = currentSearchTerm + " Trophy";
                    break;
            }
            url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' ' + fullSearchTerm)}`; // Správná YouTube URL
        } else { // Standardní Google a ostatní zdroje
            switch (currentSearchTerm) {
                // Případy, kde chceme, aby se termín přidal k dotazu
                case "Trophy Guide":
                case "Roadmap":
                case "Full Map":
                case "All collectibles":
                case "All puzzles":
                case "All challenges":
                case "Speedrun":
                case "All bosses":
                case "All minigames":
                case "Hardest difficulty run":
                case "All main quest":
                case "All side quest":
                case "All secrets":
                case "All endings":
                case "Good ending":
                case "Bad ending":
                case "Secret ending":
                case "All characters":
                case "All weapon upgrade":
                case "All character upgrades":
                case "All ability upgrades":
                case "All health upgrades":
                case "All energy upgrades":
                case "All costumes":
                case "All skins":
                case "All diaries":
                case "All musics":
                case "All audio logs":
                case "All recordings":
                case "All statues":
                case "All pictures":
                case "All documents":
                case "All photos":
                case "All treasures":
                case "All intel":
                case "All echos":
                case "All relics":
                case "All fish":
                case "All animals":
                case "All keys":
                case "All blueprints":
                case "All emails":
                    url = `https://www.google.com/search?q=${encodeURIComponent(query + ' ' + fullSearchTerm)}`;
                    break;
                default:
                    // Pro PSNProfiles, PowerPyx, TrueTrophies nepoužíváme currentSearchTerm v URL
                    if (source === 'psnprofiles') {
                        url = `https://psnprofiles.com/search/games?q=${encodeURIComponent(query)}`;
                    } else if (source === 'powerpyx') {
                        url = `https://www.powerpyx.com/?s=${encodeURIComponent(query)}`;
                    } else if (source === 'truetrophies') {
                        url = `https://www.truetrophies.com/searchresults.aspx?search=${encodeURIComponent(query)}`;
                    } else { // Fallback na Google s Trophy, pokud není jiný termín
                        url = `https://www.google.com/search?q=${encodeURIComponent(query + ' Trophy')}`;
                    }
                    break;
            }
        }
        window.open(url, '_blank');
    }

    function applyTranslations(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[lang][key]);
                } else if (element.tagName === 'SPAN' || element.tagName === 'BUTTON' || element.tagName === 'H1' || element.tagName === 'H3') {
                    if (element.classList.contains('color-box')) { // Přeskočí span s třídou color-box
                        return;
                    }
                    // Překládá text, ale pokud je to ikona, změní její textContent na název ikony
                    if (element.classList.contains('material-symbols-outlined')) {
                        const button = element.closest('.search-type-btn, .search-source-btn');
                        if (button) {
                            const searchTerm = button.dataset.searchTerm || button.dataset.source; // Použijeme dataset.source pro zdrojová tlačítka
                            switch (searchTerm) {
                                case 'Trophy Guide':
                                    element.textContent = 'military_tech';
                                    break;
                                case 'Roadmap':
                                    element.textContent = 'map';
                                    break;
                                case 'Full Map':
                                    element.textContent = 'satellite';
                                    break;
                                case 'All collectibles':
                                    element.textContent = 'diamond';
                                    break;
                                case 'All puzzles':
                                    element.textContent = 'extension';
                                    break;
                                case 'All challenges':
                                    element.textContent = 'sports_martial_arts';
                                    break;
                                case 'Speedrun':
                                    element.textContent = 'timer';
                                    break;
                                case 'All bosses':
                                    element.textContent = 'skull';
                                    break;
                                case 'All minigames':
                                    element.textContent = 'casino';
                                    break;
                                case 'Hardest difficulty run':
                                    element.textContent = 'gpp_bad';
                                    break;
                                case 'All main quest':
                                    element.textContent = 'auto_stories';
                                    break;
                                case 'All side quest':
                                    element.textContent = 'menu_book';
                                    break;
                                case 'All secrets':
                                    element.textContent = 'visibility_off';
                                    break;
                                case 'All endings':
                                    element.textContent = 'movie_filter';
                                    break;
                                case 'Good ending':
                                    element.textContent = 'sentiment_satisfied';
                                    break;
                                case 'Bad ending':
                                    element.textContent = 'sentiment_dissatisfied';
                                    break;
                                case 'Secret ending':
                                    element.textContent = 'encrypted';
                                    break;
                                case 'All characters':
                                    element.textContent = 'person';
                                    break;
                                case 'All weapon upgrade':
                                    element.textContent = 'swords';
                                    break;
                                case 'All character upgrades':
                                    element.textContent = 'person_add';
                                    break;
                                case 'All ability upgrades':
                                    element.textContent = 'neurology';
                                    break;
                                case 'All health upgrades':
                                    element.textContent = 'favorite';
                                    break;
                                case 'All energy upgrades':
                                    element.textContent = 'battery_charging_full';
                                    break;
                                case 'All costumes':
                                    element.textContent = 'apparel'; // Změněno na 'apparel'
                                    break;
                                case 'All skins':
                                    element.textContent = 'layers';
                                    break;
                                case 'All diaries':
                                    element.textContent = 'book';
                                    break;
                                case 'All musics':
                                    element.textContent = 'music_note';
                                    break;
                                case 'All audio logs':
                                    element.textContent = 'audiotrack';
                                    break;
                                case 'All recordings':
                                    element.textContent = 'mic';
                                    break;
                                case 'All statues':
                                    element.textContent = 'sculpture'; // Změněno na 'sculpture'
                                    break;
                                case 'All pictures':
                                    element.textContent = 'image';
                                    break;
                                case 'All documents':
                                    element.textContent = 'description';
                                    break;
                                case 'All photos':
                                    element.textContent = 'camera';
                                    break;
                                case 'All treasures':
                                    element.textContent = 'diamond';
                                    break;
                                case 'All intel':
                                    element.textContent = 'lightbulb';
                                    break;
                                case 'All echos':
                                    element.textContent = 'spatial_audio';
                                    break;
                                case 'All relics':
                                    element.textContent = 'bookmark';
                                    break;
                                case 'All fish':
                                    element.textContent = 'phishing';
                                    break;
                                case 'All animals':
                                    element.textContent = 'pets';
                                    break;
                                case 'All keys':
                                    element.textContent = 'key';
                                    break;
                                case 'All blueprints':
                                    element.textContent = 'widgets';
                                    break;
                                case 'All emails':
                                    element.textContent = 'email';
                                    break;
                                case 'google':
                                    element.textContent = 'travel_explore';
                                    break;
                                case 'psnprofiles':
                                    element.textContent = 'sports_esports';
                                    break;
                                case 'powerpyx':
                                    element.textContent = 'star';
                                    break;
                                case 'truetrophies':
                                    element.textContent = 'verified';
                                    break;
                                case 'youtube':
                                    element.textContent = 'play_circle';
                                    break;
                                default:
                                    break;
                            }
                        } else if (element.classList.contains('trophy-icon')) {
                            element.textContent = 'trophy';
                        }
                    } else {
                        element.textContent = translations[lang][key];
                    }
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        // Speciální nastavení textu pro tlačítka jazyka, aby se nepřekládaly samy sebou
        document.querySelector('.lang-btn[data-lang="en"]').textContent = "ENG";
        document.querySelector('.lang-btn[data-lang="cs"]').textContent = "CS";
    }

    function applyTheme(theme) {
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(`${theme}-theme`);
    }

    // --- Initial Setup ---
    // Načtení jazyka z localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        currentLanguage = 'en'; // Výchozí je angličtina
        localStorage.setItem('selectedLanguage', currentLanguage);
    }
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    applyTranslations(currentLanguage); // Volání applyTranslations po načtení jazyka

    // Načtení motivu z localStorage
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        currentTheme = 'dark'; // Výchozí je tmavý
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

    // Nastavení výchozího aktivního tlačítka pro typ hledání (Trophy Guide) a zdroj (Google)
    document.querySelector('.search-type-btn[data-search-term="Trophy Guide"]').classList.add('active');
    // Toto je nyní nastaveno přímo v HTML pro 'google'
    // document.querySelector('.search-source-btn.google').classList.add('active'); 

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
            applyTranslations(currentLanguage); // Zajišťuje, že ikony a texty jsou aktuální
        });
    });

    searchSourceButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchSourceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Zde není potřeba měnit currentSearchTerm, jen aktivní zdroj
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

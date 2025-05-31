// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameSearchInput = document.getElementById('gameSearchInput');
    const searchTypeButtons = document.querySelectorAll('.search-type-btn');
    const searchSourceButtons = document.querySelectorAll('.search-source-btn');
    const langButtons = document.querySelectorAll('.lang-btn');
    const searchButton = document.getElementById('searchBtn');

    let currentSearchTerm = 'Trophy Guide'; // Výchozí vyhledávací termín
    let currentLanguage = 'en'; // Výchozí jazyk

    const translations = {
        // ... (zde ponecháme stávající překlady beze změny)
        en: {
            pageTitle: "PLAYSTATION TROPHY SEARCH",
            mainHeading: "PLAYSTATION TROPHY SEARCH",
            searchInputPlaceholder: "Enter game title or trophy name...",
            selectSearchSource: "Select Search Source:",
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
            selectSearchSource: "Vyberte zdroj hledání:",
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

        // Logika pro YouTube
        if (source === 'youtube') {
            // Zde byly speciální úpravy pro YouTube URL
            // Opravujeme chybu v URL: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' ' + fullSearchTerm)}`;
            // Správně by to mělo být přímo URL pro YouTube vyhledávání
            url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' ' + fullSearchTerm)}`;
        } else if (source === 'psnprofiles') {
            url = `https://psnprofiles.com/search/games?q=${encodeURIComponent(query)}`;
        } else if (source === 'powerpyx') {
            url = `https://www.powerpyx.com/?s=${encodeURIComponent(query)}`;
        } else if (source === 'truetrophies') {
            url = `https://www.truetrophies.com/searchresults.aspx?search=${encodeURIComponent(query)}`;
        } else { // Standardní Google a ostatní zdroje (včetně default pro google)
            // Zde necháme původní logiku, kde se currentSearchTerm přidává k dotazu,
            // nebo se použije 'Trophy' pokud není jiný termín
            if (currentSearchTerm && currentSearchTerm !== 'Trophy Guide') { // Upraveno, aby se Trophy Guide nepřidával duplicitně
                url = `https://www.google.com/search?q=${encodeURIComponent(query + ' ' + fullSearchTerm)}`;
            } else {
                url = `https://www.google.com/search?q=${encodeURIComponent(query + ' Trophy')}`;
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
                    if (element.classList.contains('color-box')) {
                        return;
                    }
                    if (element.classList.contains('material-symbols-outlined')) {
                        const button = element.closest('.search-type-btn, .search-source-btn');
                        if (button) {
                            const searchTerm = button.dataset.searchTerm || button.dataset.source;
                            switch (searchTerm) {
                                case 'Trophy Guide': element.textContent = 'military_tech'; break;
                                case 'Roadmap': element.textContent = 'map'; break;
                                case 'Full Map': element.textContent = 'satellite'; break;
                                case 'All collectibles': element.textContent = 'diamond'; break;
                                case 'All puzzles': element.textContent = 'extension'; break;
                                case 'All challenges': element.textContent = 'sports_martial_arts'; break;
                                case 'Speedrun': element.textContent = 'timer'; break;
                                case 'All bosses': element.textContent = 'skull'; break;
                                case 'All minigames': element.textContent = 'casino'; break;
                                case 'Hardest difficulty run': element.textContent = 'gpp_bad'; break;
                                case 'All main quest': element.textContent = 'auto_stories'; break;
                                case 'All side quest': element.textContent = 'menu_book'; break;
                                case 'All secrets': element.textContent = 'visibility_off'; break;
                                case 'All endings': element.textContent = 'movie_filter'; break;
                                case 'Good ending': element.textContent = 'sentiment_satisfied'; break;
                                case 'Bad ending': element.textContent = 'sentiment_dissatisfied'; break;
                                case 'Secret ending': element.textContent = 'encrypted'; break;
                                case 'All characters': element.textContent = 'person'; break;
                                case 'All weapon upgrade': element.textContent = 'swords'; break;
                                case 'All character upgrades': element.textContent = 'person_add'; break;
                                case 'All ability upgrades': element.textContent = 'neurology'; break;
                                case 'All health upgrades': element.textContent = 'favorite'; break;
                                case 'All energy upgrades': element.textContent = 'battery_charging_full'; break;
                                case 'All costumes': element.textContent = 'apparel'; break;
                                case 'All skins': element.textContent = 'layers'; break;
                                case 'All diaries': element.textContent = 'book'; break;
                                case 'All musics': element.textContent = 'music_note'; break;
                                case 'All audio logs': element.textContent = 'audiotrack'; break;
                                case 'All recordings': element.textContent = 'mic'; break;
                                case 'All statues': element.textContent = 'sculpture'; break;
                                case 'All pictures': element.textContent = 'image'; break;
                                case 'All documents': element.textContent = 'description'; break;
                                case 'All photos': element.textContent = 'camera'; break;
                                case 'All treasures': element.textContent = 'diamond'; break;
                                case 'All intel': element.textContent = 'lightbulb'; break;
                                case 'All echos': element.textContent = 'spatial_audio'; break;
                                case 'All relics': element.textContent = 'bookmark'; break;
                                case 'All fish': element.textContent = 'phishing'; break;
                                case 'All animals': element.textContent = 'pets'; break;
                                case 'All keys': element.textContent = 'key'; break;
                                case 'All blueprints': element.textContent = 'widgets'; break;
                                case 'All emails': element.textContent = 'email'; break;
                                case 'google': element.textContent = 'travel_explore'; break;
                                case 'psnprofiles': element.textContent = 'sports_esports'; break;
                                case 'powerpyx': element.textContent = 'star'; break;
                                case 'truetrophies': element.textContent = 'verified'; break;
                                case 'youtube': element.textContent = 'play_circle'; break;
                                default: break;
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
        document.querySelector('.lang-btn[data-lang="en"]').textContent = "ENG";
        document.querySelector('.lang-btn[data-lang="cs"]').textContent = "CS";
    }

    // --- Initial Setup ---
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        currentLanguage = 'en';
        localStorage.setItem('selectedLanguage', currentLanguage);
    }
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    applyTranslations(currentLanguage);

    document.querySelector('.search-type-btn[data-search-term="Trophy Guide"]').classList.add('active');

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

    searchTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentSearchTerm = button.dataset.searchTerm;
            applyTranslations(currentLanguage);
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
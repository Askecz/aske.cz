// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameSearchInput = document.getElementById('gameSearchInput');
    const searchTypeButtons = document.querySelectorAll('.search-type-btn');
    const searchSourceButtons = document.querySelectorAll('.search-source-btn');
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const searchButton = document.getElementById('searchBtn');

    let currentSearchTerm = 'Trophy Guide';
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    let currentTheme = localStorage.getItem('selectedTheme') || 'dark';

    const translations = {
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
            allCollectiblesBtn: "All Collectibles",
            variousTypesHeading: "Various:",
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
            themeSelector: "Theme:"
        },
        cs: {
            pageTitle: "VYHLEDÁVÁNÍ PS TROFEJÍ",
            mainHeading: "VYHLEDÁVÁNÍ PS TROFEJÍ",
            searchInputPlaceholder: "Zadejte název hry nebo trofeje...",
            selectSearchSource: "Vyberte zdroj vyhledávání:",
            searchButtonText: "Hledat",
            mainTypesHeading: "Hlavní typy hledání:",
            guideBtn: "Průvodce trofejemi",
            roadmapBtn: "Cestovní mapa",
            mapBtn: "Mapy",
            allCollectiblesBtn: "Všechny sběratelské předměty",
            variousTypesHeading: "Různé:",
            puzzlesBtn: "Všechny hádanky",
            challengesBtn: "Všechny výzvy",
            speedrunBtn: "Speedrun",
            bossesBtn: "Všichni bossové",
            minigamesBtn: "Všechny minihry",
            hardestDifficultyBtn: "Průchod na nejtěžší obtížnost",
            mainQuestBtn: "Všechny hlavní úkoly",
            sideQuestBtn: "Všechny vedlejší úkoly",
            secretsBtn: "Všechna tajemství",
            endingsHeading: "Konce hry:",
            allEndingsBtn: "Všechny konce",
            goodEndingBtn: "Dobrý konec",
            badEndingBtn: "Špatný konec",
            secretEndingBtn: "Tajný konec",
            charGearHeading: "Postavy / Výbava:",
            charactersBtn: "Všechny postavy",
            weaponUpgradeBtn: "Vylepšení zbraní",
            characterUpgradeBtn: "Vylepšení postavy",
            abilityUpgradeBtn: "Vylepšení schopností",
            healthUpgradeBtn: "Vylepšení zdraví",
            energyUpgradeBtn: "Vylepšení energie",
            costumesBtn: "Všechny kostýmy",
            skinsBtn: "Všechny skiny",
            collectiblesHeading: "Sběratelské předměty:",
            diariesBtn: "Všechny deníky",
            musicsBtn: "Všechna hudba",
            audioLogsBtn: "Všechny audiozáznamy",
            recordingsBtn: "Všechny nahrávky",
            statuesBtn: "Všechny sochy",
            picturesBtn: "Všechny obrázky",
            documentsBtn: "Všechny dokumenty",
            photosBtn: "Všechny fotky",
            treasuresBtn: "Všechny poklady",
            intelBtn: "Všechny informace",
            echosBtn: "Všechny ozvěny",
            relicsBtn: "Všechny relikvie",
            fishBtn: "Všechny ryby",
            animalsBtn: "Všechna zvířata",
            keysBtn: "Všechny klíče",
            blueprintsBtn: "Všechny plány",
            emailsBtn: "Všechny e-maily",
            languageSelector: "Jazyk:",
            themeSelector: "Téma:"
        }
    };

    const applyTranslations = (lang) => {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (translations[lang] && translations[lang][key]) {
                // Pokud je element tlačítko a má třídu .button-text, aktualizuj pouze tento span
                if (element.tagName === 'BUTTON' && element.querySelector('.button-text')) {
                    element.querySelector('.button-text').textContent = translations[lang][key];
                } else if (element.tagName === 'INPUT') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    };

    const applyTheme = (theme) => {
        document.body.className = ''; // Remove all classes
        document.body.classList.add(`${theme}-theme`);
        localStorage.setItem('selectedTheme', theme);

        themeButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.theme-btn[data-theme="${theme}"]`).classList.add('active');
    };

    const performSearch = (source) => {
        const query = gameSearchInput.value.trim();
        if (query) {
            let fullSearchTerm = `${query} ${currentSearchTerm}`;
            let searchUrl = '';

            switch (source) {
                case 'google':
                    searchUrl = `https://www.google.com/search?q=${encodeURIComponent(fullSearchTerm)}`;
                    break;
                case 'psnprofiles':
                    searchUrl = `https://psnprofiles.com/search/guides?q=${encodeURIComponent(fullSearchTerm)}`;
                    break;
                case 'powerpyx':
                    searchUrl = `https://www.powerpyx.com/?s=${encodeURIComponent(fullSearchTerm)}`;
                    break;
                case 'truetrophies':
                    searchUrl = `https://www.truetrophies.com/search/results?searchtype=Guides&term=${encodeURIComponent(fullSearchTerm)}`;
                    break;
                case 'youtube':
                    searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(fullSearchTerm)}`;
                    break;
                default:
                    searchUrl = `https://www.google.com/search?q=${encodeURIComponent(fullSearchTerm)}`;
            }
            window.open(searchUrl, '_blank');
        }
    };

    // Initial setup
    applyTheme(currentTheme);
    applyTranslations(currentLanguage);
    document.querySelector(`.lang-btn[data-lang="${currentLanguage}"]`).classList.add('active');

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
            applyTheme(button.dataset.theme);
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
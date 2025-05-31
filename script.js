// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameSearchInput = document.getElementById('gameSearchInput');
    const searchTypeButtons = document.querySelectorAll('.search-type-btn');
    const searchSourceButtons = document.querySelectorAll('.search-source-btn');
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const searchButton = document.getElementById('searchBtn');
    const searchHistoryList = document.getElementById('searchHistoryList');
    const toggleHistoryBtn = document.getElementById('toggleHistoryBtn');

    let currentSearchTerm = 'Trophy Guide';
    // Load from localStorage or set default
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    let currentTheme = localStorage.getItem('selectedTheme') || 'dark';
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    const MAX_HISTORY_ITEMS = 10; // Limit the number of history items

    const translations = {
        en: {
            pageTitle: "Fast Guide Search",
            mainHeading: "Fast Guide Search",
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
            themeSelector: "Theme:",
            searchHistoryHeading: "Search History:",
            noHistory: "No search history yet.",
            reSearchBtn: "Re-Search",
            queryLabel: "Query",
            typeLabel: "Type",
            sourceLabel: "Source",
            timeLabel: "Time"
        },
        cs: {
            pageTitle: "Fast Guide Search",
            mainHeading: "Fast Guide Search",
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
            themeSelector: "Téma:",
            searchHistoryHeading: "Historie hledání:",
            noHistory: "Zatím žádná historie hledání.",
            reSearchBtn: "Znovu hledat",
            queryLabel: "Dotaz",
            typeLabel: "Typ",
            sourceLabel: "Zdroj",
            timeLabel: "Čas"
        }
    };

    const applyTranslations = (lang) => {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (translations[lang] && translations[lang][key]) {
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
        document.body.className = '';
        document.body.classList.add(`${theme}-theme`);
        localStorage.setItem('selectedTheme', theme); // Save theme to localStorage

        themeButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.theme-btn[data-theme="${theme}"]`).classList.add('active');
    };

    const toggleSearchTypeButtons = (disable) => {
        searchTypeButtons.forEach(button => {
            if (disable) {
                button.classList.add('disabled-button');
                button.setAttribute('disabled', 'true');
                button.removeEventListener('click', handleSearchTypeClick);
            } else {
                button.classList.remove('disabled-button');
                button.removeAttribute('disabled');
                button.addEventListener('click', handleSearchTypeClick);
            }
        });
        if (disable) {
            searchTypeButtons.forEach(btn => btn.classList.remove('active'));
        } else {
            if (!document.querySelector('.search-type-btn.active')) {
                document.querySelector('[data-search-term="Trophy Guide"]').classList.add('active');
                currentSearchTerm = 'Trophy Guide';
            }
        }
    };

    const handleSearchTypeClick = (event) => {
        searchTypeButtons.forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');
        currentSearchTerm = event.currentTarget.dataset.searchTerm;
    };

    const saveSearchToHistory = (query, source, searchTerm) => {
        const timestamp = new Date().toLocaleString(currentLanguage === 'en' ? 'en-US' : 'cs-CZ', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        let historyEntry;
        const displaySearchTerm = (source === 'psnprofiles' || source === 'truetrophies') ? 'N/A' : searchTerm;

        historyEntry = { query, source, searchTerm: displaySearchTerm, timestamp };

        // Remove existing entry if it's identical (to move it to the top)
        searchHistory = searchHistory.filter(item =>
            !(item.query === query && item.source === source && item.searchTerm === displaySearchTerm)
        );

        // Add to the beginning of the array
        searchHistory.unshift(historyEntry);
        // Keep only the latest MAX_HISTORY_ITEMS
        searchHistory = searchHistory.slice(0, MAX_HISTORY_ITEMS);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        renderSearchHistory();
    };

    const renderSearchHistory = () => {
        searchHistoryList.innerHTML = ''; // Clear current history
        if (searchHistory.length === 0) {
            searchHistoryList.innerHTML = `<p class="no-history-message" data-lang-key="noHistory"></p>`;
            applyTranslations(currentLanguage); // Apply translation for "No history"
            return;
        }

        searchHistory.forEach((entry, index) => {
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');

            const searchTermDisplay = entry.searchTerm && entry.searchTerm !== 'N/A'
                ? `<span class="history-line"><span class="history-label" data-lang-key="typeLabel"></span>: ${entry.searchTerm}</span>`
                : '';

            historyItem.innerHTML = `
                <div class="history-details">
                    <span class="history-line"><span class="history-label" data-lang-key="queryLabel"></span>: ${entry.query}</span>
                    ${searchTermDisplay}
                    <span class="history-line"><span class="history-label" data-lang-key="sourceLabel"></span>: ${entry.source.charAt(0).toUpperCase() + entry.source.slice(1)}</span>
                    <span class="history-line"><span class="history-label" data-lang-key="timeLabel"></span>: ${entry.timestamp}</span>
                </div>
                <div class="history-actions">
                    <button class="history-research-btn" data-index="${index}" data-lang-key="reSearchBtn">
                        <span class="material-symbols-outlined">refresh</span>
                        <span class="button-text">Re-Search</span>
                    </button>
                    <button class="history-delete-btn" data-index="${index}">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            `;
            searchHistoryList.appendChild(historyItem);
        });

        // Apply translations to newly added history items
        applyTranslations(currentLanguage);

        document.querySelectorAll('.history-research-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const indexToReSearch = parseInt(event.currentTarget.dataset.index);
                const entry = searchHistory[indexToReSearch];
                if (entry) {
                    gameSearchInput.value = entry.query;

                    // Update active source button
                    searchSourceButtons.forEach(btn => btn.classList.remove('active'));
                    const sourceBtn = document.querySelector(`.search-source-btn[data-source="${entry.source}"]`);
                    if (sourceBtn) {
                        sourceBtn.classList.add('active');
                        // Trigger source button logic for enabling/disabling search types
                        if (entry.source === 'psnprofiles' || entry.source === 'truetrophies') {
                            toggleSearchTypeButtons(true);
                        } else {
                            toggleSearchTypeButtons(false);
                            // Update active search type button if it's not 'N/A'
                            if (entry.searchTerm !== 'N/A') {
                                searchTypeButtons.forEach(btn => btn.classList.remove('active'));
                                const typeBtn = document.querySelector(`.search-type-btn[data-search-term="${entry.searchTerm}"]`);
                                if (typeBtn) {
                                    typeBtn.classList.add('active');
                                    currentSearchTerm = entry.searchTerm;
                                } else {
                                    // Fallback if the specific search term button doesn't exist
                                    document.querySelector('[data-search-term="Trophy Guide"]').classList.add('active');
                                    currentSearchTerm = 'Trophy Guide';
                                }
                            } else {
                                // If history item had 'N/A' type, ensure 'Trophy Guide' is active
                                searchTypeButtons.forEach(btn => btn.classList.remove('active'));
                                document.querySelector('[data-search-term="Trophy Guide"]').classList.add('active');
                                currentSearchTerm = 'Trophy Guide';
                            }
                        }
                    }
                    performSearch(entry.source); // Perform the search
                }
            });
        });


        document.querySelectorAll('.history-delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const indexToDelete = parseInt(event.currentTarget.dataset.index);
                searchHistory.splice(indexToDelete, 1);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                renderSearchHistory(); // Re-render history after deletion
            });
        });
    };

    const performSearch = (source) => {
        const query = gameSearchInput.value.trim();
        if (query) {
            let fullSearchTerm = `${query} ${currentSearchTerm}`;
            let searchUrl = '';

            // Determine if search term should be saved
            const shouldSaveSearchTerm = !(source === 'psnprofiles' || source === 'truetrophies');
            const termToSave = shouldSaveSearchTerm ? currentSearchTerm : 'N/A';
            saveSearchToHistory(query, source, termToSave);

            switch (source) {
                case 'google':
                    searchUrl = `https://www.google.com/search?q=${encodeURIComponent(fullSearchTerm)}`;
                    break;
                case 'psnprofiles':
                    searchUrl = `https://psnprofiles.com/search/guides?q=${encodeURIComponent(query)}`;
                    break;
                case 'powerpyx':
                    searchUrl = `https://www.powerpyx.com/?s=${encodeURIComponent(fullSearchTerm)}`;
                    break;
                case 'truetrophies':
                    searchUrl = `https://www.truetrophies.com/searchresults.aspx?search=${encodeURIComponent(query)}`;
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
    // Apply theme from localStorage or default
    applyTheme(currentTheme);

    // Apply language from localStorage or default
    applyTranslations(currentLanguage);
    langButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.lang-btn[data-lang="${currentLanguage}"]`).classList.add('active');

    // Set default source to Google and activate it
    searchSourceButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.search-source-btn[data-source="google"]').classList.add('active');
    toggleSearchTypeButtons(false); // Ensure they are enabled by default for Google

    // Set default search type to Trophy Guide and activate it
    searchTypeButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-search-term="Trophy Guide"]').classList.add('active');
    currentSearchTerm = 'Trophy Guide';

    renderSearchHistory(); // Render history on load

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLanguage = button.dataset.lang;
            localStorage.setItem('selectedLanguage', currentLanguage); // Save language to localStorage
            applyTranslations(currentLanguage);
            renderSearchHistory(); // Re-render history to apply language to 'No history' text
        });
    });

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            applyTheme(button.dataset.theme);
        });
    });

    searchTypeButtons.forEach(button => {
        button.addEventListener('click', handleSearchTypeClick);
    });

    searchSourceButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchSourceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const selectedSource = button.dataset.source;

            if (selectedSource === 'psnprofiles' || selectedSource === 'truetrophies') {
                toggleSearchTypeButtons(true);
            } else {
                toggleSearchTypeButtons(false);
            }
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

    toggleHistoryBtn.addEventListener('click', () => {
        searchHistoryList.classList.toggle('hidden');
        toggleHistoryBtn.querySelector('.material-symbols-outlined').classList.toggle('arrow-down');
        toggleHistoryBtn.querySelector('.material-symbols-outlined').classList.toggle('arrow-up');
    });
});
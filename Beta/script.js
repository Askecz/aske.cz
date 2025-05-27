// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameSearchInput = document.getElementById('gameSearchInput');
    const trophyNameInput = document.getElementById('trophyNameInput');
    const searchTypeButtons = document.querySelectorAll('.search-type-btn');
    const searchSourceButtons = document.querySelectorAll('.search-source-btn');
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const searchButton = document.getElementById('searchBtn');

    // Nové elementy pro autocomplete
    let autocompleteContainer; // Bude vytvořen dynamicky
    let currentInputForAutocomplete = null; // Sleduje, který input má autocomplete

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
            googleBtn: "Google", // Přidáno pro překlad tlačítka Google
            psnprofilesBtn: "PSNProfiles",
            powerpyxBtn: "PowerPyx",
            truetrophiesBtn: "TrueTrophies",
            youtubeBtn: "YouTube",
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
            notesBtn: "Poznámky / Lore", // ponecháno "Lore" i v CZ pro konzistenci
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
            googleBtn: "Google",
            psnprofilesBtn: "PSNProfiles",
            powerpyxBtn: "PowerPyx",
            truetrophiesBtn: "TrueTrophies",
            youtubeBtn: "YouTube",
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
            googleBtn: "Google",
            psnprofilesBtn: "PSNProfiles",
            powerpyxBtn: "PowerPyx",
            truetrophiesBtn: "TrueTrophies",
            youtubeBtn: "YouTube",
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
            currentInputForAutocomplete = trophyNameInput; // Autocomplete pro trofejní input
        } else {
            trophyNameInput.style.display = 'none';
            trophyNameInput.value = '';
            currentInputForAutocomplete = gameSearchInput; // Autocomplete zpět na herní input
        }
        hideAutocomplete(); // Vždy skrýt autocomplete, když se mění viditelnost inputu
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
            case 'trophy': specificQuery = 'trophy list'; break;
            case 'roadmap': specificQuery = 'trophy guide and roadmap'; break;
            case 'collectibles': specificQuery = 'all collectibles guide locations'; break;
            case 'notes': specificQuery = 'all notes lore items locations'; break;
            case 'maps': specificQuery = 'game map all locations'; break;
            case 'weapons': specificQuery = 'all weapons locations guide'; break;
            case 'upgrades': specificQuery = 'full character and weapon upgrades guide'; break;
            case 'speedrun': specificQuery = 'speedrun guide tips'; break;
            case 'all_quests': specificQuery = 'all main story quests walkthrough guide'; break;
            case 'all_side_quests': specificQuery = 'all side quests guide locations'; break;
            case 'hardest_difficulty': specificQuery = 'hardest difficulty guide walkthrough'; break;
            case 'specific_trophy':
                if (!trophyName) {
                    alert(translations[currentLanguage].alertTrophyName);
                    trophyNameInput.focus();
                    return;
                }
                specificQuery = `"${trophyName}" trophy achievement guide`;
                break;
            case 'videos_general': specificQuery = 'gameplay videos'; break;
            default: specificQuery = ''; break;
        }

        searchTerm = `${gameName} ${specificQuery}`.trim();

        if (source === 'youtube') {
            // Speciální úpravy pro YouTube vyhledávání, protože je často potřeba explicitní "video"
            if (currentSearchTerm === 'trophy') specificQuery = 'trophy list video';
            else if (currentSearchTerm === 'roadmap') specificQuery = 'video trophy roadmap guide';
            else if (currentSearchTerm === 'collectibles') specificQuery = 'all collectibles video guide';
            else if (currentSearchTerm === 'maps') specificQuery = 'map guide video walkthrough';
            else if (currentSearchTerm === 'weapons') specificQuery = 'weapons showcase locations video';
            else if (currentSearchTerm === 'upgrades') specificQuery = 'full upgrade video guide';
            else if (currentSearchTerm === 'speedrun') specificQuery = 'speedrun video';
            else if (currentSearchTerm === 'all_quests') specificQuery = 'main quests video walkthrough';
            else if (currentSearchTerm === 'all_side_quests') specificQuery = 'all side quests video guide';
            else if (currentSearchTerm === 'hardest_difficulty') specificQuery = 'hardest difficulty playthrough video';
            else if (currentSearchTerm === 'specific_trophy') {
                if (!trophyName) {
                    alert(translations[currentLanguage].alertTrophyName);
                    trophyNameInput.focus(); return;
                }
                specificQuery = `"${trophyName}" trophy achievement video guide`;
            }
            else if (currentSearchTerm === 'videos_general') specificQuery = 'gameplay trailer review';
            searchTerm = `${gameName} ${specificQuery}`.trim();
        }

        switch (source) {
            case 'google': url = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`; break;
            case 'psnprofiles': url = `https://psnprofiles.com/search/games?q=${encodeURIComponent(gameName)}`; break;
            case 'powerpyx': url = `https://www.powerpyx.com/?s=${encodeURIComponent(searchTerm)}`; break;
            case 'truetrophies': url = `https://www.truetrophies.com/searchresults.aspx?search=${encodeURIComponent(gameName)}`; break;
            case 'youtube': url = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`; break; // Opravená URL pro YouTube
            default: url = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`; break;
        }

        if (url) window.open(url, '_blank');
        hideAutocomplete(); // Skrýt autocomplete po vyhledávání
    }

    function applyTranslations(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translations[lang][key];
                } else if (element.tagName === 'SPAN' && !element.classList.contains('material-icons-outlined') && !element.classList.contains('color-box')) {
                    // Překládá SPAN, který není ikona ani barevný box (typicky text v tlačítku vedle ikony)
                    element.textContent = translations[lang][key];
                } else if (element.tagName === 'TITLE' || element.tagName === 'H1' || element.tagName === 'H3') {
                    // Přímý překlad pro TITLE, H1, H3
                    element.textContent = translations[lang][key];
                }
                // Pro tlačítka s ikonami, kde je text ve vnořeném SPANu s data-lang-key, se to již pokryje výše.
                // Pro tlačítka ENG/CS/DE se text nastavuje explicitně níže.
            }
        });
        // Zajistí, že texty jazykových tlačítek zůstanou jako kódy
        document.querySelector('.lang-btn[data-lang="en"]').textContent = "ENG";
        document.querySelector('.lang-btn[data-lang="cs"]').textContent = "CS";
        document.querySelector('.lang-btn[data-lang="de"]').textContent = "DE";
    }

    function applyTheme(theme) {
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(`${theme}-theme`);
        themeButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.theme === theme));
    }

    // --- Autocomplete Functions ---

    // Vytvoří kontejner pro autocomplete, pokud neexistuje
    function createAutocompleteContainer() {
        if (!autocompleteContainer) {
            autocompleteContainer = document.createElement('div');
            autocompleteContainer.classList.add('autocomplete-suggestions');
            // Přidáme ho do těla, aby se správně pozicoval absolutně
            document.body.appendChild(autocompleteContainer);
        }
        // Ujistíme se, že je skrytý na začátku
        autocompleteContainer.style.display = 'none';
    }

    // Pozice kontejneru autocomplete pod inputem
    function positionAutocompleteContainer(inputElement) {
        const inputRect = inputElement.getBoundingClientRect();
        autocompleteContainer.style.position = 'absolute';
        // Přidáme scrollY/scrollX pro správné pozicování vzhledem k dokumentu
        autocompleteContainer.style.top = `${inputRect.bottom + window.scrollY + 5}px`;
        autocompleteContainer.style.left = `${inputRect.left + window.scrollX}px`;
        autocompleteContainer.style.width = `${inputRect.width}px`;
        autocompleteContainer.style.zIndex = '1001'; // Vyšší z-index
        autocompleteContainer.style.display = 'block';
    }

    // Skryje kontejner autocomplete
    function hideAutocomplete() {
        if (autocompleteContainer) {
            autocompleteContainer.innerHTML = '';
            autocompleteContainer.style.display = 'none';
        }
    }

    // Získá návrhy z Google (neoficiální API)
    async function fetchGoogleSuggestions(query) {
        if (query.length < 2) { // Hledat až od 2 znaků
            hideAutocomplete();
            return [];
        }

        const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            // Data jsou pole: [původní dotaz, [návrhy], [], []]
            return data[1] || [];
        } catch (error) {
            console.error('Error fetching Google suggestions:', error);
            return [];
        }
    }

    // Zobrazí návrhy v autocomplete kontejneru
    function displaySuggestions(suggestions, inputElement) {
        if (!autocompleteContainer) return;

        autocompleteContainer.innerHTML = ''; // Vyčistit předchozí návrhy

        if (suggestions.length === 0) {
            hideAutocomplete();
            return;
        }

        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('autocomplete-item');
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', () => {
                inputElement.value = suggestion;
                hideAutocomplete();
            });
            autocompleteContainer.appendChild(suggestionItem);
        });

        positionAutocompleteContainer(inputElement);
    }

    // --- Initial Setup ---
    currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    if (!translations[currentLanguage]) currentLanguage = 'en'; // Fallback
    langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLanguage));
    
    currentTheme = localStorage.getItem('selectedTheme') || 'dark';
    applyTheme(currentTheme); // Použít motiv
    applyTranslations(currentLanguage); // AŽ POTOM aplikovat překlady

    const initialSearchType = document.querySelector('.search-type-btn[data-search-term="trophy"]');
    if (initialSearchType) initialSearchType.classList.add('active');
    
    const initialSearchSource = document.querySelector('.search-source-btn.google');
    if (initialSearchSource && !document.querySelector('.search-source-btn.active')) {
        initialSearchSource.classList.add('active');
    }
    updateTrophyInputVisibility(); // Nastaví výchozí input pro autocomplete a jeho viditelnost

    // Vytvoření autocomplete kontejneru hned po načtení DOM
    createAutocompleteContainer();
    // currentInputForAutocomplete je již nastaveno v updateTrophyInputVisibility()

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
            hideAutocomplete(); // Skrýt autocomplete při změně typu hledání
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
        let source = activeSourceButton ? activeSourceButton.dataset.source : 'google';
        performSearch(source);
    });

    [gameSearchInput, trophyNameInput].forEach(input => {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchButton.click();
            }
        });

        // Přidání autocomplete listeneru
        input.addEventListener('input', async (event) => {
            // Kontrola, zda event.target je aktuální input pro autocomplete
            // (Zabraňuje spouštění autocomplete na skrytém trophyNameInput)
            if (event.target === currentInputForAutocomplete) {
                const query = event.target.value;
                if (query.length > 1) { // Spustit autocomplete od 2 znaků
                    const suggestions = await fetchGoogleSuggestions(query);
                    displaySuggestions(suggestions, event.target);
                } else {
                    hideAutocomplete();
                }
            } else {
                hideAutocomplete(); // Skrýt autocomplete, pokud píšeme do jiného inputu
            }
        });

        // Skrýt autocomplete, když input ztratí focus, ale s malým zpožděním, aby se stihl kliknout na návrh
        input.addEventListener('blur', () => {
            setTimeout(() => {
                hideAutocomplete();
            }, 150); // Krátké zpoždění
        });

        // Při focusu na input, pokud už má text, zkusit znovu načíst návrhy
        input.addEventListener('focus', async (event) => {
            if (event.target === currentInputForAutocomplete && event.target.value.length > 1) {
                const query = event.target.value;
                const suggestions = await fetchGoogleSuggestions(query);
                displaySuggestions(suggestions, event.target);
            }
        });
    });
});

/* style.css */

:root {
    /* Proměnné pro tmavý motiv (PlayStation styl) */
    --primary-bg: #1a1a2e; /* Tmavě modrofialová jako základ */
    --secondary-bg: #2b2c40; /* Trochu světlejší odstín */
    --text-color: #e0e0e0; /* Světlý text */
    --accent-color: #007bff; /* Modrá, může být PlayStation modrá #0070D1 */
    --ps-blue: #0070D1; /* PlayStation modrá */
    --ps-red: #d10000; /* PlayStation červená */
    --ps-green: #00d100; /* PlayStation zelená */
    --ps-yellow: #d1d100; /* PlayStation žlutá */
    --button-bg: #3c3e53; /* Tmavší tlačítka */
    --button-hover-bg: #52546e; /* Světlejší při najetí */
    --input-bg: #2b2c40; /* Pozadí inputu */
    --input-text-color: #ffffff;
    --placeholder-color: #a0a0a0;
    --border-color: #4f4f4f;
    --shadow-color: rgba(0, 0, 0, 0.5);
    --border-radius-main: 12px;
    --border-radius-button: 8px;
    --icon-size: 24px; /* Základní velikost ikon */
    --primary-bg-rgb: 26, 26, 46; /* Pro rgba() pozadí utility prvků */

    /* Proměnné pro světlý motiv */
    --light-primary-bg: #f4f6f8;
    --light-secondary-bg: #ffffff;
    --light-text-color: #212529;
    --light-accent-color: #007bff;
    --light-button-bg: #e9ecef;
    --light-button-hover-bg: #dee2e6;
    --light-input-bg: #f8f9fa;
    --light-input-text-color: #212529;
    --light-placeholder-color: #6c757d;
    --light-border-color: #ced4da;
    --light-shadow-color: rgba(0, 0, 0, 0.1);
}

/* Tmavý motiv */
body.dark-theme {
    background-color: var(--primary-bg);
    color: var(--text-color);
}

body.dark-theme .main-search-area,
body.dark-theme .bottom-utility-area {
    background-color: var(--secondary-bg);
    box-shadow: 0 4px 20px var(--shadow-color);
    border: 1px solid var(--border-color);
}

body.dark-theme input[type="text"] {
    background-color: var(--input-bg);
    color: var(--input-text-color);
    border: 1px solid var(--border-color);
}

body.dark-theme input[type="text"]::placeholder {
    color: var(--placeholder-color);
}

body.dark-theme .action-button,
body.dark-theme .search-type-btn,
body.dark-theme .search-source-btn,
body.dark-theme .lang-btn,
body.dark-theme .theme-btn,
body.dark-theme .layout-btn {
    background-color: var(--button-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);
}

body.dark-theme .action-button:hover,
body.dark-theme .search-type-btn:hover,
body.dark-theme .search-source-btn:hover,
body.dark-theme .lang-btn:hover,
body.dark-theme .theme-btn:hover,
body.dark-theme .layout-btn:hover {
    background-color: var(--button-hover-bg);
}

body.dark-theme .search-type-btn.active,
body.dark-theme .search-source-btn.active,
body.dark-theme .lang-btn.active,
body.dark-theme .theme-btn.active,
body.dark-theme .layout-btn.active {
    background-color: var(--ps-blue); /* PlayStation modrá pro aktivní */
    color: white;
    border-color: var(--ps-blue);
    box-shadow: 0 0 8px rgba(0, 112, 209, 0.7); /* PlayStation modrý stín */
}

/* Světlý motiv */
body.light-theme {
    background-color: var(--light-primary-bg);
    color: var(--light-text-color);
}

body.light-theme .main-search-area,
body.light-theme .bottom-utility-area {
    background-color: var(--light-secondary-bg);
    box-shadow: 0 4px 20px var(--light-shadow-color);
    border: 1px solid var(--light-border-color);
}

body.light-theme input[type="text"] {
    background-color: var(--light-input-bg);
    color: var(--light-input-text-color);
    border: 1px solid var(--light-border-color);
}

body.light-theme input[type="text"]::placeholder {
    color: var(--light-placeholder-color);
}

body.light-theme .action-button,
body.light-theme .search-type-btn,
body.light-theme .search-source-btn,
body.light-theme .lang-btn,
body.light-theme .theme-btn,
body.light-theme .layout-btn {
    background-color: var(--light-button-bg);
    color: var(--light-text-color);
    border: 1px solid var(--light-border-color);
}

body.light-theme .action-button:hover,
body.light-theme .search-type-btn:hover,
body.light-source-btn:hover,
body.light-theme .lang-btn:hover,
body.light-theme .theme-btn:hover,
body.light-theme .layout-btn:hover {
    background-color: var(--light-button-hover-bg);
}

body.light-theme .search-type-btn.active,
body.light-theme .search-source-btn.active,
body.light-theme .lang-btn.active,
body.light-theme .theme-btn.active,
body.light-theme .layout-btn.active {
    background-color: var(--accent-color); /* Použije accent barvu */
    color: white;
    border-color: var(--accent-color);
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

/* Základní styly */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden; /* Zabrání horizontálnímu scrollu kvůli animacím */
    position: relative;
}

/* Animované tvary na pozadí */
.background-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
}

.shape {
    position: absolute;
    opacity: 0.05; /* Velmi jemné */
    animation: float 20s infinite ease-in-out alternate;
    pointer-events: none; /* Zajišťuje, že se tvary nebudou chovat jako interaktivní prvky */
}

/* Keyframes pro animaci plovoucích tvarů */
@keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(20px, 30px) rotate(45deg); }
    50% { transform: translate(-10px, -20px) rotate(90deg); }
    75% { transform: translate(30px, -10px) rotate(135deg); }
    100% { transform: translate(0, 0) rotate(180deg); }
}

.triangle {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 80px solid var(--ps-blue);
    left: 10%;
    top: 20%;
    animation-delay: 0s;
    animation-duration: 25s;
}

.square {
    width: 70px;
    height: 70px;
    background-color: var(--ps-red);
    left: 70%;
    top: 10%;
    animation-delay: 5s;
    animation-duration: 22s;
}

.circle {
    width: 90px;
    height: 90px;
    background-color: var(--ps-yellow);
    border-radius: 50%;
    left: 30%;
    top: 80%;
    animation-delay: 10s;
    animation-duration: 28s;
}

.cross {
    width: 80px;
    height: 80px;
    position: relative;
    left: 85%;
    top: 60%;
    animation-delay: 15s;
    animation-duration: 20s;
}

.cross::before,
.cross::after {
    content: '';
    position: absolute;
    background-color: var(--ps-green);
}

.cross::before {
    width: 100%;
    height: 20%;
    top: 40%;
}

.cross::after {
    width: 20%;
    height: 100%;
    left: 40%;
}

/* Centrování hlavního obsahu */
.central-content-wrapper {
    flex-grow: 1; /* Zajistí, že zabere dostupný prostor */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
}

.main-search-area {
    background-color: var(--secondary-bg);
    padding: 30px;
    border-radius: var(--border-radius-main);
    box-shadow: 0 4px 20px var(--shadow-color);
    text-align: center;
    max-width: 900px; /* Omezí šířku hlavního boxu */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px; /* Mezery mezi sekcemi */
}

.trophy-logo-container {
    margin-bottom: 15px; /* Mezera mezi ikonou a nadpisem */
}

.trophy-logo {
    font-size: 6em; /* Velká ikona trofeje */
    color: var(--ps-blue); /* PlayStation modrá */
    text-shadow: 0 0 15px rgba(0, 112, 209, 0.8);
}

h1 {
    font-size: 2.5em;
    margin-top: 0;
    margin-bottom: 20px;
    color: var(--text-color);
    text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
}

.search-input-area {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    width: 100%;
}

input[type="text"] {
    padding: 12px 18px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-button);
    font-size: 1.1em;
    outline: none;
    transition: all 0.3s ease;
    flex-grow: 1; /* Aby se inputy roztáhly */
    min-width: 250px; /* Minimální šířka inputu */
}

input[type="text"]:focus {
    border-color: var(--ps-blue);
    box-shadow: 0 0 8px rgba(0, 112, 209, 0.5);
}

.action-button {
    padding: 12px 25px;
    border: none;
    border-radius: var(--border-radius-button);
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap; /* Zabraňuje zalomení textu tlačítka */
}

.action-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.action-button .material-icons-outlined {
    font-size: var(--icon-size);
}

/* Grid pro typy a zdroje */
.search-options-grid {
    width: 100%;
    margin-top: 25px;
    display: flex;
    flex-direction: column; /* Standardně pod sebou */
    gap: 30px; /* Mezera mezi typy a zdroji */
}

.search-type-selection,
.search-source-selection {
    text-align: center;
    width: 100%; /* Zajistí, že se roztáhnou na celou šířku */
}

h3 {
    font-size: 1.3em;
    margin-bottom: 15px;
    color: var(--text-color);
}

.button-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px; /* Mezera mezi tlačítky */
}

.search-type-btn,
.search-source-btn {
    padding: 10px 15px;
    border-radius: var(--border-radius-button);
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    flex-basis: calc(25% - 15px); /* 4 tlačítka na řádek, s mezerami */
    max-width: calc(25% - 15px);
    box-sizing: border-box; /* Zahrnuje padding a border do šířky */
}

.search-type-btn .material-icons-outlined,
.search-source-btn .material-icons-outlined {
    font-size: calc(var(--icon-size) * 0.9); /* O něco menší ikony na tlačítkách */
}

.search-type-btn:hover,
.search-source-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

/* Specifické rozložení pro typy (4 na řádek) */
.types-grid {
    margin-bottom: 20px; /* Dvojitý enter efekt */
}

/* Sloupcové rozložení pro typy a zdroje */
.columns-layout .search-options-grid {
    flex-direction: row; /* Změna na řádek pro sloupce */
    justify-content: space-around; /* Rozmístí sloupce */
    flex-wrap: wrap; /* Pro případ, že se nevejdou */
}

.columns-layout .search-type-selection,
.columns-layout .search-source-selection {
    flex: 1; /* Zajistí, že zaberou stejný prostor */
    min-width: 300px; /* Minimální šířka sloupce */
    max-width: 45%; /* Maximální šířka, aby se vešly dva vedle sebe */
}

.columns-layout .search-type-selection .button-grid,
.columns-layout .search-source-selection .button-grid {
    flex-direction: column; /* Tlačítka ve sloupcích */
    align-items: center;
}

.columns-layout .search-type-btn,
.columns-layout .search-source-btn {
    flex-basis: auto; /* Zruší pevnou šířku */
    width: 90%; /* Zabere většinu šířky sloupce */
    max-width: 250px; /* Omezí maximální šířku tlačítek ve sloupci */
    margin-bottom: 10px; /* Mezera mezi tlačítky ve sloupci */
}

/* Spodní lišta utility prvků */
.bottom-utility-area {
    display: flex;
    justify-content: flex-start; /* Zarovnání vlevo */
    align-items: center;
    padding: 15px 20px;
    background-color: var(--secondary-bg);
    border-top: 1px solid var(--border-color);
    box-shadow: 0 -2px 10px var(--shadow-color);
    gap: 30px; /* Mezera mezi utility skupinami */
    position: fixed; /* Pevná pozice */
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 100; /* Zajistí, že bude nad ostatním obsahem */
    flex-wrap: wrap; /* Pro responzivitu */
}

.utility-group {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: rgba(var(--primary-bg-rgb), 0.7); /* Mírně průhledné pozadí */
    padding: 8px 15px;
    border-radius: var(--border-radius-button);
    border: 1px solid var(--border-color);
}

.utility-group > span {
    font-size: 0.9em;
    font-weight: bold;
    color: var(--text-color);
    white-space: nowrap;
}

.language-selection,
.theme-selection,
.layout-selection {
    display: flex;
    gap: 5px;
}

.lang-btn,
.theme-btn,
.layout-btn {
    padding: 8px 12px;
    border-radius: var(--border-radius-button);
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    align-items: center;
    gap: 5px;
}

.lang-btn .material-icons-outlined,
.theme-btn .material-icons-outlined,
.layout-btn .material-icons-outlined {
    font-size: calc(var(--icon-size) * 0.8);
}

/* Toplist container */
.toplist-container {
    position: absolute;
    bottom: 60px; /* Nad spodní lištou utility a copyrightem */
    left: 50%;
    transform: translateX(-50%);
    z-index: 50; /* Pod utility lištou */
    text-align: center;
}

.toplist-container img {
    display: block; /* Odstraní extra mezeru pod obrázkem */
    margin: 0 auto;
}

/* Copyright vpravo dole */
.bottom-right-footer {
    position: fixed;
    bottom: 15px;
    right: 20px;
    color: var(--text-color);
    font-size: 0.8em;
    opacity: 0.7;
    z-index: 101; /* Nad všemi ostatními prvky */
}

/* Responzivita */
@media (max-width: 992px) {
    .main-search-area {
        padding: 25px;
        gap: 20px;
    }

    h1 {
        font-size: 2em;
    }

    .trophy-logo {
        font-size: 5em;
    }

    .search-type-btn,
    .search-source-btn {
        flex-basis: calc(33.33% - 15px); /* 3 tlačítka na řádek */
        max-width: calc(33.33% - 15px);
    }

    .columns-layout .search-type-selection,
    .columns-layout .search-source-selection {
        max-width: 90%; /* Sloupce zaberou více místa na menších obrazovkách */
    }

    .bottom-utility-area {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
        padding: 10px 15px;
    }

    .utility-group {
        width: 100%;
        justify-content: space-between;
    }
}

@media (max-width: 768px) {
    .central-content-wrapper {
        padding: 15px;
        align-items: flex-start; /* Zarovnání nahoru na mobilu, aby se vešlo více obsahu */
    }

    .main-search-area {
        margin-top: 20px; /* Trochu místa shora */
        padding: 20px;
        gap: 15px;
    }

    h1 {
        font-size: 1.8em;
    }

    .trophy-logo {
        font-size: 4em;
    }

    .search-input-area {
        flex-direction: column; /* Inputy pod sebou */
        align-items: stretch;
    }

    input[type="text"], .action-button {
        width: 100%;
        min-width: unset;
    }

    .search-options-grid {
        gap: 20px;
    }

    .search-type-btn,
    .search-source-btn {
        flex-basis: calc(50% - 10px); /* 2 tlačítka na řádek */
        max-width: calc(50% - 10px);
    }

    .columns-layout .search-type-btn,
    .columns-layout .search-source-btn {
        max-width: 100%; /* Plná šířka ve sloupcovém režimu na mobilu */
    }

    .bottom-utility-area {
        padding: 10px;
    }

    .bottom-right-footer {
        bottom: 5px;
        right: 10px;
        font-size: 0.7em;
    }

    .toplist-container {
        bottom: 120px; /* Posunutí výše kvůli mobilní utility liště */
        width: 100%;
    }
}

@media (max-width: 480px) {
    .main-search-area {
        margin: 10px;
        padding: 15px;
    }
    h1 {
        font-size: 1.5em;
    }
    .trophy-logo {
        font-size: 3em;
    }
    input[type="text"], .action-button {
        padding: 10px;
        font-size: 0.9em;
    }
    .action-button .material-icons-outlined {
        font-size: 18px;
    }
    .search-type-btn, .search-source-btn {
        flex-basis: calc(100% - 10px); /* 1 tlačítko na řádek */
        max-width: 100%;
        flex-direction: row; /* Zpět na řádek pro ikonu a text */
        justify-content: center;
        gap: 8px;
    }
    .columns-layout .search-type-btn, .columns-layout .search-source-btn {
        flex-basis: 100%; /* Ve sloupci zaberou plnou šířku */
        max-width: 100%;
    }
    .bottom-utility-area {
        padding: 5px;
        gap: 10px;
    }
    .utility-group {
        flex-direction: column; /* Label a tlačítka pod sebou */
        align-items: center;
        padding: 5px;
        border: none; /* Odstranění borderu na mobilu pro čistší vzhled */
        background-color: transparent; /* Zrušení pozadí skupiny */
    }
    .utility-group > span {
        font-size: 0.8em;
        margin-bottom: 5px;
        background-color: transparent !important; /* Odebrat pozadí labelů na mobilu */
    }
    .language-selection, .theme-selection, .layout-selection {
        width: 100%;
        justify-content: center;
    }
    .lang-btn, .theme-btn, .layout-btn {
        flex-grow: 1; /* Aby se tlačítka roztáhla */
        padding: 7px 10px;
        font-size: 0.8em;
    }
    .toplist-container {
        bottom: 190px; /* Posunutí výše pro velmi malé obrazovky */
    }
}

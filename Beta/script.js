document.addEventListener('DOMContentLoaded', () => {
    const gameNameInput = document.getElementById('gameName');
    const trophyNameInput = document.getElementById('trophyName');
    const buttons = document.querySelectorAll('.button-grid button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const gameName = gameNameInput.value.trim();
            const trophyName = trophyNameInput.value.trim();
            const engine = button.dataset.engine;
            const queryType = button.dataset.querytype;

            if (!gameName) {
                alert('Pros�m, zadej n�zev hry.');
                gameNameInput.focus();
                return;
            }

            let searchTerm = gameName;
            let specificQuery = "";

            switch (queryType) {
                // Google a obecn�
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
                        alert('Pros�m, zadej n�zev trofeje/achievementu pro toto vyhled�v�n�.');
                        trophyNameInput.focus();
                        return;
                    }
                    specificQuery = `"${trophyName}" trophy achievement guide`;
                    break;

                // YouTube specifick� (mohou b�t stejn� nebo upraven� pro video)
                case 'roadmap_video':
                    specificQuery = 'video trophy roadmap guide';
                    break;
                case 'collectibles_video':
                    specificQuery = 'all collectibles video guide';
                    break;
                case 'maps_video':
                    specificQuery = 'map guide video walkthrough';
                    break;
                case 'weapons_video':
                    specificQuery = 'weapons showcase locations video';
                    break;
                case 'upgrades_video':
                    specificQuery = 'full upgrade video guide';
                    break;
                case 'speedrun_video':
                    specificQuery = 'speedrun video';
                    break;
                case 'all_quests_video':
                    specificQuery = 'main quests video walkthrough';
                    break;
                case 'all_side_quests_video':
                    specificQuery = 'all side quests video guide';
                    break;
                case 'videos_general':
                    specificQuery = 'gameplay videos'; // Nebo jen pr�zdn� pro obecn� vyhled�v�n� hry
                    break;
                case 'specific_trophy_video':
                    if (!trophyName) {
                        alert('Pros�m, zadej n�zev trofeje/achievementu pro toto vyhled�v�n�.');
                        trophyNameInput.focus();
                        return;
                    }
                    specificQuery = `"${trophyName}" trophy achievement video guide`;
                    break;
                case 'hardest_difficulty_video':
                    specificQuery = 'hardest difficulty playthrough video';
                    break;
                default:
                    alert('Nezn�m� typ dotazu!');
                    return;
            }

            searchTerm = `${gameName} ${specificQuery}`;
            
            let searchUrl;
            if (engine === 'google') {
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
            } else if (engine === 'youtube') {
                searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
            }

            if (searchUrl) {
                window.open(searchUrl, '_blank');
            }
        });
    });
});

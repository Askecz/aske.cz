document.addEventListener('DOMContentLoaded', () => {
    const gameNameInput = document.getElementById('gameName');
    const trophyNameInput = document.getElementById('trophyName');
    const buttons = document.querySelectorAll('.button-grid button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const gameName = gameNameInput.value.trim();
            const trophyName = trophyNameInput.value.trim(); // Optional
            const engine = button.dataset.engine;
            const queryType = button.dataset.querytype;

            if (!gameName) {
                alert('Prosím, zadej název hry.');
                gameNameInput.focus();
                return;
            }

            let specificQuery = ""; // Additional query for specific searches

            // Determine specific query based on queryType
            switch (queryType) {
                // Google specific queries
                case 'full_guide':
                    specificQuery = 'full guide walkthrough';
                    break;
                case 'roadmap':
                    specificQuery = 'trophy guide and roadmap';
                    break;
                case 'speedrun':
                    specificQuery = 'speedrun guide tips';
                    break;
                case 'hardest_difficulty':
                    specificQuery = 'hardest difficulty guide walkthrough';
                    break;
                case 'specific_trophy':
                    if (!trophyName) {
                        alert('Prosím, zadej název trofeje/achievementu pro toto vyhledávání.');
                        trophyNameInput.focus();
                        return;
                    }
                    specificQuery = `"${trophyName}" trophy achievement guide`;
                    break;
                case 'diaries':
                    specificQuery = 'all diaries locations guide';
                    break;
                case 'all_characters':
                    specificQuery = 'all characters guide';
                    break;
                case 'all_music':
                    specificQuery = 'all music soundtrack locations';
                    break;
                case 'records':
                    specificQuery = 'all records recordings locations';
                    break;
                case 'interviews':
                    specificQuery = 'all interviews locations';
                    break;
                case 'statues':
                    specificQuery = 'all statues locations guide';
                    break;
                case 'paintings':
                    specificQuery = 'all paintings locations guide';
                    break;
                case 'documents':
                    specificQuery = 'all documents locations guide';
                    break;
                case 'photos':
                    specificQuery = 'all photos locations guide';
                    break;
                case 'artifacts':
                    specificQuery = 'all artifacts locations guide';
                    break;
                case 'treasures':
                    specificQuery = 'all treasures locations guide';
                    break;
                case 'runes':
                    specificQuery = 'all runes locations guide';
                    break;
                case 'dlc':
                    specificQuery = 'DLC expansions guide';
                    break;
                case 'echos':
                    specificQuery = 'all echos locations guide';
                    break;
                case 'relics':
                    specificQuery = 'all relics locations guide';
                    break;
                case 'weapon_upgrades':
                    specificQuery = 'all weapon upgrades guide';
                    break;
                case 'character_upgrades':
                    specificQuery = 'all character upgrades guide';
                    break;
                case 'ability_upgrades':
                    specificQuery = 'all ability upgrades guide';
                    break;
                case 'all_upgrades':
                    specificQuery = 'all upgrades guide';
                    break;
                case 'health_upgrades':
                    specificQuery = 'health upgrades guide';
                    break;
                case 'energy_upgrades':
                    specificQuery = 'energy upgrades guide';
                    break;
                case 'all_bosses':
                    specificQuery = 'all bosses guide strategy';
                    break;
                case 'puzzles':
                    specificQuery = 'all logical puzzles solutions';
                    break;
                case 'challenges':
                    specificQuery = 'all challenges guide';
                    break;
                case 'all_fish':
                    specificQuery = 'all fish locations guide';
                    break;
                case 'all_keys':
                    specificQuery = 'all keys locations guide';
                    break;
                case 'all_blueprints':
                    specificQuery = 'all blueprints locations guide';
                    break;
                case 'minigames':
                    specificQuery = 'all minigames guide';
                    break;
                case 'costumes':
                    specificQuery = 'all costumes skins locations';
                    break;
                case 'all_emails':
                    specificQuery = 'all emails locations';
                    break;
                case 'all_collectibles':
                    specificQuery = 'all collectibles locations guide';
                    break;
                case 'all_main_quests':
                    specificQuery = 'all main quests walkthrough';
                    break;
                case 'all_side_quests':
                    specificQuery = 'all side quests guide locations';
                    break;
                case 'good_ending':
                    specificQuery = 'good ending guide';
                    break;
                case 'bad_ending':
                    specificQuery = 'bad ending guide';
                    break;
                case 'secret_ending':
                    specificQuery = 'secret ending guide';
                    break;
                case 'all_endings':
                    specificQuery = 'all endings guide';
                    break;
                case 'all_secrets':
                    specificQuery = 'all secrets guide';
                    break;

                // YouTube specific queries (often with "video" or "walkthrough" added)
                case 'full_guide_video':
                    specificQuery = 'full video guide walkthrough';
                    break;
                case 'roadmap_video':
                    specificQuery = 'video trophy roadmap guide';
                    break;
                case 'all_collectibles_video':
                    specificQuery = 'all collectibles video guide';
                    break;
                case 'notes_video':
                    specificQuery = 'notes lore video guide';
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
                case 'all_main_quests_video':
                    specificQuery = 'main quests video walkthrough';
                    break;
                case 'all_side_quests_video':
                    specificQuery = 'all side quests video guide';
                    break;
                case 'videos_general':
                    specificQuery = 'gameplay videos';
                    break;
                case 'specific_trophy_video':
                    if (!trophyName) {
                        alert('Prosím, zadej název trofeje/achievementu pro toto vyhledávání.');
                        trophyNameInput.focus();
                        return;
                    }
                    specificQuery = `"${trophyName}" trophy achievement video guide`;
                    break;
                case 'hardest_difficulty_video':
                    specificQuery = 'hardest difficulty playthrough video';
                    break;
                case 'all_characters_video':
                    specificQuery = 'all characters video';
                    break;
                case 'all_bosses_video':
                    specificQuery = 'all bosses video guide';
                    break;
                case 'all_secrets_video':
                    specificQuery = 'all secrets video';
                    break;
                case 'all_music_video':
                    specificQuery = 'all music video soundtrack';
                    break;
                case 'costumes_video':
                    specificQuery = 'all costumes skins video';
                    break;
                case 'good_ending_video':
                    specificQuery = 'good ending video';
                    break;
                case 'bad_ending_video':
                    specificQuery = 'bad ending video';
                    break;
                case 'secret_ending_video':
                    specificQuery = 'secret ending video';
                    break;
                case 'all_endings_video':
                    specificQuery = 'all endings video';
                    break;

                // PSNProfiles specific queries
                case 'game_page':
                    specificQuery = ''; // For game search on PSNProfiles, just the game name
                    break;
                case 'roadmap_psn':
                    specificQuery = 'trophy guide roadmap';
                    break;
                case 'specific_trophy_psn':
                    if (!trophyName) {
                        alert('Prosím, zadej název trofeje/achievementu pro toto vyhledávání.');
                        trophyNameInput.focus();
                        return;
                    }
                    specificQuery = `"${trophyName}" trophy guide`;
                    break;

                // PowerPyx specific queries
                case 'game_guide_pp':
                    specificQuery = 'trophy guide walkthrough';
                    break;
                case 'roadmap_pp':
                    specificQuery = 'trophy roadmap';
                    break;
                case 'collectibles_pp':
                    specificQuery = 'collectibles guide';
                    break;
                case 'specific_trophy_pp':
                    if (!trophyName) {
                        alert('Prosím, zadej název trofeje/achievementu pro toto vyhledávání.');
                        trophyNameInput.focus();
                        return;
                    }
                    specificQuery = `"${trophyName}" trophy guide`;
                    break;

                // TrueTrophies specific queries
                case 'game_guide_tt':
                    specificQuery = 'achievements guide walkthrough';
                    break;
                case 'roadmap_tt':
                    specificQuery = 'achievements roadmap';
                    break;
                case 'collectibles_tt':
                    specificQuery = 'collectibles guide';
                    break;
                case 'specific_trophy_tt':
                    if (!trophyName) {
                        alert('Prosím, zadej název trofeje/achievementu pro toto vyhledávání.');
                        trophyNameInput.focus();
                        return;
                    }
                    specificQuery = `"${trophyName}" achievement guide`;
                    break;

                default:
                    alert('Neznámý typ dotazu!');
                    return;
            }

            // Construct the final search term
            const finalSearchTerm = `${gameName} ${specificQuery}`.trim();
            
            let searchUrl;
            if (engine === 'google') {
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(finalSearchTerm)}`;
            } else if (engine === 'youtube') {
                // Corrected Youtube URL
                searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(finalSearchTerm)}`;
            } else if (engine === 'psnprofiles') {
                // PSNProfiles search via Google site search
                searchUrl = `https://www.google.com/search?q=site:psnprofiles.com+${encodeURIComponent(finalSearchTerm)}`;
            } else if (engine === 'powerpyx') {
                // PowerPyx search via Google site search
                searchUrl = `https://www.google.com/search?q=site:powerpyx.com+${encodeURIComponent(finalSearchTerm)}`;
            } else if (engine === 'truetrophies') {
                // TrueTrophies search via Google site search
                searchUrl = `https://www.google.com/search?q=site:truetrophies.com+${encodeURIComponent(finalSearchTerm)}`;
            } else {
                alert('Neznámý vyhledávací engine!');
                return;
            }

            if (searchUrl) {
                window.open(searchUrl, '_blank');
            }
        });
    });
});

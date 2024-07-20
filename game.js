import { gameState } from './gamestate.js';
import { encounters, manageCutscenes } from './encounters.js';

// Function to update the UI
function updateUI() {
    const character = gameState.characters[gameState.currentPlayer];
    document.getElementById('character-name').innerText = character.name;

    // Display the character's image
    const characterImage = document.getElementById('character-image');
    characterImage.src = character.image;
    characterImage.alt = character.name;

    // Log the current game state to the console
    console.log("Current game state:", gameState);

    // Display the current game state on the screen
    const gameStateDisplay = document.getElementById('game-state');
    gameStateDisplay.innerHTML = `
        <p>Current Player: ${character.name}</p>
        <p>Position: (${character.position.x}, ${character.position.y})</p>
        <p>Items: ${character.items.join(', ')}</p>
    `;

    // Clear previous options
    const gameOptions = document.getElementById('game-options');
    gameOptions.innerHTML = '';

    // Add new options (example for movement)
    ['up', 'down', 'left', 'right'].forEach(direction => {
        const button = document.createElement('button');
        button.innerText = direction;
        button.onclick = () => {
            moveCharacter(direction);
            checkEncounter(character);
        };
        gameOptions.appendChild(button);
    });

    // Add additional options based on character's position and items

    // Update character switch buttons
    updateCharacterSwitchButtons();

    // Render the map
    renderMap();
}

// Function to handle movement
function moveCharacter(direction) {
    const character = gameState.characters[gameState.currentPlayer];
    switch(direction) {
        case 'up':
            character.position.y = Math.max(character.position.y - 1, 0);
            break;
        case 'down':
            character.position.y = Math.min(character.position.y + 1, 9);
            break;
        case 'left':
            character.position.x = Math.max(character.position.x - 1, 0);
            break;
        case 'right':
            character.position.x = Math.min(character.position.x + 1, 9);
            break;
    }
    updateUI();
}

// Function to handle choices
function makeChoice(choice) {
    // Logic for handling different choices
}

// Function to switch characters
function switchCharacter(characterIndex) {
    gameState.currentPlayer = characterIndex;
    updateUI();
}

// Function to update character switch buttons
function updateCharacterSwitchButtons() {
    const characterSwitch = document.getElementById('character-switch');
    characterSwitch.innerHTML = '';

    gameState.characters.forEach((character, index) => {
        const button = document.createElement('button');
        button.innerText = character.name;
        button.onclick = () => switchCharacter(index);
        characterSwitch.appendChild(button);
    });
}

// Function to render the map
function renderMap() {
    const mapContainer = document.getElementById('game-map');
    mapContainer.innerHTML = '';

    // Create a 10x10 grid
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement('div');
            cell.className = 'map-cell';
            
            gameState.characters.forEach(character => {
                if (character.position.x === x && character.position.y === y) {
                    cell.classList.add('character-cell');
                    cell.innerHTML += `<img src="${character.image}" alt="${character.name}" class="character-icon">`;
                }
            });

            // Check if the cell contains an encounter
            encounters.forEach(encounter => {
                if (encounter.location.x === x && encounter.location.y === y) {
                    cell.classList.add('encounter-cell');
                    cell.innerHTML += `<img src="${encounter.iconPath}" alt="${encounter.name}" class="encounter-icon">`;
                }
            });

            mapContainer.appendChild(cell);
        }
    }
}

// Function to check for and handle encounters
function checkEncounter(character) {
    const encounter = encounters.find(encounter => 
        encounter.location.x === character.position.x && 
        encounter.location.y === character.position.y
    );

    if (encounter) {
        handleEncounter(character, encounter);
    }
}

// Function to handle encounters
function handleEncounter(character, encounter) {
    console.log(`Encounter: ${character.name} encounters ${encounter.name}`);
    // Display encounter details or cutscene based on type
    showCutscene(character, encounter);
}

// Function to show a cutscene
function showCutscene(character, encounter) {
    const cutsceneImage = document.createElement('img');
    cutsceneImage.src = manageCutscenes(encounter, character);
    cutsceneImage.alt = `${character.name} vs ${encounter.name}`;
    document.body.appendChild(cutsceneImage);
}

// Initialize the game
function initGame() {
    updateUI();
}

// Start the game
initGame();

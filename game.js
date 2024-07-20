import { gameState } from './gamestate.js';
import { encounters, manageCutscenes, getChoicesForEncounter } from './encounters.js';
import {addItemToCharacter} from './interactions.js'
import {showStory} from './storyboard.js'

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
        <p>Position: (${character.position.x}, ${character.position.y})</p>
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

    // Display items
    const inventoryContainer = document.getElementById('inventory');
    inventoryContainer.innerHTML = '';
    character.items.slice(0, 4).forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'inventory-item';
        itemElement.innerHTML = `<img src="${item.icon}" alt="${item.name}" class="inventory-icon"> ${item.name}`;
        inventoryContainer.appendChild(itemElement);
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
    renderMap();
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
    } else {
        document.getElementById('encounter-overlay').style.display = 'none'; // Hide overlay if no encounter
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
    const encounterOverlay = document.getElementById('encounter-overlay');
    const cutsceneImage = document.getElementById('cutscene-image');
    const cutsceneMessage = document.getElementById('cutscene-message');
    const cutsceneChoices = document.getElementById('cutscene-choices');

    cutsceneImage.src = manageCutscenes(encounter, character);
    cutsceneImage.alt = `${character.name} vs ${encounter.name}`;

    // Set the message
    cutsceneMessage.innerHTML = `You have encountered ${encounter.name}!`;

    // Clear previous choices and add new ones
    cutsceneChoices.innerHTML = '';
    const choices = getChoicesForEncounter(encounter); // Implement this function to return choices based on the encounter

    choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => handleChoice(choice.action); // Implement this function to handle choice actions
        cutsceneChoices.appendChild(button);
    });

    encounterOverlay.style.display = 'block'; // Show the encounter overlay
}


// Example function to handle choice actions
function handleChoice(action) {
    // Implement the logic to handle the choice
    console.log(`Choice selected: ${action}`);
    // Hide the overlay after handling choice or perform other actions
    document.getElementById('encounter-overlay').style.display = 'none';
}

function setupInitialItems() {
    const character = gameState.characters[0]; // Assuming you want to add items to the first character
    addItemToCharacter(character, { name: 'Flashlight', icon: './images/icons/note.png' });
    addItemToCharacter(character, { name: 'Map', icon: './images/icons/shotgun.png' })
}

// Initialize the game
function initGame() {
    setupInitialItems();
    updateUI();
}

// Start the game
initGame();
showStory();
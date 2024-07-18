// game.js

// Character class
class Character {
    constructor(id, name, skill) {
        this.id = id;
        this.name = name;
        this.skill = skill;
        this.position = { x: 0, y: 0 };
        this.items = [];
    }
}

// Game state
const gameState = {
    characters: [
        new Character(1, 'Dan', 'Strength'),
        new Character(2, 'Kai', 'Stealth'),
        new Character(3, 'Rey', 'Intelligence'),
        new Character(4, 'Yuvi', 'Charisma')
    ],
    monster: {
        position: { x: 5, y: 5 }
    },
    currentPlayer: 0
};

// Function to update the UI
function updateUI() {
    const character = gameState.characters[gameState.currentPlayer];
    document.getElementById('character-name').innerText = character.name;

    // Log the current game state to the console
    console.log("Current game state:", gameState);

    // Display the current game state on the screen
    const gameStateDisplay = document.getElementById('game-state');
    gameStateDisplay.innerHTML = `
        <p>Current Player: ${character.name}</p>
        <p>Position: (${character.position.x}, ${character.position.y})</p>
        <p>Items: ${character.items.join(', ')}</p>
        <p>Monster Position: (${gameState.monster.position.x}, ${gameState.monster.position.y})</p>
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
            moveMonster();
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
            
            // Check if the cell contains a character
            gameState.characters.forEach(character => {
                if (character.position.x === x && character.position.y === y) {
                    cell.classList.add('character-cell');
                    cell.innerText = character.name.charAt(0); // Display the first letter of the character's name
                }
            });

            // Check if the cell contains the monster
            if (gameState.monster.position.x === x && gameState.monster.position.y === y) {
                cell.classList.add('monster-cell');
                cell.innerText = 'M'; // Display "M" for the monster
            }

            mapContainer.appendChild(cell);
        }
    }
}

// Function to move the monster
function moveMonster() {
    const directions = ['up', 'down', 'left', 'right'];
    const direction = directions[Math.floor(Math.random() * directions.length)];

    switch(direction) {
        case 'up':
            gameState.monster.position.y = Math.max(gameState.monster.position.y - 1, 0);
            break;
        case 'down':
            gameState.monster.position.y = Math.min(gameState.monster.position.y + 1, 9);
            break;
        case 'left':
            gameState.monster.position.x = Math.max(gameState.monster.position.x - 1, 0);
            break;
        case 'right':
            gameState.monster.position.x = Math.min(gameState.monster.position.x + 1, 9);
            break;
    }
    updateUI();
}

// Initialize the game
function initGame() {
    updateUI();
}

// Start the game
initGame();

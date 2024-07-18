import { Character } from './character.js';

export const gameState = {
    characters: [
        new Character(1, 'Dan', 'Science', './graphics/dan/dan_profile.svg'),
        new Character(2, 'Kai', 'Technology', './graphics/kai/kai_profile.svg'),
        new Character(3, 'Rey', 'Intelligence', './graphics/rey/rey_profile.svg'),
        new Character(4, 'Yuvi', 'Strength', './graphics/yuvi/yuvi_profile.svg')
    ],
    monster: {
        position: { x: 5, y: 5 }
    },
    currentPlayer: 0
};

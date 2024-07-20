import { Character } from './character.js';

export const gameState = {
    characters: [
        new Character(1, 'Dan', 'Mad Scientist', './graphics/dan/dan_profile.svg', { x: 0, y: 3 }),
        new Character(2, 'Kai', 'Tech Wiz', './graphics/kai/kai_profile.svg', { x: 8, y: 8 }),
        new Character(3, 'Rey', 'Detective', './graphics/rey/rey_profile.svg', { x: 6, y: 6 }),
        new Character(4, 'Yuvi', 'Athlete', './graphics/yuvi/yuvi_profile.svg', { x: 5, y: 5 })
    ],
    monster: null,
    currentPlayer: 0
};

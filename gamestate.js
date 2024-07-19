import { Character } from './character.js';

export const gameState = {
    characters: [
        new Character(1, 'Dan', 'Mad Scientist', './graphics/dan/dan_profile.svg'),
        new Character(2, 'Kai', 'Tech Wiz', './graphics/kai/kai_profile.svg'),
        new Character(3, 'Rey', 'Detective', './graphics/rey/rey_profile.svg'),
        new Character(4, 'Yuvi', 'Athlete', './graphics/yuvi/yuvi_profile.svg')
    ],
    monster: null,
    currentPlayer: 0
};

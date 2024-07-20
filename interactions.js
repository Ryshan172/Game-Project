export function addItemToCharacter(character, item) {
    if (character.items.length < 4) {
        character.items.push(item);
    } else {
        console.log(`${character.name} cannot carry more items.`);
    }
}


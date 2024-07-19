export const encounters = [
    {
        type: 'story',
        name: 'Winslow',
        location: { x: 2, y: 3 },
        dialogueId: 1,
        journalId: 101,
        winCondition: 'none',
        weakness: 'none'
    },
    {
        type: 'monster',
        name: 'Werewolf',
        location: { x: 4, y: 5 },
        dialogueId: 2,
        journalId: 102,
        winCondition: 'silver bullet',
        weakness: 'silver'
    },
    {
        type: 'item',
        name: 'Mystery Box',
        location: { x: 7, y: 8 },
        dialogueId: 3,
        journalId: 103,
        winCondition: 'none',
        weakness: 'none'
    },
    {
        type: 'monster',
        name: 'Killer',
        location: { x: 9, y: 5 },
        dialogueId: 2,
        journalId: 104,
        winCondition: 'shotgun',
        weakness: 'bullets'
    },
    {
        type: 'story',
        name: 'Tracy',
        location: { x: 6, y: 3 },
        dialogueId: 5,
        journalId: 105,
        winCondition: 'none',
        weakness: 'none'
    },
    {
        type: 'item',
        name: 'Computer',
        location: { x: 9, y: 8 },
        dialogueId: 3,
        journalId: 103,
        winCondition: 'Tech Wiz',
        weakness: 'none'
    },
];


export function manageCutscenes(encounter, character) {
    let cutscene;
    let characterName = character.name;
    let characterSkill = character.skill;
    let characterItems = character.items;
    let encounterName = encounter.name;

    if (encounterName == 'Werewolf') {
        switch (characterName) {
            case 'Yuvi' :
                cutscene = `./images/encounters/yuvi_v_wolf.png`;
                break;
            case 'Dan' :
                cutscene = `./images/encounters/dan_v_wolf.png`;
                break;
            case 'Kai' :
                cutscene = `./images/encounters/kai_v_wolf.png`;
                break;
            case 'Rey' :
                cutscene = `./images/encounters/rey_v_wolf.png`;
                break;
        }
    }


    if (encounterName == 'Killer') {
        switch (characterName) {
            case 'Yuvi' :
                cutscene = `./images/encounters/yuvi_v_killer.png`;
                break;
            case 'Dan' :
                cutscene = `./images/encounters/dan_v_killer.png`;
                break;
            case 'Kai' :
                cutscene = `./images/encounters/kai_v_killer.png`;
                break;
            case 'Rey' :
                cutscene = `./images/encounters/rey_v_killer.png`;
                break;
        }
    }

    if (encounterName == 'Tracy') {
        cutscene = `./images/scenepack/tracy1.png`;
    }

    if (encounterName == 'Winslow') {
        cutscene = `./images/scenepack/winslow1.png`;
    }

    if (encounter.type === 'item') {
        handleItemInteraction(encounter, characterSkill)
    }


    return cutscene;
}

export function handleItemInteraction(item, characterSkill) {

    if (characterSkill == item.winCondition) {
        console.log("Well done");
    }

}
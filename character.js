export class Character {
    constructor(id, name, skill, image) {
        this.id = id;
        this.name = name;
        this.skill = skill;
        this.image = image;
        this.position = { x: 0, y: 0 };
        this.items = [];
    }
}

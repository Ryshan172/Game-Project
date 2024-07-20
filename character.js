export class Character {
    constructor(id, name, skill, image, position = { x: 0, y: 0 }, items = []) {
        this.id = id;
        this.name = name;
        this.skill = skill;
        this.image = image;
        this.position = position;
        this.items = items;
    }
}

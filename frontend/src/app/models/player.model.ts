export class Player {

    constructor(
        private id: string,
        private name: string
    ) { }
    playerId() {
        return this.id;
    }
    playerName() {
        return this.name;
    }
}

export class Player {
    public static STATE = {
        ONLINE: 1,
        IN_LOBBY: 2,
        IN_MATCH: 3,
    }
    private status: number;

    constructor(
        private id: string,
        private name: string,
    ) { }
    playerId() {
        return this.id;
    }
    playerName() {
        return this.name;
    }
    getStatus() {
        return this.status;
    }
    setStatus(state:number) {
        if (state === Player.STATE.IN_LOBBY || state === Player.STATE.IN_MATCH || state === Player.STATE.ONLINE) {
            this.status = state;
        } else {
            return false;
        }
    }
}

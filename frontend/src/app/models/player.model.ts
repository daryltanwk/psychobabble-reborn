export enum PlayerState {
    OFFLINE = 0,
    ONLINE = 1,
    IN_LOBBY = 2,
    IN_MATCH = 3
}

export class Player {
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

    // for testing only. the below code will not be needed because the backend should do the actual setting of statuses
    setStatus(state: number) {
        if (state === PlayerState.IN_LOBBY || state === PlayerState.IN_MATCH || state === PlayerState.ONLINE) {
            this.status = state;
        }
    }
}

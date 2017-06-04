import { Player } from './player.model';

export class Lobby {
    private players: Array<Player>;

    constructor(
        private id: string,
        private name: string
    ) { }

    playerCount() {
        return this.players.length;
    }

    playerList() {
        return this.players;
    }

    lobbyId() {
        return this.id;
    }

    lobbyName() {
        return this.name;
    }
}

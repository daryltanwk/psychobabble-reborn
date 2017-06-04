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

    // for testing only. the below code will not be needed because the backend should do the actual adding
    addPlayer(player:Player) { 
        this.players.push(player);
    }
    removePlayer(player: Player) {
        const pIndex = this.players.indexOf(player);
        this.players.splice(pIndex, 1);
    }
}

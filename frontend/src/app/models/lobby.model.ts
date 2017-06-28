import { Player } from './player.model';

export class Lobby {
    private players: Array<Player>;

    constructor(
        private id: string,
        private name: string,
        private timeCreated = new Date(),
    ) {
        this.players = [];
    }

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
    addPlayer(player: Player) {
        this.players.push(player);
    }
    removePlayer(player: Player) {
        const pIndex = this.players.findIndex((currentPlayer) => {
            return player.playerId() === currentPlayer.playerId();
        });
        this.players.splice(pIndex, 1);
    }
}

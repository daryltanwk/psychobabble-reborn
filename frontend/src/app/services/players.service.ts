import { DatastoreService } from './datastore.service';
import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';

@Injectable()
export class PlayersService {
  private players: Array<Player>;

  constructor(private datastoreService: DatastoreService) {
    this.datastoreService.playerObs.subscribe((playerData: Array<Player>) => {
      this.players = playerData.slice(0);
    });
  }

  getPlayers() {
    return this.players;
  }

  getPlayersOfState(state:number) {
    return this.players.filter((p) => {
      return p.getStatus() === state;
    });
  }

  getPlayerCount() {
    return this.players.length;
  }

  addPlayer(playerName: string) {
    // insert actual backend call here
    this.datastoreService.addPlayer(playerName);
  }

  removePlayer(playerId: string) {
    // insert actual backend call here
    this.datastoreService.playerQuits(playerId);
    this.datastoreService.removePlayer(playerId);
  }

}

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

  getPlayerCount() {
    return this.players.length;
  }

  addPlayer(playerName: string) {
    // insert actual backend call here
    // const player = new Player((this.players.length + 1).toString(), playerName);
    // this.players.push(player);
    this.datastoreService.addPlayer(playerName);
  }

  removePlayer(playerId: string) {
    // insert actual backend call here
    // const index = this.players.findIndex((player) => {
    //   return (player.playerId() === playerId);
    // });

    // this.players.splice(index, 1);
    this.datastoreService.playerQuits(playerId);
    this.datastoreService.removePlayer(playerId);
  }

}

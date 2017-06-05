import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';

@Injectable()
export class PlayersService {
  private players: Array<Player>;

  private mockPlayers = [
    new Player('1', 'player-one'),
    new Player('2', 'player-two'),
    new Player('3', 'player-three'),
    new Player('4', 'player-four'),
    new Player('5', 'player-five'),
    new Player('6', 'player-six'),

  ];

  constructor() {
    this.populatePlayers();
  }

  populatePlayers() {
    // insert actual backend call here
    this.players = this.mockPlayers;
  }

  getPlayers() {
    return this.players;
  }

  getPlayerCount() {
    return this.players.length;
  }

  addPlayer(playerName: string) {
    // insert actual backend call here
    const player = new Player((this.players.length+1).toString(), playerName);
    this.players.push(player);
  }

  removePlayer(playerId: string) {
    // insert actual backend call here
    const index = this.players.findIndex((player) => {
      return (player.playerId() === playerId);
    });

    this.players.splice(index, 1);
  }

}

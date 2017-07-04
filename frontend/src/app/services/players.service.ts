import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DatastoreService } from './datastore.service';
import { Player } from '../models/player.model';

@Injectable()
export class PlayersService {
  private players: Array<Player>;
  private playersSub: Subscription;
  currentPlayer = null;

  constructor(private datastoreService: DatastoreService) {
    this.playersSub = this.datastoreService.playerObs.subscribe((playerData: Array<Player>) => {
      this.players = playerData;
    });
  }

  logIn(playerId: string) {
    this.currentPlayer = playerId;
  }

  logOut() {
    this.currentPlayer = null;
    this.removePlayer(this.currentPlayer);
  }

  getPlayers() {
    return this.players;
  }

  getPlayersOfState(state: number) {
    return this.players.filter((p) => {
      return p.getStatus() === state;
    });
  }

  getPlayerCount() {
    return this.players.length;
  }

  registerPlayer(playerName: string): Observable<boolean> {
    const observable = Observable.create((observer) => {
      setTimeout(() => {
        const result = this.datastoreService.registerPlayer(playerName);
        if (result) {
          observer.next(result);
          observer.complete()
        } else {
          observer.error('Sorry, "' + playerName + '" is already taken.');
        }
      }, 1500);
    });
    return observable;
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

import { Injectable } from '@angular/core';
import { Lobby } from '../models/lobby.model';
import { DatastoreService } from './datastore.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class LobbyService {
  private lobbies: Array<Lobby>;
  private lobbySub: Subscription;
  constructor(private datastoreService: DatastoreService) {
    this.lobbySub = this.datastoreService.lobbyObs.subscribe((lobbyData: Lobby[]) => {
      this.lobbies = lobbyData.slice(0);
    });
  }

  getLobbies() {
    return this.lobbies;
  }

  getLobby(id: string) {
    return this.lobbies.find((lobby) => {
      return lobby.lobbyId() === id;
    });
  }

  createLobby(name: string) {
    // insert actual backend call here
    this.datastoreService.createLobby(name);
  }

  removeLobby(id) {
    // insert actual backend call here
    this.datastoreService.removeLobby(id);
  }

  playerJoins(playerId: string, lobbyId: string) {
    // insert actual backend call
    this.datastoreService.playerJoins(playerId, lobbyId);
  }

  playerLeaves(playerId: string, lobbyId: string) {
    // insert actual backend call
    this.datastoreService.playerLeaves(playerId, lobbyId);
  }

  playerQuits(playerId: string) {
    this.datastoreService.playerQuits(playerId);
  }

}

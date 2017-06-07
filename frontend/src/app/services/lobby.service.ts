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
    // this.lobbies.push(new Lobby((this.lobbies.length + 1).toString(), name));
    this.datastoreService.createLobby(name);
  }

  removeLobby(id) {
    // insert actual backend call here
    // const index = this.lobbies.findIndex((lobby) => {
    //   return (lobby.lobbyId() === id);
    // });

    // if (typeof index !== 'undefined') {
    //   this.lobbies.splice(index, 1);
    // }
    this.datastoreService.removeLobby(id);
  }

  playerJoins(playerId: string, lobbyId: string) {
    // insert actual backend call
    // const player: Player = this.playerService.getPlayers().find((player) => {
    //   return player.playerId() === playerId;
    // });
    // const lobby: Lobby = this.lobbies.find((lobby) => {
    //   return lobby.lobbyId() === lobbyId;
    // });

    // lobby.addPlayer(player);
    this.datastoreService.playerJoins(playerId, lobbyId);
  }

  playerLeaves(playerId: string, lobbyId: string) {
    // insert actual backend call
    // const player: Player = this.playerService.getPlayers().find((player) => {
    //   return player.playerId() === playerId;
    // });
    // const lobby: Lobby = this.lobbies.find((lobby) => {
    //   return lobby.lobbyId() === lobbyId;
    // });

    // lobby.removePlayer(player);
    this.datastoreService.playerLeaves(playerId, lobbyId);
  }

  playerQuits(playerId: string) {
    //   const player: Player = this.playerService.getPlayers().find((player) => {
    //     return player.playerId() === playerId;
    //   });
    //   this.lobbies.forEach((lobby) => {
    //     lobby.removePlayer(player);
    //   });
    // }
    this.datastoreService.playerQuits(playerId);
  }

}

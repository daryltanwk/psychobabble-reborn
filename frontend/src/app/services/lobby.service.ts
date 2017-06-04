import { Injectable } from '@angular/core';
import { Lobby } from '../models/lobby.model';
import { PlayersService } from '../services/players.service';

@Injectable()
export class LobbyService {
  private lobbies: Array<Lobby>;
  private mockLobbies = [
    new Lobby('1', 'lobby-one'),
    new Lobby('2', 'lobby-two'),
    new Lobby('3', 'lobby-three'),
    new Lobby('4', 'lobby-four'),
    new Lobby('5', 'lobby-five'),
    new Lobby('6', 'lobby-six'),
    new Lobby('7', 'lobby-seven'),
    new Lobby('8', 'lobby-eight'),
    new Lobby('9', 'lobby-nine'),
  ];

  constructor(private playerService: PlayersService) {
    this.populateLobbies();
  }

  populateLobbies() {
    // insert actual backend call here
    this.lobbies = this.mockLobbies;
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
    this.lobbies.push(new Lobby(this.lobbies.length.toString(), name));
  }

  removeLobby(id) {
    // insert actual backend call here
    const index = this.lobbies.findIndex((lobby) => {
      return (lobby.lobbyId() === id);
    });

    if (typeof index !== 'undefined') {
      this.lobbies.splice(index, 1);
    }
  }

  playerJoins(playerId: string, lobbyId: string) {
    // insert actual backend call

  }
  playerLeaves(playerId: string, lobbyId: string) {
    // insert actual backend call
  }
}
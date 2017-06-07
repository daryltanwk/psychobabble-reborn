// This Service is a emulation of the actual database/backend and should be removed from the app once backend is ready
import { Injectable } from '@angular/core';

import { Lobby } from './../models/lobby.model';
import { Player } from './../models/player.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@Injectable()
export class DatastoreService {
  private playersData: Array<Player>;
  private lobbiesData: Array<Lobby>;

  playerObs = new BehaviorSubject([]);
  lobbyObs = new BehaviorSubject([]);
  constructor() {
    // Initialize the datastore with some values to feed to services

    this.playersData = [
      new Player('1', 'player-one'),
      new Player('2', 'player-two'),
      new Player('3', 'player-three'),
      new Player('4', 'player-four'),
      new Player('5', 'player-five'),
      new Player('6', 'player-six'),
    ];

    this.lobbiesData = [
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
    this.updateLobbies();
    this.updatePlayers();
  }

  updateLobbies() {
    // create a deep clone
    setTimeout(() => {
      const result = _.cloneDeep(this.lobbiesData);
      this.lobbyObs.next(result);
    }, 1500); // emulate latency
  }

  updatePlayers() {
    setTimeout(() => {
      const result = _.cloneDeep(this.playersData);
      this.playerObs.next(result);
    }, 2500); // emulate latency
  }

  createLobby(name: string) {
    this.lobbiesData.push(new Lobby((this.lobbiesData.length + 1).toString(), name));
    // this.updateLobbies();
  }

  removeLobby(id) {
    const index = this.lobbiesData.findIndex((lobby) => {
      return (lobby.lobbyId() === id);
    });

    if (typeof index !== 'undefined') {
      this.lobbiesData.splice(index, 1);
    }
    this.updateLobbies();
  }

  playerJoins(playerId: string, lobbyId: string) {
    // insert actual backend call
    const _player: Player = this.playersData.find((player) => {
      return player.playerId() === playerId;
    });
    const _lobby: Lobby = this.lobbiesData.find((lobby) => {
      return lobby.lobbyId() === lobbyId;
    });

    _lobby.addPlayer(_player);
    this.updateLobbies();
  }

  playerLeaves(playerId: string, lobbyId: string) {
    // insert actual backend call
    const _player: Player = this.playersData.find((player) => {
      return player.playerId() === playerId;
    });
    const _lobby: Lobby = this.lobbiesData.find((lobby) => {
      return lobby.lobbyId() === lobbyId;
    });

    _lobby.removePlayer(_player);
    this.updateLobbies();
  }

  playerQuits(playerId: string) {
    const _player: Player = this.playersData.find((player) => {
      return player.playerId() === playerId;
    });
    this.lobbiesData.forEach((lobby) => {
      lobby.removePlayer(_player);
    });
    this.updateLobbies();
  }

  addPlayer(playerName: string) {
    // insert actual backend call here
    const player = new Player((this.playersData.length + 1).toString(), playerName);
    this.playersData.push(player);
    this.updatePlayers();
  }

  removePlayer(playerId: string) {
    // insert actual backend call here
    const index = this.playersData.findIndex((player) => {
      return (player.playerId() === playerId);
    });

    this.playersData.splice(index, 1);
    this.updatePlayers();
  }

}

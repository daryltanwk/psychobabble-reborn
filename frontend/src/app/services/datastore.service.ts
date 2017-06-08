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
      new Player(this.makeId(), 'player-one'),
      new Player(this.makeId(), 'player-two'),
      new Player(this.makeId(), 'player-three'),
      new Player(this.makeId(), 'player-four'),
      new Player(this.makeId(), 'player-five'),
      new Player(this.makeId(), 'player-six'),
    ];

    this.lobbiesData = [
      new Lobby(this.makeId(), 'lobby-one'),
      new Lobby(this.makeId(), 'lobby-two'),
      new Lobby(this.makeId(), 'lobby-three'),
      new Lobby(this.makeId(), 'lobby-four'),
      new Lobby(this.makeId(), 'lobby-five'),
      new Lobby(this.makeId(), 'lobby-six'),
      new Lobby(this.makeId(), 'lobby-seven'),
      new Lobby(this.makeId(), 'lobby-eight'),
      new Lobby(this.makeId(), 'lobby-nine'),
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
    this.lobbiesData.push(new Lobby(this.makeId(), name));
    this.updateLobbies();
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
    const player = new Player(this.makeId(), playerName);
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

  makeId() {
    return Math.random().toString(36).substr(2, 5);
  }

}

// This Service is a emulation of the actual database/backend and should be removed from the app once backend is ready
import { Injectable } from '@angular/core';

import { Lobby } from './../models/lobby.model';
import { Player, PlayerState } from './../models/player.model';
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
      new Player(this.makeId(), 'player-seven'),
      new Player(this.makeId(), 'player-eight'),
      new Player(this.makeId(), 'player-nine'),
      new Player(this.makeId(), 'player-ten'),
      new Player(this.makeId(), 'player-eleven'),
      new Player(this.makeId(), 'player-twelve'),
      new Player(this.makeId(), 'player-thirteen'),
      new Player(this.makeId(), 'player-fourteen'),
      new Player(this.makeId(), 'player-fifteen'),
      new Player(this.makeId(), 'player-sixteen'),
      new Player(this.makeId(), 'player-seventeen'),
      new Player(this.makeId(), 'player-eighteen'),
    ];

    this.lobbiesData = [];

    this.playersData.forEach((plyr) => {
      plyr.setStatus(PlayerState.ONLINE);
    });

    this.updateLobbies();
    this.updatePlayers();
  }

  updateLobbies() {
    // create a deep clone
    setTimeout(() => {
      const result = _.cloneDeep(this.lobbiesData);
      this.lobbyObs.next(result);
    }, 1); // emulate latency
  }

  updatePlayers() {
    setTimeout(() => {
      const result = _.cloneDeep(this.playersData);
      this.playerObs.next(result);
    }, 1); // emulate latency
  }

  createLobby(name: string, hostId: string) {
    const lobbyId = this.makeId();
    this.lobbiesData.push(new Lobby(lobbyId, name));
    this.playerJoins(hostId, lobbyId);

    this.updateLobbies();
    this.updatePlayers();
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

    // update player status
    _player.setStatus(PlayerState.IN_LOBBY);

    this.updatePlayers();
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
    if (_lobby.playerCount() === 0) {
      this.removeLobby(lobbyId);
    }
    // update player status
    _player.setStatus(PlayerState.ONLINE);

    this.updatePlayers();
    this.updateLobbies();
  }

  playerQuits(playerId: string) {
    const _player: Player = this.playersData.find((player) => {
      return player.playerId() === playerId;
    });
    this.lobbiesData.forEach((lobby) => {
      lobby.removePlayer(_player);
    });

    // update player status
    _player.setStatus(null);

    this.updatePlayers();
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

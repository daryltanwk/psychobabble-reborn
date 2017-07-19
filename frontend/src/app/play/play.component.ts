import { Component, OnInit } from '@angular/core';

import { PlayersService } from '../services/players.service';
import { LobbyService } from '../services/lobby.service';
import { Player, PlayerState } from '../models/player.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  selectedLobbyId: string;
  playerStates = PlayerState;

  // temporary variables
  formLobbyId: string;
  formLobbyName: string;
  formHostId: string;
  formPlayerId: string;
  formPlayerName: string;
  formLobbyPlayerId: string;

  ngOnInit() { }

  constructor(private playersService: PlayersService, private lobbyService: LobbyService) { }

  lobbySelected() {
    return (this.selectedLobbyId);
  }

  shouldHighlight(id: string) {
    return (typeof this.selectedLobbyId !== 'undefined' && id === this.selectedLobbyId);
  }

  displayDetails(lobbyId: string) {
    if (typeof this.selectedLobbyId !== 'undefined' && this.selectedLobbyId === lobbyId) {
      this.selectedLobbyId = undefined;
    } else {
      this.selectedLobbyId = lobbyId;
    }
  }

  addLobby() {
    this.lobbyService.createLobby(this.formLobbyName, this.formHostId);
  }
  removeLobby() {
    this.lobbyService.removeLobby(this.formLobbyId);
  }
  addPlayer() {
    this.playersService.addPlayer(this.formPlayerName);
  }
  removePlayer() {
    this.playersService.removePlayer(this.formPlayerId);
  }
  playerJoinsLobby() {
    this.lobbyService.playerJoins(this.formLobbyPlayerId, this.formLobbyId);
  }
  playerLeavesLobby() {
    this.lobbyService.playerLeaves(this.formLobbyPlayerId, this.formLobbyId);
  }

}

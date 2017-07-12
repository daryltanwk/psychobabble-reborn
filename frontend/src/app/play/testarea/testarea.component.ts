import { LobbyService } from './../../services/lobby.service';
import { PlayersService } from './../../services/players.service';
import { Component, OnInit } from '@angular/core';

import { PlayerState } from '../../models/player.model';

@Component({
  selector: 'app-testarea',
  templateUrl: './testarea.component.html',
  styleUrls: ['./testarea.component.css']
})
export class TestareaComponent implements OnInit {
  playerStates = PlayerState;
  formLobbyId: string;
  formLobbyName: string;
  formHostId: string;
  formPlayerId: string;
  formPlayerName: string;
  formLobbyPlayerId: string;

  constructor(private playersService: PlayersService, private lobbyService: LobbyService) { }

  ngOnInit() {
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

import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { PlayersService } from '../services/players.service';
import { LobbyService } from '../services/lobby.service';
import { Player, PlayerState } from '../models/player.model';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  selectedLobbyId: string;
  playerStates = PlayerState;
  newLobbyForm: FormGroup;
  @ViewChild('newLobbyModal') newLobbyModal: ModalDirective;

  // temporary variables
  formLobbyId: string;
  formLobbyName: string;
  formHostId: string;
  formPlayerId: string;
  formPlayerName: string;
  formLobbyPlayerId: string;

  ngOnInit() {
    this.newLobbyForm = new FormGroup({
      lobbyName: new FormControl(null, Validators.required)
    });
  }

  constructor(private playersService: PlayersService, private lobbyService: LobbyService) { }

  onSubmit() {
    this.newLobbyModal.hide();
    this.lobbyService.createLobby(this.newLobbyForm.get('lobbyName').value, this.playersService.currentPlayer)
  }

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

  // Test Functions Below

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

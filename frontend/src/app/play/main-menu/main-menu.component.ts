import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { PlayersService } from '../../services/players.service';
import { LobbyService } from '../../services/lobby.service';
import { Player, PlayerState } from '../../models/player.model';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  selectedLobbyId: string;
  playerStates = PlayerState;
  newLobbyForm: FormGroup;
  @ViewChild('newLobbyModal') newLobbyModal: ModalDirective;
  @ViewChild('lobbyName') lobbyName: ElementRef;

  constructor(private playersService: PlayersService, private lobbyService: LobbyService) { }

  ngOnInit() {
    this.newLobbyForm = new FormGroup({
      lobbyName: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const lobbyName = this.newLobbyForm.get('lobbyName').value;
    const hostId = this.playersService.currentPlayer;
    this.newLobbyModal.hide();
    this.lobbyService.createLobby(lobbyName, hostId);
  }

  focusInput() {
    this.lobbyName.nativeElement.focus();
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
}

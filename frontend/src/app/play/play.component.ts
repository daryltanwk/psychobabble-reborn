import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { PlayersService } from '../services/players.service';
import { Player } from '../models/player.model';
import { Lobby } from '../models/lobby.model';
import { LobbyService } from '../services/lobby.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, AfterContentChecked {
  lobbies: Array<Lobby>;
  players: Array<Player>;
  selectedLobby: Lobby;

  // temporary variables
  formLobbyId: string;
  formLobbyName: string;
  formPlayerId: string;
  formPlayerName: string;
  formLobbyPlayerId: string;


  constructor(private playersService: PlayersService, private lobbyService: LobbyService) { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.lobbies = this.lobbyService.getLobbies();
    this.players = this.playersService.getPlayers();
  }

  lobbySelected() {
    return (this.selectedLobby);
  }

  shouldHighlight(id: string) {
    return (typeof this.selectedLobby !== 'undefined' && id === this.selectedLobby.lobbyId());
  }

  displayDetails(lobbyData: Lobby) {
    if (typeof this.selectedLobby !== 'undefined' && this.selectedLobby.lobbyId() === lobbyData.lobbyId()) {
      this.selectedLobby = undefined;
    } else {
      this.selectedLobby = lobbyData;
    }
  }

  addLobby() {
    this.lobbyService.createLobby(this.formLobbyName);
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

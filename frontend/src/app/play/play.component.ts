import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../services/players.service';
import { Player } from '../models/player.model';
import { Lobby } from '../models/lobby.model';
import { LobbyService } from '../services/lobby.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  lobbies: Array<Lobby>;
  players: Array<Player>;
  selectedLobby: { id: string, name: string };

  placeholder = '<best-game>';
  placeholder2 = '</best-game>';
  count: number;

  // temporary variables
  formLobbyId: string;
  formLobbyName: string;
  formPlayerId: string;
  formPlayerName: string;


  constructor(private playersService: PlayersService, private lobbyService: LobbyService) { }

  ngOnInit() {
    this.lobbies = this.lobbyService.getLobbies();
    this.players = this.playersService.getPlayers();
  }

  lobbySelected() {
    return (this.selectedLobby);
  }

  shouldHighlight(id: string) {
    return (typeof this.selectedLobby !== 'undefined' && id === this.selectedLobby.id);
  }

  displayDetails(lobbyData: { id: string, name: string }) {
    if (typeof this.selectedLobby !== 'undefined' && this.selectedLobby.id === lobbyData.id) {
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

}

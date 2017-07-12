import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from './../../guards/in-game.guard';
import { LobbyService } from './../../services/lobby.service';
import { PlayersService } from './../../services/players.service';

@Component({
  selector: 'app-main-stage',
  templateUrl: './main-stage.component.html',
  styleUrls: ['./main-stage.component.css']
})
export class MainStageComponent implements OnInit, CanComponentDeactivate {

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    const currentLobby = this.lobbyService.currentLobby;
    const currentPlayer = this.playersService.currentPlayer;
    if (currentLobby && confirm('Are you sure you want to leave this game?')) {
      this.lobbyService.playerLeaves(currentPlayer, currentLobby);
      return true;
    } else {
      return false;
    }
  }


  constructor(private playersService: PlayersService, private lobbyService: LobbyService) { }

  ngOnInit() {
  }

}

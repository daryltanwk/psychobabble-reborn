import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Player, PlayerState } from './../models/player.model';
import { PlayersService } from './players.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  currentPlayerId: string;

  constructor(private playersService: PlayersService) {
    // always start logged out
    this.currentPlayerId = null;
  }

  registerPlayer(playerName: string) {
    // calls the backend to create a new user
    this.currentPlayerId = this.playersService.addPlayer(playerName);
    
  }

  isRegistered(playerName: string): boolean | string {
    // checks if a user already exists (by name)
    let result = this.playersService.getPlayers().find((plyr) => {
      return (plyr.playerName() === playerName);
    });

    if (typeof result === 'undefined') {
      return false;
    } else {
      return result.playerId();
    }
  }

  loginPlayer(playerId: string) {
    // claims the user to this session
    this.playersService.login(playerId);
    this.currentPlayerId = playerId;
  }

  logoutPlayer() {
    this.playersService.logout(this.currentPlayerId);
    this.currentPlayerId = null;
  }

}

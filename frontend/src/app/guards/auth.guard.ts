import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { PlayersService } from './../services/players.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private playersService: PlayersService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    switch (state.url.slice(1)) {
      case 'register':
        if (this.playersService.currentPlayer === null) {
          return true;
        } else {
          this.router.navigate(['/play']);
          return false;
        }
      case 'play':
        if (this.playersService.currentPlayer === null) {
          this.router.navigate(['/register']);
          return false;
        } else {
          return true;
        }
      default:
        return false;
    }
  }
}

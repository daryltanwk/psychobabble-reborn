import { Component, OnInit, Input } from '@angular/core';

import { Lobby } from './../../models/lobby.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  @Input() lobby: Lobby;
  @Input() highlight: false;

  constructor() { }

  ngOnInit() {
  }

  isActive() {
    if (this.highlight) {
      return 'active';
    } else {
      return '';
    }
  }
}

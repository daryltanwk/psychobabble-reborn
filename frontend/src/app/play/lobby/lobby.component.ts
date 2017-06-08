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

  panelType() {
    if (this.highlight) {
      return 'panel-info';
    } else {
      return 'panel-default';
    }
  }
}

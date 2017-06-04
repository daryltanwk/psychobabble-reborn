import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LobbyService } from '../../services/lobby.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Output() selectedLobby = new EventEmitter<{ id: string, name: string }>();
  @Input() highlight: false;

  constructor(private lobbyService: LobbyService) { }

  ngOnInit() {
  }

  panelType() {
    if (this.highlight) {
      return 'panel-info';
    } else {
      return 'panel-default';
    }
  }

  selectLobby() {
    this.selectedLobby.emit({
      id: this.id,
      name: this.name,
    });
  }

}

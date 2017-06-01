import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  placeholder: string = "<best-game>";
  placeholder2: string = "</best-game>";
  constructor() { }

  ngOnInit() {
  }

}

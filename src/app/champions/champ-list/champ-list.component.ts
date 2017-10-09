import { Component, OnInit } from '@angular/core';
import { Champion } from 'app/classes/champion';
import { DataService } from 'app/core/data.service';
import { HyperlinkingService } from 'app/core/hyperlinking.service';

@Component({
  selector: 'app-champ-list',
  templateUrl: './champ-list.component.html',
  styleUrls: ['./champ-list.component.css']
})
export class ChampListComponent implements OnInit {
  arrayOfKeys: any[];
  champions: Champion[];

  constructor(protected loldata: DataService, protected common: HyperlinkingService) { }

  ngOnInit() {
    this.champions = Array.from(this.loldata.champions.values());
  }

  // cool 1-line ES6 functions (instead of old 4-line ES5 functions)
  makeInfoURL = (champKey) => `/champions/${champKey}`;
}

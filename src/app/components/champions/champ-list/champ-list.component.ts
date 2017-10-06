import { Component, OnInit } from '@angular/core';
// import {Observable} from 'rxjs/Observable';
import { DataService } from './../../../../app/services/data.service';
import { SortService } from './../../../../app/services/sort.service';
import { Champion } from 'app/classes/champion';
import { CommonService } from "app/services/common.service";

@Component({
  selector: 'app-champ-list',
  templateUrl: './champ-list.component.html',
  styleUrls: ['./champ-list.component.css']
})
export class ChampListComponent implements OnInit {
  loading = false;
  arrayOfKeys: any[];
  champions: Champion[];

  constructor(protected loldata: DataService, protected common: CommonService) { }

  ngOnInit() {

    // TODO - hide/show spinner
    if (!this.loldata.dataVersion) {
      this.loading = true;
      console.log('calling get champions from list-view');
      this.loldata.getData().then(() => {
        this.loading = false;
        this.champions = Array.from(this.loldata.champions.values());
      });
    } else {
      this.champions = Array.from(this.loldata.champions.values());
    }
  }

  // cool 1-line ES6 functions (instead of old 4-line ES5 functions)
  makeInfoURL = (champKey) => `#/champions/${champKey}`;
}

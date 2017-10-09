import { Component, OnInit } from '@angular/core';
import { Rune } from 'app/classes/rune';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-rune-list',
  templateUrl: './rune-list.component.html',
  styleUrls: ['./rune-list.component.css']
})
export class RuneListComponent implements OnInit {

  loading: boolean;
  runes: Array<Rune>;

  constructor(protected loldata: DataService) { }

  ngOnInit() {
    if (!this.loldata.dataVersion) {
      this.loading = true;
      console.log('calling get champions from list-view');
      this.loldata.getData().then(() => {
        this.loading = false;
        this.runes = Array.from(this.loldata.runes.values());
      });
    } else {
      this.runes = Array.from(this.loldata.runes.values());
    }
  }

  makeInfoURL = (runeId) => `#/runes/${runeId}`;

}

import { Component, OnInit } from '@angular/core';
import { Rune } from 'app/classes/rune';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-rune-list',
  templateUrl: './rune-list.component.html',
  styleUrls: ['./rune-list.component.css']
})
export class RuneListComponent implements OnInit {

  runes: Array<Rune>;

  constructor(protected loldata: DataService) { }

  ngOnInit() {
    this.runes = Array.from(this.loldata.runes.values());
  }


  makeInfoURL = (runeId) => `#/runes/${runeId}`;

}

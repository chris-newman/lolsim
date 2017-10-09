import { Component, OnInit } from '@angular/core';
import { Mastery } from 'app/classes/mastery';
import { DataService } from 'app/core/data.service';


@Component({
  selector: 'app-mastery-list',
  templateUrl: './mastery-list.component.html',
  styleUrls: ['./mastery-list.component.css']
})
export class MasteryListComponent implements OnInit {
  loading: boolean;
  masteries: Array<Mastery>;

  constructor(protected loldata: DataService) { }

  ngOnInit() {
    this.masteries = Array.from(this.loldata.masteries.values());
  }


  // TO DO: decide whether or not to move this function to a common service
  makeInfoURL = (masteryId) => `#/masteries/${masteryId}`;
}

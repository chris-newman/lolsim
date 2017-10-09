import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Mastery } from 'app/classes/mastery';
import { DataService } from 'app/core/data.service';
import { SimService } from 'app/core/sim.service';

@Component({
  selector: 'app-mastery-info',
  templateUrl: './mastery-info.component.html',
  styleUrls: ['./mastery-info.component.css']
})
export class MasteryInfoComponent implements OnInit {
  loading: boolean;
  sub: any;
  mastery: Mastery;


  constructor(protected loldata: DataService, private route: ActivatedRoute, protected sim: SimService) { }

  ngOnInit() {
    console.log('mastery info on init');

    this.sub = this.route.params.subscribe((params) => {
      console.log('params: ' + params);
      // this.champIconPromise = this.makeIconImagePromise(params.champKey);
      this.mastery = this.loldata.getMasteryById(params.masteryId);
      console.log(this.mastery);
      this.loading = false;
    });

    // this.displayBlock = 'abilities';
    // console.log('sim service selected champion: ' + this.sim.getChampion());
  }

}

import { Component, OnInit } from '@angular/core';
import { DataService } from "app/services/data.service";
import { SimService } from "app/services/sim.service";
import { ActivatedRoute } from '@angular/router';
import { Mastery } from "app/classes/mastery";

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
    if (!this.loldata.dataVersion) {
      this.loading = true;
      this.loldata.getData().then(() => {
        this.sub = this.route.params.subscribe((params) => {
          console.log('params: ' + params);
          // this.champIconPromise = this.makeIconImagePromise(params.champKey);
          this.mastery = this.loldata.getMasteryById(params.masteryId);
          console.log(this.mastery);
          this.loading = false;
        });
      });
    } else {
      this.sub = this.route.params.subscribe((params) => {
        console.log('params: ' + params);
        // this.champIconPromise = this.makeIconImagePromise(params.champKey);
        this.mastery = this.loldata.getMasteryById(params.masteryId);
        console.log(this.mastery);
        this.loading = false;
      });
    }
    // this.displayBlock = 'abilities';
    // console.log('sim service selected champion: ' + this.sim.getChampion());
  }

}

import { Component, OnInit } from '@angular/core';
import { Rune } from 'app/classes/rune';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'app/shared/data.service';
import { SimService } from 'app/shared/sim.service';

@Component({
  selector: 'app-rune-info',
  templateUrl: './rune-info.component.html',
  styleUrls: ['./rune-info.component.css']
})
export class RuneInfoComponent implements OnInit {
  loading: boolean;
  sub: any;
  rune: Rune;


  constructor(protected loldata: DataService, private route: ActivatedRoute, protected sim: SimService) { }

  ngOnInit() {
    console.log('mastery info on init');
    if (!this.loldata.dataVersion) {
      this.loading = true;
      this.loldata.getData().then(() => {
        this.sub = this.route.params.subscribe((params) => {
          console.log('params: ' + params);
          // this.champIconPromise = this.makeIconImagePromise(params.champKey);
          this.rune = this.loldata.getRuneById(params.runeId);
          console.log(this.rune);
          this.loading = false;
        });
      });
    } else {
      this.sub = this.route.params.subscribe((params) => {
        console.log('params: ' + params);
        // this.champIconPromise = this.makeIconImagePromise(params.champKey);
        this.rune = this.loldata.getRuneById(params.runeId);
        console.log(this.rune);
        this.loading = false;
      });
    }
    // this.displayBlock = 'abilities';
    // console.log('sim service selected champion: ' + this.sim.getChampion());
  }
}

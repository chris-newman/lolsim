import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from 'app/classes/item';
import { DataService } from 'app/shared/data.service';
import { SimService } from 'app/shared/sim.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  loading: boolean;
  sub: any;
  item: Item;


  constructor(protected loldata: DataService, private route: ActivatedRoute, protected sim: SimService) { }

  ngOnInit() {
    console.log('champ info on init');
    if (!this.loldata.dataVersion) {
      this.loading = true;
      this.loldata.getData().then(() => {
        this.sub = this.route.params.subscribe((params) => {
          console.log('params: ' + params);
          // this.champIconPromise = this.makeIconImagePromise(params.champKey);
          this.item = this.loldata.getItemById(params.itemId);
          console.log(this.item);
          this.loading = false;
        });
      });
    } else {
      this.sub = this.route.params.subscribe((params) => {
        console.log('params: ' + params);
        // this.champIconPromise = this.makeIconImagePromise(params.champKey);
        this.item = this.loldata.getItemById(params.itemId);
        console.log(this.item);
        this.loading = false;
      });
    }
    // this.displayBlock = 'abilities';
    // console.log('sim service selected champion: ' + this.sim.getChampion());
  }

}

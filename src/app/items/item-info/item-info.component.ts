import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from 'app/classes/item';
import { DataService } from 'app/core/data.service';
import { SimService } from 'app/core/sim.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  sub: any;
  item: Item;

  constructor(protected loldata: DataService, private route: ActivatedRoute, protected sim: SimService) { }

  ngOnInit() {
    console.log('champ info on init');

    this.sub = this.route.params.subscribe((params) => {
      console.log('params: ' + params.itemKey);
      // this.champIconPromise = this.makeIconImagePromise(params.champKey);
      this.item = this.loldata.getItemById(params.itemKey);
      console.log(this.item);
    });
  }

}

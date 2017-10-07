import { Component, OnInit } from '@angular/core';
import { Item } from 'app/classes/item';
import { DataService } from 'app/shared/data.service';
import { SimService } from 'app/shared/sim.service';
import { CommonService } from 'app/shared/common.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  loading: boolean;
  items: Array<Item>;
  itemTree: any;
  constructor(protected loldata: DataService, protected sim: SimService, protected common: CommonService) { }

  ngOnInit() {
    if (!this.loldata.dataVersion) {
      this.loading = true;
      console.log('calling get champions from list-view');
      this.loldata.getData().then(() => {
        this.loading = false;
        this.items = Array.from(this.loldata.items.values());
        this.itemTree = this.loldata.getItemTree();
        console.log(this.itemTree);
      });
    } else {
      this.items = Array.from(this.loldata.items.values());
      this.itemTree = this.loldata.getItemTree();
      console.log(this.itemTree);
    }
  }

  makeInfoURL = (itemId) => `#/items/${itemId}`;
  // makeIconImageURL = (itemId) => `http://ddragon.leagueoflegends.com/cdn/${this.loldata.dataVersion}/img/item/${itemId}.png`;


}

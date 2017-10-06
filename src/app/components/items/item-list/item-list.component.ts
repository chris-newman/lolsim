import { Component, OnInit } from '@angular/core';
import { DataService } from "app/services/data.service";
import { Item } from "app/classes/item";
import { SimService } from "app/services/sim.service";
import { CommonService } from "app/services/common.service";

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

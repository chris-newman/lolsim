import { Component, OnInit } from '@angular/core';
import { Item } from 'app/classes/item';
import { DataService } from 'app/core/data.service';
import { SimService } from 'app/core/sim.service';
import { HyperlinkingService } from 'app/core/hyperlinking.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Array<Item>;
  itemTree: any;
  constructor(protected loldata: DataService, protected sim: SimService, protected common: HyperlinkingService) { }

  ngOnInit() {
    this.items = Array.from(this.loldata.items.values());
    this.itemTree = this.loldata.getItemTree();
    // console.log(this.itemTree);
  }

  makeInfoURL = (itemId) => `/items/${itemId}`;
  // makeIconImageURL = (itemId) => `http://ddragon.leagueoflegends.com/cdn/${this.loldata.dataVersion}/img/item/${itemId}.png`;


}

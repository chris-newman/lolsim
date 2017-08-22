import { Component, OnInit } from '@angular/core';
import { DataService } from "app/services/data.service";
import { Item } from "app/classes/item";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  loading: boolean;
  items: Array<Item>;
  constructor(protected loldata: DataService) { }

  ngOnInit() {
    if (!this.loldata.dataVersion) {
      this.loading = true;
      console.log('calling get champions from list-view');
      this.loldata.getData().then(() => {
        this.loading = false;
        this.items = Array.from(this.loldata.items.values());
      });
    } else {
      this.items = Array.from(this.loldata.items.values());
    }
  }

  makeInfoURL = (itemId) => `#/items/${itemId}`;

}

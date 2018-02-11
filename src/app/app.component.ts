import { Component, OnInit } from '@angular/core';
import { HyperlinkingService } from 'app/core/hyperlinking.service';
import { SimService } from 'app/core/sim.service';
import { DataService } from 'app/core/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = false;
  title = 'app works!';

  // hack for ngFor based on a number
  Arr = Array;

  constructor(protected loldata: DataService, protected sim: SimService, protected common: HyperlinkingService) {}

  ngOnInit() {
    // taking care of loading data in app component, so other components don't have to
    if (!this.loldata.dataVersion) {
      this.loading = true;
      this.loldata.getData().then(() => {
        this.loading = false;
      });
    }
  }

  // TODO: move outside of AppComponent
  needPlaceHolderItems() {
    // console.log('called needPlaceholderItems');
    // console.log('returned: ' + (6 - this.sim.itemSet.getItems().length));
    return 6 - this.sim.itemSet.getItems().length;
  }
}

import { Component, OnInit } from '@angular/core';
import { SimService } from "app/services/sim.service";
import { CommonService } from "app/services/common.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  // hack for ngFor based on a number
  Arr = Array;


  constructor(protected sim: SimService, protected common: CommonService) {
    console.log('app constructor called');
  }

  ngOnInit() {
    console.log('app ngOnInit');
  }


  // TODO: move outside of AppComponent
  needPlaceHolderItems() {
    // console.log('called needPlaceholderItems');
    // console.log('returned: ' + (6 - this.sim.itemSet.getItems().length));
    return 6 - this.sim.itemSet.getItems().length;
  }
}

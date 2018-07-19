import { Component, OnInit } from '@angular/core';
import { SimService } from 'app/core/sim.service';
import { DataService } from 'app/core/data.service';
import { ImagePreloaderService } from './core/image-preloader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = false;
  title = 'app works!';

  constructor(protected loldata: DataService, protected sim: SimService, public preloader: ImagePreloaderService) {}

  ngOnInit() {
    // taking care of loading data in app component, so other components don't have to
    if (!this.loldata.dataVersion) {
      this.loading = true;
      this.loldata.getData().then(() => {
        this.preloader.preloadChampImagesFromMap(this.loldata.champions, this.loldata.dataVersion);
        this.preloader.preloadItemImagesFromMap(this.loldata.items, this.loldata.dataVersion);
        this.loading = false;
      });
    }
  }
}

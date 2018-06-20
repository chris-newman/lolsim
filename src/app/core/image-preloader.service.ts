import { Injectable } from '@angular/core';
import { Champion } from '../classes/champion';

@Injectable({
  providedIn: 'root'
})
export class ImagePreloaderService {
  loading = false;
  champImages = new Array();
  constructor() { }

  // make it easy to call this fn using loldata.champions
  preloadChampImagesFromMap(champs: Map<string, Champion>, dataVersion: string) {
    console.log('preloading champ images...');
    this.loading = true;
    champs.forEach((champ, key) => {
      this.champImages[key] = new Image();
      this.champImages[key].src = `http://ddragon.leagueoflegends.com/cdn/${dataVersion}/img/champion/${champ.key}.png`;
    })
    this.loading = false;
    console.log('done');
  }

  preloadItemImages() { }
}

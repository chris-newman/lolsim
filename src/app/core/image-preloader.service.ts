import { Injectable } from '@angular/core';
import { Champion } from '../classes/champion';
import { Item } from '../classes/item';

@Injectable({
  providedIn: 'root'
})
export class ImagePreloaderService {
  loading = false;
  champImages = new Array();
  itemImages = new Array();
  constructor() { }

  // make it easy to call this fn using loldata.champions
  preloadChampImagesFromMap(champs: Map<string, Champion>, dataVersion: string) {
    console.log('preloading ' + champs.size + 'champ images...');
    this.loading = true;
    champs.forEach((champ, key) => {
      this.champImages[key] = new Image();
      this.champImages[key].src = `http://ddragon.leagueoflegends.com/cdn/${dataVersion}/img/champion/${champ.key}.png`;
    })
    this.loading = false;
    console.log('done');
  }

  preloadItemImagesFromMap(items: Map<string, Item>, dataVersion: string) {
    this.loading = true;
    console.log('preloading ' + items.size + 'item images...');

    items.forEach((item, key) => {
      this.itemImages[key] = new Image();
      this.itemImages[key].src = `http://ddragon.leagueoflegends.com/cdn/${dataVersion}/img/item/${item.id}.png`;
    })
    this.loading = false;
  }
}

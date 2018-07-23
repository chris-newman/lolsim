import { Injectable } from '@angular/core';
import { Champion } from '../classes/champion';
import { Item } from '../classes/item';

@Injectable({
  providedIn: 'root'
})
export class ImagePreloaderService {
  loading = false;
  champImagesLoading = false;
  itemImagesLoading = false;

  champImages = new Array();
  itemImages = new Array();

  champImageCount = 0;
  itemImageCount = 0;
  failedItemImageCount = 0;
  failedChampImageCount = 0;
  successChampImageCount = 0;
  successItemImageCount = 0;

  // when preloading fails, store src url in this array
  failedImages = Array<string>();

  // TODO: failed images
  constructor() { }

  // make it easy to call this fn using loldata.champions
  preloadChampImagesFromMap(champs: Map<string, Champion>, dataVersion: string) {
    this.champImageCount = champs.size;
    this.champImagesLoading = true;
    champs.forEach((champ) => {
      const img = new Image();
      // https://stackoverflow.com/questions/10240110/how-do-you-cache-an-image-in-javascript
      img.onload = () => {
        this.successChampImageCount++;
        // console.log('image onload! images in champ array: ' + this.champImages.length);
        const index = this.champImages.indexOf(img);
        if (index !== -1) {
          this.champImages.splice(index, 1);
        }
        if (this.successChampImageCount + this.failedChampImageCount === this.champImageCount) this.champImagesLoading = false;
      }
      img.onerror = (ev) => {
        console.log('champ image load on error');
        // TODO: implement failed load logic
        this.failedChampImageCount ++;
        this.failedImages.push(img.src);
        // splice image obj out of array
        const index = this.champImages.indexOf(img);
        if (index !== -1) {
          this.champImages.splice(index, 1);
        }
        if (this.successChampImageCount + this.failedChampImageCount === this.champImageCount) this.champImagesLoading = false;
      }
      img.src = `http://ddragon.leagueoflegends.com/cdn/${dataVersion}/img/champion/${champ.key}.png`;
      this.champImages.push(img);
    })
    // this.champImagesLoading = false;
  }

  preloadItemImagesFromMap(items: Map<string, Item>, dataVersion: string) {
    this.itemImagesLoading = true;
    this.itemImageCount = items.size;
    // console.log('preloading ' + items.size + 'item images...');

    items.forEach((item) => {
      const img = new Image();

      img.onload = () => {
        this.successItemImageCount++;
        // console.log('image onload! images in item array: ' + this.itemImages.length);
        const index = this.itemImages.indexOf(img);
        if (index !== -1) {
          this.itemImages.splice(index, 1);
          // console.warn('spliced out, remaining: ' + this.itemImages.length + '. successes: ' + this.successItemImageCount);

        }
        if (this.successItemImageCount + this.failedItemImageCount === this.itemImageCount) this.itemImagesLoading = false;
      }
      img.onerror = (el) => {
         console.log('champ image load on error');
         // TODO: implement failed load logic
         this.failedItemImageCount ++;
         this.failedImages.push(img.src);
         // splice image obj out of array
         const index = this.itemImages.indexOf(img);
         if (index !== -1) {
           this.itemImages.splice(index, 1);
         }
         if (this.successItemImageCount + this.failedItemImageCount === this.itemImageCount) this.itemImagesLoading = false;
      }

      img.src = `http://ddragon.leagueoflegends.com/cdn/${dataVersion}/img/item/${item.id}.png`;
      this.itemImages.push(img);
    })
    // this.itemImagesLoading = false;
  }

  preloading(): boolean {
    // console.log('preloading() checked: ' + this.itemImagesLoading || this.champImagesLoading);
    return this.itemImagesLoading || this.champImagesLoading;
  }
}

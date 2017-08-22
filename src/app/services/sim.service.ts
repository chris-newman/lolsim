import { Injectable } from '@angular/core';
import { Champion } from "app/classes/champion";
import { Item } from "app/classes/item";

@Injectable()
export class SimService {
  private selectedChamp: Champion;
  private targetChamp: Champion;
  private inGameTime: number;
  private itemSet: Array<Item>; // TO DO, make itemSet class
  // TO DO: runes
  // TO DO: masteries
  constructor() {
    console.log('sim service constructor called');
    this.selectedChamp = null;
    this.itemSet = new Array<Item>(6);
  }

  setChampion(champ: Champion) {
    console.log('set champion: ' + champ.name);
    this.selectedChamp = champ;
  }

  getChampion(): Champion {
    return this.selectedChamp;
  }

  setTargetChamp(champ: Champion) {
    console.log('set champion: ' + champ.name);
    this.selectedChamp = champ;
  }

  getTargetChampion(): Champion {
    return this.selectedChamp;
  }

  // creep / monster functions


}

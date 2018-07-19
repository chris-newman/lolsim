import { Injectable } from '@angular/core';
import { Champion } from 'app/classes/champion';
import { Item } from 'app/classes/item';
import { ItemSet } from 'app/classes/item-set';
import { Build } from '../classes/build';

@Injectable()
export class SimService {
  private build: Build;
  private vs: Build;
  private inGameTime: number;
  public itemSet: ItemSet;
  // TO DO: runes

  constructor() {
    console.log('sim service constructor called');
    this.build = new Build();
    this.vs = new Build();
    this.inGameTime = 0;
  }

  setBuildChampion(champ: Champion) {
    this.build.setChampion(champ);
  }

  getBuildChampion() {
    return this.build.getChampion();
  }

  getBuildItems() {
    return this.build.itemSet.getItems();
  }

  // creep / monster functions
}

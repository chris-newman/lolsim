import { Champion } from './champion';
import { ItemSet } from './item-set';
import { RuneSet } from './rune-set';

export class Build {
  champion: Champion;
  itemSet: ItemSet;
  runeSet: RuneSet;

  constructor() {
    this.itemSet = new ItemSet();
  }

  setChampion(champ: Champion) {
    this.champion = champ;
  }

  getChampion(): Champion {
    return this.champion;
  }
}

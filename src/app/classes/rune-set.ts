import { Rune } from './rune';
import { RunePath } from './rune-path';
import { Stats } from './stats';

// data structure to be used in build
export class RuneSet {

  private primaryPath: RunePath;
  private primaryKeySlot: Rune;
  private primaryFirstSlot: Rune;
  private primarySecondSlot: Rune;
  private primaryThirdSlot: Rune;

  private secondaryPath: RunePath;
  private secondaryFirstSlot: Rune;
  private secondarySecondSlot: Rune;

  private statBonus: Stats;
  private statBonusMap = {
    'Domination': {
      'Sorcery': {adaptivead: 11, adaptiveap: 18}, // +11 Attack Damage or +18 Ability Power, adaptive
      'Resolve': {adaptivead: 5, adaptiveap: 9, }, // +5 Attack Damage or +9 Ability Power, adaptive. TODO: +15-135 Health base on level
      'Precision': {adaptivead: 8, adaptiveap: 13, as: 5.5}, // +8 Attack Damage or +13 Ability Power, adaptive. +5.5% Attack Speed
      'Inspiration': {adaptivead: 11, adaptiveap: 18} // +11 Attack Damage or +18 Ability Power, adaptive
    },
    'Sorcery': {
      'Domination': {adaptivead: 15, adaptiveap: 25}, // +15 attack damage or +25 ability power, adaptive
      'Resolve': {adaptivead: 15, adaptiveap: 25}, // +15 attack damage or +25 ability power, adaptive
      'Precision': {adaptivead: 15, adaptiveap: 25}, // +15 attack damage or +25 ability power, adaptive
      'Inspiration': {adaptivead: 15, adaptiveap: 25}, // +15 attack damage or +25 ability power, adaptive
    },
    'Resolve': {
      'Domination': {hp: 130}, // +130hp
      'Sorcery': {hp: 130}, // +130hp
      'Precision': {hp: 130}, // +130hp
      'Inspiration': {hp: 130} // +130hp
    },
    'Inspiration': {
      'Domination': {adaptivead: 13, adaptiveap: 22}, // +13 Attack Damage or +22 Ability Power, adaptive
      'Sorcery': {adaptivead: 13, adaptiveap: 22}, // +13 Attack Damage or +22 Ability Power, adaptive
      'Resolve': {}, // +235-300 Health based on level
      'Precision': {as: 20} // +20% Attack Speed
    },
    'Precision': {
      'Domination': {as: 9, adaptivead: 6, adaptiveap: 10}, // +9% Attack Speed. +6 Attack Damage or +10 Ability Power, Adaptive
      'Sorcery': {as: 9, adaptivead: 6, adaptiveap: 10}, // +9% Attack Speed. +6 Attack Damage or +10 Ability Power, Adaptive
      'Resolve': {as: 9, }, // +9% Attack Speed. TODO: +15-135 Health based on level
      'Inspiration': {as: 18} // +18% Attack Speed
    }
  }

 getStatBonus() {
   if (!this.secondaryPath) return null;
   return this.statBonusMap[this.primaryPath.name][this.secondaryPath.name];
 }

  // primary path functions
  setPrimaryPath(runePath: RunePath) {}
  getPrimaryPath(): RunePath {
    return this.primaryPath;
  }

  setPrimaryKeySlot(rune: Rune) {}
  getPrimaryKeySlot() {
    return this.primaryKeySlot;
  }

  setPrimaryFirstSlot(rune: Rune) {}
  getPrimaryFirstSlot() {
    return this.primaryFirstSlot;
  }

  setPrimarySecondSlot(rune: Rune) {}
  getPrimarySecondSlot() {
    return this.primarySecondSlot;
  }

  setPrimaryThirdSlot(rune: Rune) {}
  getPrimaryThirdSlot() {
    return this.primaryThirdSlot;
  }

  // secondary path functions
  setSecondaryPath(runePath: RunePath) {}
  getSecondaryPath() {
    return this.secondaryPath;
  }

  setSecondaryFirstSlot(rune: Rune) {}
  getSecondaryFirstSlot() {
    return this.secondaryFirstSlot;
  }
  setSecondarySecondSlot(rune: Rune) {}
  getSecondarySecondSlot() {
    return this.secondarySecondSlot;
  }

  // validation functions
  validatePrimaryFirstSlot() {
    // check what path has been chosen
  }

  validatePrimarySecondSlot() {}

  validatePrimaryThirdSlot() {}

}

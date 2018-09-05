import { Item } from 'app/classes/item';
import { Stats } from 'app/classes/stats';

export class ItemSet {
  private items: Array<Item>;
  private trinket: Item;


  constructor() {
    this.items = new Array<Item>();
  }

  public getItems() {
    return this.items;
  }

  public getTrinket() {
    return this.trinket;
  }

  // TODO: see if else-ifs would condense this logic
  // TODO: enforce unique item rules
  // TODO: enforce only one pair of boots
  // TODO: add buildInto logic
  // TODO: change return type in order to create Toast Error Messages
  public addItem(item: Item): void {
    // if its a trinket, set it in the trinket slot
    if (item.tags.includes('Trinket')) {
      console.log('added trinket');
      this.trinket = item;
    }
    // else, it's an item
    else {
      // if you don't have it
      const itemIndex = this.contains(item);
      if (itemIndex === -1) {
        // and you have room, add it
        if (this.items.length < 6) {
          item.currentStacks = 1;
          this.items.push(item);
        }
        // else, you can't add it
        else {
          console.warn('you can only have 6 items (not including a trinket)!');
        }
      }
      // or you do have it
      else {
        // check if it's stackable
        if (item.maxStacks && item.maxStacks > 0) {
          // if you have room to stack it
          if (this.items[itemIndex].currentStacks < this.items[itemIndex].maxStacks) {
            this.items[itemIndex].currentStacks++;
          }
          // else, no room to stack it
          else {
            console.warn('already have max stacks of this item');
            return;
          }
        }
        // its not stackable, but you can have dupes if you have room
        else {
          if (this.items.length < 6) {
            item.currentStacks = 1;
            this.items.push(item);
          }
          else {
            console.warn('you can only have 6 items (not including a trinket)!');
          }
        }
      }
    }
    console.log(this.toString());
  }


  // TODO: add more stat types: CDR (DNE on items currently), regen(DNE on items currently), %movespeed, spellvamp
  // TODO: figure out where to validate going over stat caps, probably in the sim service itself.
  public sumStats(): Object {
    // need to initialize object values to 0 for 1-line case statements to work
    const stats = {'as': 0, 'ad': 0, 'movespeed': 0, 'armor': 0, 'crit': 0, 'hp': 0, 'mr': 0, 'mp': 0, 'lifesteal': 0};
    this.items.forEach(item => {
      // console.log(item.stats);
      for (const key in item.stats) {
        if (item.stats.hasOwnProperty(key)) {
          const statValue = item.stats[key];
          // add the value to the stats object, multiplied by 100 if we know its a decimal.
          switch (key) {
            case 'PercentAttackSpeedMod': stats['as'] += statValue * 100; break;
            case 'FlatPhysicalDamageMod': stats['ad'] += statValue; break;
            case 'FlatArmorMod': stats['armor'] += statValue; break;
            case 'FlatCritChanceMod': stats['crit'] += statValue * 100; break;
            case 'FlatMovementSpeedMod': stats['movespeed'] += statValue; break;
            case 'FlatHPPoolMod': stats['hp'] += statValue; break;
            case 'FlatSpellBlockMod': stats['mr'] += statValue; break;
            case 'FlatMPPoolMod': stats['mp'] += statValue; break;
            case 'PercentLifeStealMod': stats['lifesteal'] += statValue; break;
            default: console.log('unidentified key: ' + key); break;
          }
        }
      }
    });
    return stats;
  }

  public sumGold() {
    let sum = 0;
    this.items.forEach(item => {
      sum += (item.gold.total * item.currentStacks);
    });
    return sum;
  }

  public toString(): String {
    let x = '';
    let count = 1;
    // check for items
    this.items.forEach(item => {
      if (item) {
        x += '[' + count + ']: ';
        x = x + item.name;
        // check for stacked items
        if (item.maxStacks && item.maxStacks > 0) {
          x += '(x' + item.currentStacks + ')';
        }
        x += '\n';
        count++;
      }
    });
    // check for trinket
    if (this.trinket) {
      x += '[T]: ' + this.trinket.name;
    }

    // sum up the gold
    x += 'Total Gold Cost: ' + this.sumGold();
    x += '\n';

    // TODO: work on summing stats
    x += 'Total Stats: \n';
    const itemStats = this.sumStats();
    // console.log(itemStats);
    for (const key in itemStats) {
      if (itemStats.hasOwnProperty(key) && itemStats[key] > 0 ) { // only show stats > 0
        x += '\t' + key + '- ' + itemStats[key] + '\n';
      }
    }
    x += '\n';
    return x;
  }

  private contains(checkItem: Item): number {
    let found = false;
    let itemIndex = -1;
    let count = 0;
    this.items.forEach(item => {
      if (checkItem.id === item.id) {
        // console.log('FOUND!');
        found = true;
        itemIndex = count;
        return itemIndex;
      }
      count++;
    });
    // console.log('found?: ' + found + ' ' + itemIndex);
    return itemIndex;
  }


}

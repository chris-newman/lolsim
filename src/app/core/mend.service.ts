import { Injectable } from '@angular/core';
import { Spell } from 'app/classes/spell';

@Injectable()
export class MendService {

  constructor() { }

  // update displayTooltip on spell, call this on all spells in onInit
  mendSpell(spell: Spell): Spell {
    if (typeof spell.baseTooltip === 'undefined') {
      console.warn('spell does not have a tooltip: ' + spell.name);
      // this is one form of bad data (ex, Draven W) until we fix it, set it to spell description
      spell.displayTooltip = spell.baseDescription;
      return spell;
    }

    // if spell has effect Array
    if (typeof spell.effectStrings !== 'undefined') {
      this.replaceEffects(spell);
    }

    // if spell has var Array
    if (typeof spell.vars !== 'undefined') {
      this.replaceVars(spell);
    }
    return spell;
  };

  // loop through effect array and string replace; first effect is ""
  replaceEffects(spell: Spell) {
    for (let i = 1; i < spell.effectStrings.length; i++) {
      let base_dmg = spell.effectStrings[i];
      base_dmg = '<span class = "base-black">' + base_dmg + '</span>';
      spell.displayTooltip = spell.displayTooltip.replace(new RegExp('{{ e' + i + ' }}', 'g'), base_dmg);
    }
  };

  replaceVars(spell: Spell) {
    for (let i = 0; i < spell.vars.length; i++) {
      let coeff = spell.vars[i].coeff;
      let link = spell.vars[i].link;
      let key = spell.vars[i].key;

      if (link === '@cooldownchampion' || link === 'rechargetime') { // akali r and azir w
        coeff = this.simpleArrayToString(coeff);
      } else if (link === 'scalingattackdamage' || link === 'chillslow') { // ashe q, anivia q
        coeff = '%' + this.simpleArrayToString(coeff);
      } else if (link === 'maxammo') { // azir w
        // do nothing
      } else if (link === 'championlevel') {
        // TODO: abilities that increase base on champion level

      }
      else {
        coeff = '%' + (100 * coeff).toFixed(0);
      }
      coeff = this.addColor(coeff, link);
      spell.displayTooltip = spell.displayTooltip.replace(new RegExp('{{ ' + key + ' }}', 'g'), coeff);
    }
  };

  addColor(coeff, link) {
    switch (link) {
      case 'attackdamage' || 'scalingattackdamage' || '@dynamic.attackdamage': coeff = '<span class = "ad-orange">' + coeff + ' AD</span>'; break;
      case 'bonusattackdamage': coeff = '<span class = "ad-orange">' + coeff + ' Bonus AD</span>'; break;
      case 'spelldamage': coeff = '<span class = "ap-green">' + coeff + ' AP</span>'; break;
      case 'bonusspelldamage': coeff = '<span class = "ap-green">' + coeff + ' Bonus AP</span>'; break;
      case 'armor': coeff = '<span class = "armor-yellow">' + coeff + ' Armor</span>'; break;
      case 'bonusarmor': coeff = '<span class = "armor-yellow">' + coeff + ' Bonus Armor</span>'; break;
      case 'bonusspellblock': coeff = '<span class = "mr-purple">' + coeff + ' Bonus MR</span>'; break;
      case 'bonushealth': coeff = '<span class = "hp-red">' + coeff + ' Bonus Health</span>'; break;
      case 'maxmana': coeff = '<span class = "mana-blue">' + coeff + ' Maximum Mana</span>'; break;
      default: coeff = '<span class = "base-black">' + coeff + '</span>'; break;
    }
    return coeff;
  };

  simpleArrayToString(array) {
    let result = '';
    for (let i = 0; i < array.length; i++) {
      if (i > 0) {
        result = result + '/';
      }
      result = result + '' + array[i];
    }
    return result;
  };

  // ***************************************************************************************************************
  // Fix item data
  // ***************************************************************************************************************
  mendItemData(json) {
    json = this.mendTrinkets(json);
    return json;
  }

  mendTrinkets(json) {
    // trim '(Trinket)' from names for ids: 3340, 3341
    json.data['3341'].name = json.data['3341'].name.substring(0, 13);
    json.data['3340'].name = json.data['3340'].name.substring(0, 13);
    return json;
  };

  noEventItems(json) {
    const ignoreItems = [3634, 3631, 3641, 3636, 3647, 3643, 3642, 3635, 3640, 3007, 3008, 3029, 3073, 3671, 3672, 3673, 3674, 3675];
    for (let i = 0; i < ignoreItems.length; i++) {
      delete json.data[ignoreItems[i]];
    }
    return json;
  }

  noChampExclusives(json) {
    for (const item in json['data']) {
      if (json['data'].hasOwnProperty(item)) {
        if (json['data'][item].requiredChampion) {
          delete json['data'][item];
        }
      }
    }
    return json;
  }

  onlyPurchaseable(json) {
    for (const item in json['data']) {
      if (json['data'].hasOwnProperty(item)) {
        if (!json['data'][item].gold.purchasable) {
          delete json['data'][item];
        }
      }
    }
    return json;
  }

  srItemsOnly(json) {
    for (const item in json['data']) {
      if (json['data'].hasOwnProperty(item)) {
        if (!json['data'][item].maps['11']) {
          delete json['data'][item];
        }
      }
    }
    return json;
  }

  // ***************************************************************************************************************
  // Fix champion data
  // ***************************************************************************************************************
  mendChampData(json) {
    this.mendAatrox(json);
    this.mendAhri(json);
    this.mendAlistar(json);
    this.mendAnivia(json);
    this.mendAnnie(json);
    this.mendAshe(json);
    this.mendAzir(json);
    this.mendBrand(json);
    return json;
  }


  // AATROX
  private mendAatrox(json) {
    // add vars for his W (data from wikipedia)
    json.data.Aatrox.spells[1].effectBurn.push('15/23.75/32.5/41.25/50');
    json.data.Aatrox.spells[1].vars.push({
      'key': 'f4',
      'link': 'bonusattackdamage',
      'coeff': [
        .25
      ]
    });

    let token = json.data.Aatrox.spells[1].sanitizedTooltip;
    token = token.replace(new RegExp('\\({{ f5 }}\\)', 'g'), ''); //remove f5
    token = token.replace(new RegExp('{{ f4 }}', 'g'), '{{ e7 }} (+{{ f4 }})'); //use the vars we added
    json.data.Aatrox.spells[1].sanitizedTooltip = token;
  };

  // AHRI
  private mendAhri(json) {
    json.data.Ahri.spells[1].vars.push({
      'key': 'f1',
      'link': 'spelldamage',
      'coeff': [
        .64
      ]
    });
    let token = json.data.Ahri.spells[1].sanitizedTooltip;
    token = token.replace(new RegExp('{{ f1 }}', 'g'), '{{ e3 }} (+{{ f1 }})');
    json.data.Ahri.spells[1].sanitizedTooltip = token;
  };

  // ALISTAR
  private mendAlistar(json) {
    let token = json.data.Alistar.spells[2].sanitizedTooltip;
    token = token.replace(new RegExp('{{ f1 }}', 'g'), '{{ e1 }}');
    json.data.Alistar.spells[2].sanitizedTooltip = token;

    json.data.Alistar.spells[2].vars = [];
    json.data.Alistar.spells[2].vars.push({
      'key': 'f2',
      'link': 'spelldamage',
      'coeff': [
        .4
      ]
    });
    json.data.Alistar.spells[2].vars.push({
      'key': 'f3',
      'link': 'championlevel',
      'base': 55,
      'increase': 15
    });
  };

  // ANIVIA
  private mendAnivia(json) {
    json.data.Anivia.spells[0].vars.push({
      'key': 'f1',
      'link': 'chillslow',
      'coeff': [
        20, 20, 30, 40
      ]
    });
    let token = json.data.Anivia.spells[0].sanitizedTooltip;
    token = token.replace(new RegExp('{{ f1 }}%.', 'g'), '{{ f1 }} (based on Glacial Storm rank).');
    json.data.Anivia.spells[0].sanitizedTooltip = token;

  };

  // ANNIE
  private mendAnnie(json) {
    // tibbers punch = 15% ap
    json.data.Annie.spells[3].vars.push({
      'key': 'f1',
      'link': 'spelldamage',
      'coeff': [
        .15
      ]
    });
  };

  // ASHE
  private mendAshe(json) {
    // 115/120/125/130/135% AD
    json.data.Ashe.spells[0].vars = [];
    json.data.Ashe.spells[0].vars.push({
      'key': 'f1',
      'link': 'scalingattackdamage',
      'coeff': [
        115, 120, 125, 130, 135
      ]
    });
  };

  // AURELION SOL -TODO
  // W

  // AZIR
  private mendAzir(json) {
    // azir w
    json.data.Azir.spells[1].vars.push({
      'key': 'f1',
      'link': 'rechargetime',
      'coeff': [
        12, 11, 10, 9, 8
      ]
    });
    json.data.Azir.spells[1].vars.push({
      'key': 'maxammo',
      'link': 'maxammo',
      'coeff': [
        2
      ]
    });

    let token = json.data.Azir.spells[1].sanitizedTooltip;
    token = token.replace(new RegExp('{{ f2 }}', 'g'), '<span class = "base-white">45 +5' +
      ' every level up to 11, then +10 at every level </span>');
    json.data.Azir.spells[1].sanitizedTooltip = token;
    // azir e  TO D0 - add var for 15% bonus hp
    token = json.data.Azir.spells[2].sanitizedTooltip;
    token = token.replace(new RegExp('\\(\\+{{ f1 }}\\)', 'g'), '<span class = "hp-red">+');
    token = token.replace(new RegExp(']', 'g'), ']</span>');
    json.data.Azir.spells[2].sanitizedTooltip = token;

  };

  private mendBrand(json) {
    // brand q
    // console.log('mend brand');
    // console.log(json.data.Brand.spells[0]);
  };
}



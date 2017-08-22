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
      } else {
        coeff = '%' + (100 * coeff);
      }
      coeff = this.addColor(coeff, link);
      spell.displayTooltip = spell.displayTooltip.replace(new RegExp('{{ ' + key + ' }}', 'g'), coeff);
    }
  };

  addColor(coeff, link) {
    if (link === 'attackdamage' || link === 'scalingattackdamage' || link === '@dynamic.attackdamage') {
      coeff = '<span class = "ad-orange">' + coeff + ' AD</span>';
    } else if (link === 'bonusattackdamage') {
      coeff = '<span class = "ad-orange">' + coeff + ' Bonus AD</span>';
    } else if (link === 'spelldamage' || link === '@dynamic.abilitypower') {
      coeff = '<span class = "ap-green">' + coeff + ' AP</span>';
    } else if (link === 'bonusspelldamage') {
      coeff = '<span class = "ap-green">' + coeff + ' Bonus AP</span>';
    } else if (link === 'armor') {
      coeff = '<span class = "armor-yellow">' + coeff + ' Armor</span>';
    } else if (link === 'bonusarmor') {
      coeff = '<span class = "armor-yellow">' + coeff + ' Bonus Armor</span>';
    } else if (link === 'bonusspellblock') {
      coeff = '<span class = "mr-purple">' + coeff + ' Bonus MR</span>';
    } else if (link === 'bonushealth') {
      coeff = '<span class = "hp-red">' + coeff + ' Bonus Health</span>';
    } else if (link === 'maxmana') {
      coeff = '<span class = "mana-blue">' + coeff + ' Maximum Mana</span>';
    } else {
      coeff = '<span class = "base-black">' + coeff + '</span>';
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
  // Fix  champion data
  // ***************************************************************************************************************
  mendChampData(json) {
    this.mendAatrox(json);
    this.mendAhri(json);
    this.mendAnivia(json);
    this.mendAnnie(json);
    this.mendAshe(json);
    this.mendAzir(json);
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

    var token = json.data.Aatrox.spells[1].sanitizedTooltip;
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
    var token = json.data.Ahri.spells[1].sanitizedTooltip;
    token = token.replace(new RegExp('{{ f1 }}', 'g'), '{{ e3 }} (+{{ f1 }})');
    json.data.Ahri.spells[1].sanitizedTooltip = token;
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
    var token = json.data.Anivia.spells[0].sanitizedTooltip;
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

    var token = json.data.Azir.spells[1].sanitizedTooltip;
    token = token.replace(new RegExp('{{ f2 }}', 'g'), '<span class = "base-white">45 +5' +
      ' every level up to 11, then +10 at every level </span>');
      json.data.Azir.spells[1].sanitizedTooltip = token;
    // azir e  TO D0 - add var for 15% bonus hp
    var token = json.data.Azir.spells[2].sanitizedTooltip;
    token = token.replace(new RegExp('\\(\\+{{ f1 }}\\)', 'g'), '<span class = "hp-red">+');
    token = token.replace(new RegExp(']', 'g'), ']</span>');
    json.data.Azir.spells[2].sanitizedTooltip = token;

  };
}



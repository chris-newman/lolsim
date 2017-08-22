import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Champion } from 'app/classes/champion';
import { SortService } from 'app/services/sort.service';
import { Stats } from 'app/classes/stats';
import { Spell } from 'app/classes/spell';
import { MendService } from 'app/services/mend.service';
import { Item } from "app/classes/item";

@Injectable()
export class DataService {
  apiRoot: string;
  dataVersion: string;
  champions: Map<string, Champion>;
  // for now, using currentChamp as opposed to checking champions data
  // currentChamp: Champion;
  items: Map<string, Item>;
  masteries: Object[];
  runes: Map<string, Object>;
  loading: boolean;
  testApi: string;
  search: URLSearchParams;

  // temp data flag
  tempDataFlag: boolean;

  constructor(private http: Http, protected sort: SortService, protected mend: MendService) {
    this.apiRoot = 'http://73.134.84.72:10101';
    // this.apiRoot = 'http://localhost:3001';
    this.loading = false;

    this.tempDataFlag = true;
    if (this.tempDataFlag) {
      console.warn('!!!USING TEMP DATA FOR OFFLINE DEVELOPMENT!!!');
      this.apiRoot = './assets/temp-data/';
    }
  }


  // populate Champion array with initial data
  private getChampions() {
    // console.log('get champions called');
    // console.log('getChampions() called');
    const promise = new Promise((resolve, reject) => {
      if (!this.champions) {

        let searchParams = new URLSearchParams();
        let url = this.apiRoot;

        if (!this.tempDataFlag) {
          // const champDataParams = ['image', 'passive', 'spells', 'stats', 'tags'];
          url += '/static/champions';
          searchParams.set('champData', 'all'); // using 'all' until Rito fixes their shit
        }
        else {
          url += 'champions.json';
        }

        // console.log('http call for getChampions');
        this.http.get(url, { search: searchParams })
          .toPromise()
          .then(res => {
            console.log('get champions success .then');
            let temp = new Map<string, Champion>();
            const json = res.json();
            this.mend.mendChampData(json);
            this.dataVersion = json.version;
            for (const champ in json.data) {
              if (json.data.hasOwnProperty(champ)) {
                // get stats data
                let ritoStats = new Stats(json.data[champ].stats);
                //get spells data
                const ritoSpells = new Array<Spell>();
                for (let i = 0; i < json.data[champ].spells.length; i++) {

                  let tempSpell = new Spell(json.data[champ].spells[i]);
                  tempSpell = this.mend.mendSpell(tempSpell);
                  // ritoSpells.push(tempSpell);

                  ritoSpells.push(tempSpell);

                  // ritoSpells.push(this.mend.mendSpell(new Spell(json.data[champ].spells[i])));
                }

                // add champ key to map
                temp.set(json.data[champ].key, new Champion(json.data[champ].key,
                  json.data[champ].name,
                  json.data[champ].title,
                  json.data[champ].passive,
                  ritoSpells,
                  ritoStats));
              }
            }
            console.log('storing sorted array of champions in map...');
            this.champions = new Map<string, Champion>(Array.from(temp).sort(this.sort.ascendingChampMap));
            resolve();
          })
          .catch(err => {
            console.log('error');
            console.log(err);
          });
      };
      // resolve();
    });
    return promise;
  };

  // get runes
  private getRunes() {
    // console.log('get runes called');
    const promise = new Promise((resolve, reject) => {
      if (!this.runes) {

        let searchParams = new URLSearchParams();
        let url = this.apiRoot;
        if (!this.tempDataFlag) {
          // const champDataParams = ['image', 'passive', 'spells', 'stats', 'tags'];

          url += '/static/runes';
          searchParams.set('runeData', 'stats'); // using 'all' until Rito fixes their shit
        }
        else {
          url += 'runes.json';
        }
        // console.log('http call for getRunes');
        this.http.get(url, { search: searchParams })
          .toPromise()
          .then(res => {
            // console.log('get runes success .then');

            // console.log('get champions success .then');
            let temp = new Map<string, Object>();
            const json = res.json();
            console.log(res);
            this.dataVersion = json.version;
            // console.log(this.dataVersion);
            // for (const rune in json.data) {
            //   if (json.data.hasOwnProperty(rune)) {
            //     // bla
            //   }
            // }

            resolve();
          })
          .catch(err => {
            console.log('error');
            console.log(err);
          });
      };
      // resolve();
    });
    return promise;
  }

  // get items
  private getItems() {
    // console.log('get items called');
    const promise = new Promise((resolve, reject) => {
      if (!this.items) {
        let searchParams = new URLSearchParams();
        let url = this.apiRoot;

        if (!this.tempDataFlag) {
          searchParams.set('itemData', 'all')
          url += '/static/items';
        }
        else {
          url += 'items.json';
        }
        // console.log('http call for getItems');
        this.http.get(url, { search: searchParams })
          .toPromise()
          .then(res => {
            console.log('get items success .then');
            let temp = new Map<string, Item>();
            let json = res.json();
            console.log(res.json());

            // TO DO: make item from json.tree

            for (const item in json.data) {
              if (json.data.hasOwnProperty(item)) {
                // TO DO: configure item inclusion settings

                // if item is available on SR
                if (json.data[item].maps['11']) {
                  temp.set('' + json.data[item].id, new Item(json.data[item]));
                }
              }
            }
            console.log(temp.size);
            this.items = new Map<string, Item>(Array.from(temp).sort(this.sort.ascendingGoldCostMap));
            // let doodoomap = new Map<string, Item>
            resolve();
          })
          .catch(err => {
            console.log('error');
            console.log(err);
            reject();
          });
      }
    });
    return promise;
  }

  getData() {
    if (!this.dataVersion) {
      // getItems;
      // getmasteries;
      const runeDataPromise = this.getRunes();
      const champDataPromise = this.getChampions();
      const itemDataPromise = this.getItems();
      return Promise.all([champDataPromise, runeDataPromise, itemDataPromise]);
    }
  }

  getChampionByKey(champKey: string) {
    console.log('getChampByKey: ' + champKey);
    if (!this.dataVersion) {
      this.getData().then((values) => {
        return this.champions.get(champKey);
      });
    }
    return this.champions.get(champKey);
  };

  getItemById(itemId: string): Item {
    console.log('getItemById: ' + itemId);
    if (!this.dataVersion) {
      this.getData().then((values) => {
        return this.items.get(itemId);
      });
    }
    return this.items.get(itemId);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Champion } from 'app/classes/champion';
import { Stats } from 'app/classes/stats';
import { Spell } from 'app/classes/spell';
import { Item } from 'app/classes/item';
import { Rune } from 'app/classes/rune';
import { Mastery } from 'app/classes/mastery';
import { SortService } from 'app/core/sort.service';
import { MendService } from 'app/core/mend.service';
import { NgForageCache, NgForage } from 'ngforage';
// TO DO: look into grouping imports from classes directory into a barrel

@Injectable()
export class DataService {
  apiRoot: string;
  dataVersion: string;
  champions: Map<string, Champion>;
  items: Map<string, Item>;
  itemTree: Array<Object>;
  masteries: Map<string, Mastery>;
  runes: Map<string, Rune>;
  loading: boolean;
  testApi: string;
  search: URLSearchParams;

  // temp data flag
  tempDataFlag: boolean;

  constructor(
    private http: HttpClient,
    protected sort: SortService,
    protected mend: MendService,
    protected ngfc: NgForageCache
  ) {
    this.apiRoot = 'http://73.134.84.72:10101';
    // this.apiRoot = 'http://localhost:3001';
    this.loading = false;

    this.tempDataFlag = true;
    if (this.tempDataFlag) {
      console.warn('!!!USING TEMP DATA FOR OFFLINE DEVELOPMENT!!!');
      this.apiRoot = './assets/temp-data/';
    }
  }

  // return champ data from cache or http promise
  private getChampionsPromise() {
    if (this.champions) { return null } // return if champData is already loaded in app
    // TODO: check cache before http call
    return this.ngfc.clear().then(() => {
      return this.ngfc.getCached('champData').then(cachedItem => {
        if (cachedItem.data) {
          console.log('returning cached champ data');
          return cachedItem;
        }

        console.log('cache empty, using http');
        const searchParams = new HttpParams();
        let url = this.apiRoot;

        if (!this.tempDataFlag) {
          // const champDataParams = ['image', 'passive', 'spells', 'stats', 'tags'];
          url += '/static/champions';
          searchParams.set('champData', 'all'); // using 'all' until Rito fixes their shit
        } else {
          url += 'champions.json';
        }
        return this.http
          .get(url, { params: searchParams })
          .toPromise();
      });
    });
  }

  // return item data from cache or http promise
  private getItemsPromise() {
    if (this.items) {return null }

    return this.ngfc.getCached('itemData').then((cachedItem) => {
      if (cachedItem.data) {
        return cachedItem;
      }

      console.log('cache empty, using http');
      const searchParams = new HttpParams();
      let url = this.apiRoot;
      if (!this.tempDataFlag) {
        searchParams.set('itemData', 'all');
        url += '/static/items';
      } else {
        url += 'items.json';
      }
      return this.http
        .get(url, { params: searchParams })
        .toPromise();
    });
  }

  // get runes
  private getRunesPromise() {
    // console.log('get items called');
    const promise = new Promise((resolve, reject) => {
      if (!this.items) {
        const searchParams = new HttpParams();
        const url = this.apiRoot;

        // console.log('http call for getItems');
        this.http
          .get(url, { params: searchParams })
          .toPromise()
          .then(json => {
            // console.log('get items success .then');
            const temp = new Map<string, Rune>();
            // let json = res.json();

            // mend item data

            // map items
            // for (const item in json["data"]) {
            //   if (json["data"].hasOwnProperty(item)) {
            //     temp.set(
            //       "" + json["data"][item].id,
            //       new Item(json["data"][item])
            //     );
            //   }
            // }

            // sort
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
      return Promise.all([this.getChampionsPromise(), this.getItemsPromise()]).then((result: any) => {
        let champJson;
        if (result[0] && result[0].data.data) { // if result[0] has data.data, its from the cache
          champJson = result[0].data;
        } else {
          champJson = result[0];

          // TODO: create ui for manually clearing cache
          this.ngfc.setCached('champData', result[0], 1000 * 60 * 60 * 24); // set cache time to 24hrs
        }
        this.handleChampJson(champJson);

        let itemJson;
        if (result[1] && result[1].data.data) {
          itemJson = result[1].data;
        } else {
          itemJson = result[1];
          this.ngfc.setCached('itemData', result[1], 1000 * 60 * 60 * 24); // set cache time to 24hrs
        }
        this.handleItemJson(itemJson);
      });
    }
  }

  private handleChampJson(json) {
    console.log('handleChampJson');
    console.log(json);

    const temp = new Map<string, Champion>();
    // const json = res.json();
    // const json = JSON.parse(res.toString());

    // TODO: abstract this into a function
    this.mend.mendChampData(json);
    this.dataVersion = json['version'];
    for (const champ in json['data']) {
      if (json['data'].hasOwnProperty(champ)) {
        // get stats data
        const ritoStats = new Stats(json['data'][champ].stats);
        // get spells data
        const ritoSpells = new Array<Spell>();
        for (let i = 0; i < json['data'][champ].spells.length; i++) {
          let tempSpell = new Spell(json['data'][champ].spells[i]);
          tempSpell = this.mend.mendSpell(tempSpell);
          // ritoSpells.push(tempSpell);

          ritoSpells.push(tempSpell);

          // ritoSpells.push(this.mend.mendSpell(new Spell(json['data'][champ].spells[i])));
        }

        // add champ key to map
        temp.set(
          json['data'][champ].key,
          new Champion(
            json['data'][champ].key,
            json['data'][champ].name,
            json['data'][champ].title,
            json['data'][champ].passive,
            ritoSpells,
            ritoStats
          )
        );
      }
    }
    console.log('storing sorted array of champions in map...');
    const sorted = Array.from(temp).sort(this.sort.ascendingChampMap);
    this.champions = new Map<string, Champion>(sorted);
  }

  private handleItemJson(json) {
    // console.log('get items success .then');
    const temp = new Map<string, Item>();
    // let json = res.json();

    // mend item data
    this.mend.mendItemData(json);
    // TO DO: do something with itemTree
    this.itemTree = json['tree'];

    // exlude items, TODO: improve perf
    this.mend.noEventItems(json);
    this.mend.srItemsOnly(json);
    this.mend.noChampExclusives(json);
    this.mend.onlyPurchaseable(json);

    // map items
    for (const item in json['data']) {
      if (json['data'].hasOwnProperty(item)) {
        temp.set(
          '' + json['data'][item].id,
          new Item(json['data'][item])
        );
      }
    }

    // sort by gold cost
    this.items = new Map<string, Item>(
      Array.from(temp).sort(this.sort.ascendingGoldCostMap)
    );
  }

  getChampionByKey(champKey: string) {
    console.log('getChampByKey: ' + champKey);
    if (!this.dataVersion) {
      this.getData().then(values => {
        return this.champions.get(champKey);
      });
    }
    return this.champions.get(champKey);
  }

  getItemById(itemId: string): Item {
    console.log('getItemById: ' + itemId);
    if (!this.dataVersion) {
      this.getData().then(values => {
        return this.items.get(itemId);
      });
    }
    return this.items.get(itemId);
  }

  getItemTree() {
    return this.itemTree;
  }
}

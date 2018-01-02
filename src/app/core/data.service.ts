import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { Champion } from "app/classes/champion";
import { Stats } from "app/classes/stats";
import { Spell } from "app/classes/spell";
import { Item } from "app/classes/item";
import { Rune } from "app/classes/rune";
import { Mastery } from "app/classes/mastery";
import { SortService } from "app/core/sort.service";
import { MendService } from "app/core/mend.service";
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
    protected mend: MendService
  ) {
    this.apiRoot = "http://73.134.84.72:10101";
    // this.apiRoot = 'http://localhost:3001';
    this.loading = false;

    this.tempDataFlag = true;
    if (this.tempDataFlag) {
      console.warn("!!!USING TEMP DATA FOR OFFLINE DEVELOPMENT!!!");
      this.apiRoot = "./assets/temp-data/";
    }
  }

  // populate Champion array with initial data
  private getChampions() {
    // console.log('getChampions() called');
    const promise = new Promise((resolve, reject) => {
      if (!this.champions) {
        const searchParams = new HttpParams();
        let url = this.apiRoot;

        if (!this.tempDataFlag) {
          // const champDataParams = ['image', 'passive', 'spells', 'stats', 'tags'];
          url += "/static/champions";
          searchParams.set("champData", "all"); // using 'all' until Rito fixes their shit
        } else {
          url += "champions.json";
        }

        // console.log('http call for getChampions');
        this.http
          .get(url, { params: searchParams })
          .toPromise()
          .then(json => {
            console.log("get champions success .then");
            const temp = new Map<string, Champion>();
            // const json = res.json();
            // const json = JSON.parse(res.toString());
            this.mend.mendChampData(json);
            this.dataVersion = json["version"];
            for (const champ in json["data"]) {
              if (json["data"].hasOwnProperty(champ)) {
                // get stats data
                const ritoStats = new Stats(json["data"][champ].stats);
                // get spells data
                const ritoSpells = new Array<Spell>();
                for (let i = 0; i < json["data"][champ].spells.length; i++) {
                  let tempSpell = new Spell(json["data"][champ].spells[i]);
                  tempSpell = this.mend.mendSpell(tempSpell);
                  // ritoSpells.push(tempSpell);

                  ritoSpells.push(tempSpell);

                  // ritoSpells.push(this.mend.mendSpell(new Spell(json['data'][champ].spells[i])));
                }

                // add champ key to map
                temp.set(
                  json["data"][champ].key,
                  new Champion(
                    json["data"][champ].key,
                    json["data"][champ].name,
                    json["data"][champ].title,
                    json["data"][champ].passive,
                    ritoSpells,
                    ritoStats
                  )
                );
              }
            }
            console.log("storing sorted array of champions in map...");
            this.champions = new Map<string, Champion>(
              Array.from(temp).sort(this.sort.ascendingChampMap)
            );
            resolve();
          })
          .catch(err => {
            console.log("error");
            console.log(err);
          });
      }
      // resolve();
    });
    return promise;
  }

  // get items
  private getItems() {
    // console.log('get items called');
    const promise = new Promise((resolve, reject) => {
      if (!this.items) {
        const searchParams = new HttpParams();
        let url = this.apiRoot;

        if (!this.tempDataFlag) {
          searchParams.set("itemData", "all");
          url += "/static/items";
        } else {
          url += "items.json";
        }
        // console.log('http call for getItems');
        this.http
          .get(url, { params: searchParams })
          .toPromise()
          .then(json => {
            // console.log('get items success .then');
            const temp = new Map<string, Item>();
            // let json = res.json();

            // mend item data
            this.mend.mendItemData(json);
            // TO DO: do something with itemTree
            this.itemTree = json["tree"];

            // exlude items, TODO: improve perf
            this.mend.noEventItems(json);
            this.mend.srItemsOnly(json);
            this.mend.noChampExclusives(json);
            this.mend.onlyPurchaseable(json);

            // map items
            for (const item in json["data"]) {
              if (json["data"].hasOwnProperty(item)) {
                temp.set(
                  "" + json["data"][item].id,
                  new Item(json["data"][item])
                );
              }
            }

            // sort by gold cost
            this.items = new Map<string, Item>(
              Array.from(temp).sort(this.sort.ascendingGoldCostMap)
            );
            resolve();
          })
          .catch(err => {
            console.log("error");
            console.log(err);
            reject();
          });
      }
    });
    return promise;
  }

  // get runes
  private getRunes() {
    // console.log('get items called');
    const promise = new Promise((resolve, reject) => {
      if (!this.items) {
        const searchParams = new HttpParams();
        let url = this.apiRoot;

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
            console.log("error");
            console.log(err);
            reject();
          });
      }
    });
    return promise;
  }

  getData() {
    if (!this.dataVersion) {
      const champDataPromise = this.getChampions();
      const itemDataPromise = this.getItems();
      // const runeDataPromise = this.getRunes();
      // return Promise.all([champDataPromise, itemDataPromise, runeDataPromise]);
      return Promise.all([champDataPromise, itemDataPromise]);
    }
  }

  getChampionByKey(champKey: string) {
    console.log("getChampByKey: " + champKey);
    if (!this.dataVersion) {
      this.getData().then(values => {
        return this.champions.get(champKey);
      });
    }
    return this.champions.get(champKey);
  }

  getItemById(itemId: string): Item {
    console.log("getItemById: " + itemId);
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

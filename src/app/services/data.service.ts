import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Champion } from 'app/classes/champion';
import { SortService } from 'app/services/sort.service';
import { Stats } from "app/classes/stats";
import { Spell } from "app/classes/spell";

@Injectable()
export class DataService {
  apiRoot: string;
  dataVersion: string;
  champions: Map<string, Champion>;
  // for now, using currentChamp as opposed to checking champions data
  // currentChamp: Champion;
  items: Object[];
  masteries: Object[];
  runes: Map<string, Object>;
  loading: boolean;
  testApi: string;
  search: URLSearchParams;

  constructor(private http: Http, protected sort: SortService) {
    //this.apiRoot = 'http://73.134.84.72:10101';
    this.apiRoot = 'http://localhost:3001';
    this.loading = false;
  }


  // populate Champion array with initial data
  private getChampions() {
    console.log('get champions called');
    // console.log('getChampions() called');
    const promise = new Promise((resolve, reject) => {
      if (!this.champions) {
        let searchParams = new URLSearchParams();
        let url = this.apiRoot;
        // const champDataParams = ['image', 'passive', 'spells', 'stats', 'tags'];

        url += '/static/champions';
        searchParams.set('champData', 'all'); // using 'all' until Rito fixes their shit
        console.log('http call for getChampions');
        this.http.get(url, { search: searchParams })
          .toPromise()
          .then(res => {
            console.log('get champions success .then');
            let temp = new Map<string, Champion>();
            const json = res.json();
            // console.log(res);
            this.dataVersion = json.version;
            // console.log(this.dataVersion);
            for (const champ in json.data) {
              if (json.data.hasOwnProperty(champ)) {
                // get stats data
                let ritoStats = new Stats(json.data[champ].stats);
                //get spells data
                const ritoSpells = new Array<Spell>();
                for (var i = 0; i < json.data[champ].spells.length; i++) {
                  ritoSpells.push(new Spell(json.data[champ].spells[i]));
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
            // console.log('storing sorted array of champions in map...');
            this.champions = new Map<string, Champion>(Array.from(temp).sort(this.sort.ascendingChampMap));
            // console.log(this.champions);
            // console.log('resolve');
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
    console.log('get runes called');
    const promise = new Promise((resolve, reject) => {
      if (!this.runes) {
        let searchParams = new URLSearchParams();
        let url = this.apiRoot;
        // const champDataParams = ['image', 'passive', 'spells', 'stats', 'tags'];

        url += '/static/runes';
        searchParams.set('runeData', 'stats'); // using 'all' until Rito fixes their shit
        console.log('http call for getRunes');
        this.http.get(url, { search: searchParams })
          .toPromise()
          .then(res => {
            console.log('get runes success .then');

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
  private getItems(){
    console.log('get items called');
    const promise = new Promise((resolve, reject) => {
      if(!this.items){
        let searchParams = new URLSearchParams();
        let url = this.apiRoot;
        searchParams.set('itemData', 'all')
        url += '/static/items';
        console.log('http call for getItems');
        this.http.get(url, {search: searchParams})
        .toPromise()
        .then(res => {
          console.log('get items success .then');
          console.log(res.json());
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
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../../app/services/data.service';
import { Champion } from 'app/classes/champion';

@Component({
  selector: 'app-champ-info',
  templateUrl: './champ-info.component.html',
  styleUrls: ['./champ-info.component.css']
})
export class ChampInfoComponent implements OnInit, OnDestroy {
  champKey: string;
  champion: Champion;
  sub: any;
  statKeys: Array<string>;
  champBackground: string;
  loading: boolean;
  imageUrl: string;
  champIconPromise: Promise<string>;
  champSplashPromise: Promise<string>;
  displayBlock: string;
  // routeParams: any;


  constructor(protected loldata: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('champ info on init');
    if (!this.loldata.dataVersion) {
      this.loldata.getData().then(() => {
        this.sub = this.route.params.subscribe((params) => {
          // console.log(params);
          this.champIconPromise = this.makeIconImagePromise(params.champKey);
          this.champSplashPromise = this.makeSplashImagePromise(params.champKey);
          this.champion = this.loldata.getChampionByKey(params.champKey);
          console.log(this.champion);
          this.champion.stats.setLevel(18);
          // console.log("bonus attack speed at level 18:" this.champion.stats.)
        });
      });
    } else {
      this.sub = this.route.params.subscribe((params) => {
        console.log(params);
        this.champIconPromise = this.makeIconImagePromise(params.champKey);
        this.champSplashPromise = this.makeSplashImagePromise(params.champKey);
        this.champion = this.loldata.getChampionByKey(params.champKey);
        console.log(this.champion);
        this.champion.stats.setLevel(18);
      });
    }
    this.displayBlock = 'rawStats';
  }

  // just to be safe
  ngOnDestroy() {
    console.log('info onDestroy');
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // had to use a promise, to fix the 'undefined' error that occurs when user goes directly to a champ info page first
  makeIconImagePromise(champKey) {
    return new Promise((resolve, reject) => {
      const imageUrl = `http://ddragon.leagueoflegends.com/cdn/${this.loldata.dataVersion}/img/champion/${champKey}.png`;
      resolve(imageUrl);
    });
  }

  makeSplashImagePromise(champKey) {
    return new Promise((resolve, reject) => {
      const imageUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champKey}_0.jpg`;
      resolve(imageUrl);
    });
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Champion } from 'app/classes/champion';
import { Spell } from 'app/classes/spell';
import { SimService } from 'app/core/sim.service';
import { DataService } from 'app/core/data.service';


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
  imageUrl: string;
  champIconPromise: Promise<{}>;
  champSplashPromise: Promise<{}>;
  displayBlock: string;
  // routeParams: any;

  constructor(protected loldata: DataService, private route: ActivatedRoute, protected sim: SimService) { }

  ngOnInit() {
    console.log('champ info on init');

    this.sub = this.route.params.subscribe((params) => {
      console.log(params);
      this.champIconPromise = this.makeIconImagePromise(params.champKey);
      this.champSplashPromise = this.makeSplashImagePromise(params.champKey);
      this.champion = this.loldata.getChampionByKey(params.champKey);
      console.log(this.champion);
      this.champion.stats.setLevel(18);
    });

    this.displayBlock = 'abilities';
    console.log('sim service selected champion: ' + this.sim.getChampion());
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

  makeSpellImagePromise(spellKey) {
    return `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${spellKey}.png`;
  }

  makePassiveImageUrl(passiveKey) {
    return `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/passive/${passiveKey}`;
  }

  makeSplashImagePromise(champKey) {
    return new Promise((resolve, reject) => {
      const imageUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champKey}_0.jpg`;
      resolve(imageUrl);
    });
  }

  makeHotkey(index) {
    switch (index) {
      case (0): return 'Q';
      case (1): return 'W';
      case (2): return 'E';
      case (3): return 'R';
    }
  }
}

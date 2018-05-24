import { Component, OnInit, Input } from '@angular/core';
import { Champion } from 'app/classes/champion';
import { DataService } from 'app/core/data.service';
import { HyperlinkingService } from 'app/core/hyperlinking.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-champ-list',
  templateUrl: './champ-list.component.html',
  styleUrls: ['./champ-list.component.scss']
})
export class ChampListComponent implements OnInit {
  @Input() inModal: boolean;
  arrayOfKeys: any[];
  champions: Champion[];
  champQuery: string;
  queryObservable: Observable<string>;
  firstResult: any;

  constructor(protected loldata: DataService, protected common: HyperlinkingService) { }

  ngOnInit() {
    this.champions = Array.from(this.loldata.champions.values());

    // const sub = this.queryObservable.subscribe((x) => {
    //   console.log(x);
    // });
  }

  // cool 1-line ES6 functions (instead of old 4-line ES5 functions)
  makeInfoURL = (champKey) => `/champions/${champKey}`;

  testFn() {
    console.log('test on click override');
  }

  // TODO: observable on champQuery
  // highlightFirstResult() {
  //   if (this.champQuery !== '') {
  //     console.log('getting firstResult');
  //     // this.firstResult;
  //     this.firstResult = transform(this.champions, 'name', this.champQuery)[0];
  //     console.log(this.firstResult);
  //   }


  //   function transform(value, keys: string, term: string) {
  //     if (!term) return value;
  //     return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  //   }
  // }

  //
}

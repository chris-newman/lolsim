import { Injectable } from '@angular/core';
import { DataService } from 'app/core/data.service';

@Injectable()
export class HyperlinkingService {

  constructor(protected loldata: DataService) { }

  public makeItemIconURL = (itemId) => `http://ddragon.leagueoflegends.com/cdn/${this.loldata.dataVersion}/img/item/${itemId}.png`;
  public makeItemIconSrc = (itemId) => 'url(' + this.makeItemIconURL(itemId) + ')';

  public makeChampIconURL = (champKey) => `http://ddragon.leagueoflegends.com/cdn/${this.loldata.dataVersion}/img/champion/${champKey}.png`;
  public makeChampIconSrc = (champKey) => 'url(' + this.makeChampIconURL(champKey) + ')';
}

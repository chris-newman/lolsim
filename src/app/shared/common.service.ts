import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/data.service';

@Injectable()
export class CommonService {

  constructor(protected loldata: DataService) { }

  public makeItemIconURL = (itemId) => `http://ddragon.leagueoflegends.com/cdn/${this.loldata.dataVersion}/img/item/${itemId}.png`;
  public makeChampIconURL = (champKey) => `http://ddragon.leagueoflegends.com/cdn/${this.loldata.dataVersion}/img/champion/${champKey}.png`;
}
